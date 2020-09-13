import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { InfuraProvider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import { BigNumberInput } from "big-number-input";
import { Button, Select, Text, TextField, Loader } from "@gnosis.pm/safe-react-components";
import { ThemeProvider } from "@material-ui/core";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { isAfter, isDate, isFuture } from "date-fns";

import erc20Abi from "../../abis/erc20";
import { createStreamTxs, createEthStreamTxs } from "../../transactions";

import { ButtonContainer, SelectContainer, TextFieldContainer } from "../index";
import { TokenItem, getTokenList } from "../../config/tokens";
import { TIME_FORMAT, DATE_FORMAT, bigNumberToHumanFormat } from "../../utils";

import { Transaction } from "../../types";

import { useSafeNetwork, useSendTransactions, useSafeEthBalance, useSafeAddress } from "../../contexts/SafeContext";
import dateTimeTheme from "../../theme/datetimepicker";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 16px;
  max-width: 500px;
`;

function CreateStreamForm() {
  const safeAddress = useSafeAddress();
  const network = useSafeNetwork() || "mainnet";
  const ethBalance = useSafeEthBalance();
  const sendTransactions = useSendTransactions();
  /** State Variables **/

  const [amountError, setAmountError] = useState<string | undefined>();
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [endDate, handleEndDateChange] = useState<Date | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const [streamAmount, setStreamAmount] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [tokenInstance, setTokenInstance] = useState<Contract>();
  const [tokenList, setTokenList] = useState<TokenItem[]>();

  /** Callbacks **/

  const humanTokenBalance = useCallback((): string => {
    return selectedToken ? bigNumberToHumanFormat(tokenBalance, selectedToken.decimals) : "";
  }, [selectedToken, tokenBalance]);

  const validateAmountValue = useCallback((): boolean => {
    setAmountError(undefined);

    const currentValueBN: BigNumber = BigNumber.from(streamAmount);
    const comparisonValueBN: BigNumber = BigNumber.from(tokenBalance);

    if (currentValueBN.gt(comparisonValueBN)) {
      setAmountError(`You only have ${humanTokenBalance()} ${selectedToken && selectedToken.label} in your Safe`);
      return false;
    }

    return true;
  }, [humanTokenBalance, selectedToken, streamAmount, tokenBalance]);

  const createStream = useCallback((): void => {
    /* We call in this way to ensure all errors are displayed to user */
    const amountValid = validateAmountValue();
    if (!selectedToken || !amountValid || !startDate || !endDate) {
      return;
    }

    /* TODO: Stream initiation must be approved by other owners within an hour */
    const startTime: BigNumber = BigNumber.from(startDate.getTime() / 1000);
    const stopTime: BigNumber = BigNumber.from(endDate.getTime() / 1000);
    const totalSeconds = stopTime.sub(startTime);

    const bnStreamAmount = BigNumber.from(streamAmount);
    const safeStreamAmount = bnStreamAmount.sub(bnStreamAmount.mod(totalSeconds));

    let txs: Transaction[];
    if (selectedToken.id === "ETH") {
      /* If streaming ETH we need to wrap it first. */
      txs = createEthStreamTxs(
        network,
        recipient,
        safeStreamAmount.toString(),
        startTime.toString(),
        stopTime.toString(),
      );
    } else {
      txs = createStreamTxs(
        network,
        recipient,
        safeStreamAmount.toString(),
        tokenInstance?.address || "",
        startTime.toString(),
        stopTime.toString(),
      );
    }

    sendTransactions(txs);

    setStreamAmount("");
    setRecipient("");
  }, [
    endDate,
    network,
    recipient,
    selectedToken,
    sendTransactions,
    startDate,
    streamAmount,
    tokenInstance,
    validateAmountValue,
  ]);

  const isButtonDisabled = useCallback((): boolean => {
    return (
      streamAmount.length === 0 ||
      streamAmount === "0" ||
      typeof amountError !== "undefined" ||
      !startDate ||
      !endDate ||
      !isAfter(endDate, startDate)
    );
  }, [amountError, endDate, startDate, streamAmount]);

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

  /** Side Effects **/

  /* Load tokens list and initialize with DAI */
  useEffect(() => {
    if (!network) {
      return;
    }

    const tokenListRes: TokenItem[] = getTokenList(network);

    setTokenList(tokenListRes);

    const findDaiRes: TokenItem | undefined = tokenListRes.find(t => {
      return t.id === "DAI";
    });
    setSelectedToken(findDaiRes);
  }, [network]);

  /* Clear the form every time the user changes the token */
  useEffect(() => {
    if (!network || !selectedToken) {
      return;
    }

    setTokenBalance("0");
    setStreamAmount("");
    setAmountError(undefined);

    const provider = new InfuraProvider(network, process.env.REACT_APP_INFURA_KEY);
    setTokenInstance(new Contract(selectedToken.address, erc20Abi, provider));
  }, [network, selectedToken, setTokenBalance]);

  useEffect(() => {
    const getData = async () => {
      if (!safeAddress || !ethBalance || !selectedToken || !tokenInstance) {
        return;
      }

      /* Wait until token is correctly updated */
      if (selectedToken?.address.toLocaleLowerCase() !== tokenInstance?.address.toLocaleLowerCase()) {
        return;
      }

      /* Get token Balance */
      let newTokenBalance: string;
      if (selectedToken.id === "ETH") {
        newTokenBalance = parseEther(ethBalance).toString();
      } else {
        newTokenBalance = await tokenInstance.balanceOf(safeAddress);
      }

      /* Update all the values in a row to avoid UI flickers */
      setTokenBalance(newTokenBalance);
    };

    getData();
  }, [ethBalance, safeAddress, selectedToken, setTokenBalance, tokenInstance]);

  if (!selectedToken) {
    return <Loader size="md" />;
  }

  return (
    <Wrapper>
      <Text size="lg">What token do you want to use?</Text>

      <SelectContainer>
        <Select items={tokenList || []} activeItemId={selectedToken.id} onItemClick={onSelectItem} />
        <Text size="lg">{humanTokenBalance()}</Text>
      </SelectContainer>

      <Text size="lg">How much do you want to stream in total?</Text>
      <TextFieldContainer>
        <BigNumberInput
          decimals={selectedToken.decimals}
          onChange={onAmountChange}
          value={streamAmount}
          renderInput={(props: any) => (
            <TextField label="Amount" value={props.value} onChange={props.onChange} meta={{ error: amountError }} />
          )}
        />
      </TextFieldContainer>

      <Text size="lg">Who would you like to stream to?</Text>

      <TextFieldContainer>
        <TextField label="Recipient" value={recipient} onChange={(event): void => setRecipient(event.target.value)} />
      </TextFieldContainer>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={dateTimeTheme}>
          <Text size="lg">When should the stream start?</Text>
          <TextFieldContainer>
            <DateTimePicker
              clearable
              label="Start time"
              inputVariant="filled"
              ampm={false}
              value={startDate}
              onChange={date => handleStartDateChange(!isDate(date) || isFuture(date as Date) ? date : null)}
              onError={console.log}
              disablePast
              format={`${DATE_FORMAT} - ${TIME_FORMAT}`}
              fullWidth
            />
          </TextFieldContainer>

          <Text size="lg">When should the stream end?</Text>
          <TextFieldContainer>
            <DateTimePicker
              clearable
              label="End time"
              inputVariant="filled"
              ampm={false}
              value={endDate}
              onChange={date => handleEndDateChange(!isDate(date) || isFuture(date as Date) ? date : null)}
              onError={console.log}
              disablePast
              format={`${DATE_FORMAT} - ${TIME_FORMAT}`}
              fullWidth
            />
          </TextFieldContainer>
        </ThemeProvider>
      </MuiPickersUtilsProvider>

      <ButtonContainer>
        <Button size="lg" color="primary" variant="contained" onClick={createStream} disabled={isButtonDisabled()}>
          Create Stream
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

export default CreateStreamForm;
