import React, { useCallback, useEffect, useState } from "react";
import Big from "big.js";
import moment, { Moment } from "moment";
import styled, { ThemeProvider } from "styled-components";

import { BigNumberInput } from "big-number-input";
import { Button, Select, Title, Text, TextField, Loader } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import { Contract, ethers } from "ethers";

import StreamLengthInput, { StreamLength } from "./components/StreamLengthInput";
import WidgetWrapper from "./components/WidgetWrapper";
import erc20Abi from "./abis/erc20";
import createStreamTxs from "./transactions/createStream";
import getStreams from "./gql/streams";
import provider from "./config/provider";
import theme from "./theme";

import { SelectContainer, ButtonContainer } from "./components";
import { Stream, TransactionList } from "./typings/types";
import { getTokenList, TokenItem } from "./config/tokens";
import { useAppsSdk } from "./hooks";

const StyledTitle = styled(Title)`
  margin-top: 0px;
`;

function SablierWidget() {
  /*** State Variables ***/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [amountError, setAmountError] = useState<string | undefined>();
  const [outgoingStreams, setOutgoingStreams] = useState<Stream[]>([]);
  const [recipient, setRecipient] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const [streamAmount, setStreamAmount] = useState<string>("");
  const [streamLength, setStreamLength] = useState<StreamLength>({ days: "0", hours: "0", minutes: "0" });
  const [streamLengthError, setStreamLengthError] = useState<string | undefined>();
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [tokenInstance, setTokenInstance] = useState<Contract>();
  const [tokenList, setTokenList] = useState<TokenItem[]>();

  /*** Callbacks ***/

  const bigNumberToHumanFormat = useCallback(
    (value: string): string => {
      if (!selectedToken) {
        return "";
      }
      return new Big(value).div(10 ** selectedToken.decimals).toFixed(4);
    },
    [selectedToken],
  );

  const validateAmountValue = useCallback((): boolean => {
    setAmountError(undefined);

    const currentValueBN = new Big(streamAmount);
    const comparisonValueBN = new Big(tokenBalance);

    if (currentValueBN.gt(comparisonValueBN)) {
      setAmountError(
        `You only have ${bigNumberToHumanFormat(tokenBalance)} ${selectedToken && selectedToken.label} in your Safe`,
      );
      return false;
    }

    return true;
  }, [bigNumberToHumanFormat, selectedToken, streamAmount, tokenBalance]);

  const validateStreamLength = useCallback((): boolean => {
    const { days, hours, minutes } = streamLength;
    if (days === "0" && hours === "0" && minutes === "0") {
      setStreamLengthError("Please set a stream length");
      return false;
    }
    return true;
  }, [streamLength]);

  const createStream = useCallback((): void => {
    /* We call in this way to ensure all errors are displayed to user */
    const amountValid = validateAmountValue();
    const lengthValid = validateStreamLength();
    if (!safeInfo || !selectedToken || !amountValid || !lengthValid) {
      return;
    }

    /* TODO: Stream initiation must be approved by other owners within an hour */
    const startTime: Moment = moment()
      .startOf("second")
      .add({ hours: 1 });
    const stopTime: Moment = startTime.clone().add({
      days: parseInt(streamLength.days, 10),
      hours: parseInt(streamLength.hours, 10),
      minutes: parseInt(streamLength.minutes, 10),
    });

    const txs: TransactionList = createStreamTxs(
      safeInfo.network,
      recipient,
      streamAmount,
      tokenInstance?.address || "",
      startTime.format("X"),
      stopTime.format("X"),
    );
    appsSdk.sendTransactions(txs);

    setStreamAmount("");
    setRecipient("");
  }, [
    appsSdk,
    recipient,
    safeInfo,
    selectedToken,
    streamAmount,
    streamLength,
    tokenInstance,
    validateAmountValue,
    validateStreamLength,
  ]);

  // const cancelStream = (streamId: string): void => {
  //   const txs = cancelStreamTxs(streamId);
  //   appsSdk.sendTransactions(txs);
  // };

  const isButtonDisabled = useCallback((): boolean => {
    return streamAmount.length === 0 || streamAmount === "0" || Boolean(amountError) || Boolean(streamLengthError);
  }, [amountError, streamAmount, streamLengthError]);

  const onSelectItem = useCallback(
    (id: string): void => {
      if (!tokenList) {
        return;
      }
      const newSelectedToken = tokenList.find(t => {
        return t.id === id;
      });
      if (!newSelectedToken) {
        return;
      }
      setSelectedToken(newSelectedToken);
    },
    [setSelectedToken, tokenList],
  );

  const onAmountChange = useCallback((value: string): void => {
    setAmountError(undefined);
    setStreamAmount(value);
  }, []);

  const onStreamLengthChange = useCallback(
    (value: string, unit: "days" | "hours" | "minutes"): void => {
      setStreamLengthError(undefined);
      setStreamLength(state => ({ ...state, [unit]: value }));
    },
    [setStreamLength, setStreamLengthError],
  );

  /*** Side Effects ***/

  /* Load tokens list and initialize with DAI */
  useEffect(() => {
    if (!safeInfo) {
      return;
    }

    const tokenListRes: TokenItem[] = getTokenList(safeInfo.network);

    setTokenList(tokenListRes);

    const findDaiRes: TokenItem | undefined = tokenListRes.find(t => t.id === "DAI");
    setSelectedToken(findDaiRes);
  }, [safeInfo]);

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const streams: Stream[] = await getStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingStreams(streams);
    };

    loadOutgoingStreams();
  }, [safeInfo]);

  /* Clear the form every time the user changes the token */
  useEffect(() => {
    if (!selectedToken) {
      return;
    }

    setTokenBalance("0");
    setStreamAmount("");
    setAmountError(undefined);

    setTokenInstance(new ethers.Contract(selectedToken.address, erc20Abi, provider));
  }, [selectedToken]);

  useEffect(() => {
    const getData = async () => {
      if (!safeInfo || !selectedToken || !tokenInstance) {
        return;
      }

      /* Wait until token is correctly updated */
      if (selectedToken?.address.toLocaleLowerCase() !== tokenInstance?.address.toLocaleLowerCase()) {
        return;
      }

      /* Get token Balance */
      let newTokenBalance: string;
      if (selectedToken.id === "ETH") {
        newTokenBalance = new Big(safeInfo.ethBalance).times(10 ** 18).toString();
      } else {
        newTokenBalance = await tokenInstance.balanceOf(safeInfo.safeAddress);
      }

      /* Update all the values in a row to avoid UI flickers */
      setTokenBalance(newTokenBalance);
    };

    getData();
  }, [safeInfo, selectedToken, tokenInstance]);

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
            {bigNumberToHumanFormat(tokenBalance)}
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

        <StreamLengthInput
          streamLength={streamLength}
          onStreamLengthChange={onStreamLengthChange}
          error={streamLengthError}
        />

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
}

function StreamDisplay({ stream }: { stream: Stream }) {
  const humanStartTime: string = moment.unix(stream.startTime).format("DD-MM-YYYY HH:mm");
  const humanStopTime: string = moment.unix(stream.stopTime).format("DD-MM-YYYY HH:mm");
  return (
    <Text strong size="lg">
      {" "}
      {`Stream ID: ${stream.id} Recipient: ${stream.recipient}  Start Time: ${humanStartTime} Stop Time: ${humanStopTime}`}
    </Text>
  );
}

export default SablierWidget;
