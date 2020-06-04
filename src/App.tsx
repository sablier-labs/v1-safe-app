import React, { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import styled, { ThemeProvider } from "styled-components";

import { BigNumberInput } from "big-number-input";
import { Button, Select, Title, Text, TextField, Loader } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import { BigNumber, Contract, ethers, utils } from "ethers";

import StreamLengthInput, { StreamLength } from "./components/StreamLengthInput";
import { Container, TitleArea, NavbarArea, BodyArea } from "./components/Layout";
import erc20Abi from "./abis/erc20";
import createStreamTxs from "./transactions/createStream";
import provider from "./config/provider";
import theme from "./theme";

import { SelectContainer, ButtonContainer } from "./components";
import { TransactionList } from "./typings/types";
import { getTokenList, TokenItem } from "./config/tokens";
import { useAppsSdk } from "./hooks";
import bigNumberToHumanFormat from "./utils/bigNumberToHumanFormat";
import StreamTable from "./components/StreamTable";

const StyledTitle = styled(Title)`
  margin-top: 0px;
`;

function SablierWidget() {
  /*** State Variables ***/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [amountError, setAmountError] = useState<string | undefined>();
  const [recipient, setRecipient] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const [streamAmount, setStreamAmount] = useState<string>("");
  const [streamLength, setStreamLength] = useState<StreamLength>({ days: "0", hours: "0", minutes: "0" });
  const [streamLengthError, setStreamLengthError] = useState<string | undefined>();
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [tokenInstance, setTokenInstance] = useState<Contract>();
  const [tokenList, setTokenList] = useState<TokenItem[]>();

  /*** Callbacks ***/

  const humanTokenBalance = useCallback((): string => {
    return selectedToken ? bigNumberToHumanFormat(tokenBalance, selectedToken.decimals) : "";
  }, [selectedToken, tokenBalance]);

  const validateAmountValue = useCallback((): boolean => {
    setAmountError(undefined);

    const currentValueBN = BigNumber.from(streamAmount);
    const comparisonValueBN = BigNumber.from(tokenBalance);

    if (currentValueBN.gt(comparisonValueBN)) {
      setAmountError(`You only have ${humanTokenBalance()} ${selectedToken && selectedToken.label} in your Safe`);
      return false;
    }

    return true;
  }, [humanTokenBalance, selectedToken, streamAmount, tokenBalance]);

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
        newTokenBalance = utils.parseEther(safeInfo.ethBalance).toString();
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
      <Container>
        <TitleArea>
          <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
        </TitleArea>

        <NavbarArea>
          <Text size="lg">What token do you want to use?</Text>

          <SelectContainer>
            <Select items={tokenList || []} activeItemId={selectedToken.id} onItemClick={onSelectItem} />
            <Text size="lg">{humanTokenBalance()}</Text>
          </SelectContainer>

          <Text size="lg">How much do you want to stream in total?</Text>
          <SelectContainer>
            <BigNumberInput
              decimals={selectedToken.decimals}
              onChange={onAmountChange}
              value={streamAmount}
              renderInput={(props: any) => (
                <TextField label="Amount" value={props.value} onChange={props.onChange} meta={{ error: amountError }} />
              )}
            />
          </SelectContainer>

          <Text size="lg">Who would you like to stream to?</Text>

          <SelectContainer>
            <TextField
              label="Recipient"
              value={recipient}
              onChange={(event): void => setRecipient(event.target.value)}
            />
          </SelectContainer>

          <Text size="lg">For how long should the money be streamed?</Text>

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
        </NavbarArea>

        <BodyArea>
          <StreamTable appsSdk={appsSdk} safeInfo={safeInfo} />
        </BodyArea>
      </Container>
    </ThemeProvider>
  );
}

export default SablierWidget;
