import React, { useEffect, useState } from "react";
import moment from "moment";
import Big from "big.js";
import { BigNumberInput } from "big-number-input";
import Web3 from "web3";
import styled, { ThemeProvider } from "styled-components";
import { Button, Select, Title, Text, TextField, Loader } from "@gnosis.pm/safe-react-components";
import initSdk, { SafeInfo } from "@gnosis.pm/safe-apps-sdk";

import { Stream } from "./typings/types";
import WidgetWrapper from "./components/WidgetWrapper";
import { web3Provider, getTokenList, TokenItem } from "./config/config";
import { SelectContainer, ButtonContainer } from "./components/components";
import theme from "./theme/customTheme";

import getStreams from "./utils/streams";
import createStreamTxs from "./transactions/createStream";

import ERC20Abi from "./abis/erc20";

const web3: any = new Web3(web3Provider);

const StyledTitle = styled(Title)`
  margin-top: 0px;
`;

const integerOptions = (max: number) =>
  Array.from(Array(max).keys()).map((index: number) => {
    return { id: index.toString(), label: index.toString() };
  });

const daysOption = integerOptions(366);
const hoursOption = integerOptions(24);
const minutesOption = integerOptions(60);

const SablierWidget = () => {
  const [safeInfo, setSafeInfo] = useState<SafeInfo>();
  const [tokenList, setTokenList] = useState<Array<TokenItem>>();

  const [recipient, setRecipient] = useState<string>("");

  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const [tokenInstance, setTokenInstance] = useState<any>();

  const [tokenBalance, setTokenBalance] = useState<string>("0");

  const [days, setDays] = useState<string>("0");
  const [hours, setHours] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("0");
  const [streamLengthError, setStreamLengthError] = useState<string | undefined>();

  const [streamAmount, setStreamAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string | undefined>();

  const [outgoingStreams, setOutgoingStreams] = useState<Array<any>>([]);

  const safeMultisigUrl = [];
  if (process.env.REACT_APP_LOCAL_SAFE_APP_URL) {
    safeMultisigUrl.push(/http:\/\/localhost:3000/);
  }

  const [appsSdk] = useState(initSdk(safeMultisigUrl));

  // -- for development purposes with local provider
  useEffect(() => {
    if (process.env.REACT_APP_LOCAL_WEB3_PROVIDER) {
      console.warn("SABLIER APP: you are using a local web3 provider");
      const w: any = window;
      w.web3 = new Web3(w.ethereum);
      w.ethereum.enable();
      w.web3.eth.getAccounts().then((addresses: Array<string>) => {
        setSafeInfo({
          safeAddress: addresses[0],
          network: "rinkeby",
          ethBalance: "0.99",
        });
      });
    }
  }, []);

  // config safe connector
  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: setSafeInfo,
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk]);

  // load tokens list and initialize with DAI
  useEffect(() => {
    if (!safeInfo) {
      return;
    }

    const tokenListRes = getTokenList(safeInfo.network);

    setTokenList(tokenListRes);

    const findDaiRes = tokenListRes.find(t => t.id === "DAI");
    setSelectedToken(findDaiRes);
  }, [safeInfo]);

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const streams = await getStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingStreams(streams);
    };

    loadOutgoingStreams();
  }, [safeInfo]);

  // on selectedToken
  useEffect(() => {
    if (!selectedToken) {
      return;
    }

    setTokenBalance("0");
    setStreamAmount("");
    setAmountError(undefined);

    setTokenInstance(new web3.eth.Contract(ERC20Abi, selectedToken.tokenAddr));
  }, [selectedToken]);

  useEffect(() => {
    const getData = async () => {
      if (!safeInfo || !selectedToken || !tokenInstance) {
        return;
      }

      // wait until token is correctly updated
      if (selectedToken.tokenAddr.toLocaleLowerCase() !== tokenInstance?._address.toLocaleLowerCase()) {
        return;
      }

      // get token Balance
      let newTokenBalance;
      if (selectedToken.id === "ETH") {
        newTokenBalance = new Big(safeInfo.ethBalance).times(10 ** 18).toString();
      } else {
        newTokenBalance = await tokenInstance.methods.balanceOf(safeInfo.safeAddress).call();
      }

      // update all the values in a row to avoid UI flickers
      setTokenBalance(newTokenBalance);
    };

    getData();
  }, [safeInfo, selectedToken, tokenInstance]);

  const bNumberToHumanFormat = (value: string) => {
    if (!selectedToken) {
      return "";
    }
    return new Big(value).div(10 ** selectedToken.decimals).toFixed(4);
  };

  const validateAmountValue = (): boolean => {
    setAmountError(undefined);

    const currentValueBN = new Big(streamAmount);
    const comparisonValueBN = new Big(tokenBalance);

    if (currentValueBN.gt(comparisonValueBN)) {
      setAmountError(
        `You only have ${bNumberToHumanFormat(tokenBalance)} ${selectedToken && selectedToken.label} in your Safe`,
      );
      return false;
    }

    return true;
  };

  const validateStreamLength = (): boolean => {
    if (days === "0" && hours === "0" && minutes === "0") {
      setStreamLengthError("Please set a stream length");
      return false;
    }
    return true;
  };

  const createStream = (): void => {
    if (!safeInfo || !selectedToken || !validateAmountValue() || !validateStreamLength()) {
      return;
    }

    // TODO: Stream initiation must be approved by other owners within an hour
    const startTime = moment()
      .startOf("second")
      .add({ hours: 1 });
    const stopTime = startTime.clone().add({
      days: parseInt(days, 10),
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
    });

    const txs = createStreamTxs(
      safeInfo.network,
      recipient,
      streamAmount,
      tokenInstance,
      startTime.format("X"),
      stopTime.format("X"),
    );
    appsSdk.sendTransactions(txs);

    setStreamAmount("");
  };

  // const cancelStream = (streamId: string): void => {
  //   const txs = cancelStreamTxs(streamId);
  //   appsSdk.sendTransactions(txs);
  // };

  const isButtonDisabled = () => {
    return !!(!streamAmount.length || streamAmount === "0" || amountError || streamLengthError);
  };

  const onSelectItem = (id: string) => {
    if (!tokenList) {
      return;
    }
    const newSelectedToken = tokenList.find(t => t.id === id);
    if (!newSelectedToken) {
      return;
    }
    setSelectedToken(newSelectedToken);
  };

  const onAmountChange = (value: string) => {
    setAmountError(undefined);
    setStreamAmount(value);
  };

  const onStreamLengthChange = (value: string, unit: "days" | "hours" | "minutes") => {
    setStreamLengthError(undefined);
    if (unit === "days") {
      setDays(value);
    } else if (unit === "hours") {
      setHours(value);
    } else if (unit === "minutes") {
      setMinutes(value);
    } else {
      throw new Error("unknown unit");
    }
  };

  if (!selectedToken) {
    return <Loader size="md" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <WidgetWrapper>
        <StyledTitle size="xs">Create Sablier Stream</StyledTitle>

        <Title size="xs">What token do you want to use?</Title>

        <SelectContainer>
          <Select items={tokenList || []} activeItemId={selectedToken.id} onItemClick={onSelectItem} />
          <Text strong size="lg">
            {bNumberToHumanFormat(tokenBalance)}
          </Text>
        </SelectContainer>

        <Title size="xs">How much do you want to stream in total?</Title>

        <BigNumberInput
          decimals={selectedToken.decimals}
          onChange={onAmountChange}
          value={streamAmount}
          renderInput={(props: any) => (
            <TextField label="Amount" value={props.value} onChange={props.onChange} meta={{ error: amountError }} />
          )}
        />

        <Title size="xs">Who would you like to stream to?</Title>

        <TextField label="Recipient" value={recipient} onChange={(event): void => setRecipient(event.target.value)} />

        <Title size="xs">For how long should the money be streamed?</Title>

        <SelectContainer>
          <Select
            items={daysOption}
            activeItemId={days}
            onItemClick={(id: string): void => onStreamLengthChange(id, "days")}
          />
          <Text strong size="lg">
            Days
          </Text>
        </SelectContainer>

        <SelectContainer>
          <Select
            items={hoursOption}
            activeItemId={hours}
            onItemClick={(id: string): void => onStreamLengthChange(id, "hours")}
          />
          <Text strong size="lg">
            Hours
          </Text>
        </SelectContainer>

        <SelectContainer>
          <Select
            items={minutesOption}
            activeItemId={minutes}
            onItemClick={(id: string): void => onStreamLengthChange(id, "minutes")}
          />
          <Text strong size="lg">
            Minutes
          </Text>
        </SelectContainer>

        <ButtonContainer>
          <Button size="lg" color="primary" variant="contained" onClick={createStream} disabled={isButtonDisabled()}>
            Create Stream
          </Button>
        </ButtonContainer>

        {outgoingStreams.map((stream: Stream) => (
          <StreamDisplay key={stream.id} stream={stream} />
        ))}
      </WidgetWrapper>
    </ThemeProvider>
  );
};

const StreamDisplay = ({ stream }: { stream: Stream }) => {
  const humanStartTime = moment.unix(stream.startTime).format("DD-MM-YYYY HH:mm");
  const humanStopTime = moment.unix(stream.stopTime).format("DD-MM-YYYY HH:mm");
  return (
    <Text strong size="lg">
      {" "}
      {`Stream ID: ${stream.id} Recipient: ${stream.recipient}  Start Time: ${humanStartTime} Stop Time: ${humanStopTime}`}
    </Text>
  );
};

export default SablierWidget;
