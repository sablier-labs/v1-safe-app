import React, { useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";

import { BigNumberInput } from "big-number-input";
import { Button, Select, Text, TextField, Loader } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import { BigNumber, Contract, ethers, utils } from "ethers";

import StreamLengthInput, { StreamLength } from "../StreamLengthInput";
import erc20Abi from "../../abis/erc20";
import createStreamTxs from "../../transactions/createStream";
import provider from "../../config/provider";

import { ButtonContainer, SelectContainer } from "../../theme/components";
import { TransactionList } from "../../typings/types";
import { bigNumberToHumanFormat } from "../../utils/format";
import { getTokenList, TokenItem } from "../../config/tokens";

function CreateStreamForm({ appsSdk, safeInfo }: { appsSdk: SdkInstance; safeInfo?: SafeInfo }) {
  /*** State Variables ***/
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

    const streamDuration = moment.duration({
      days: parseInt(streamLength.days, 10),
      hours: parseInt(streamLength.hours, 10),
      minutes: parseInt(streamLength.minutes, 10),
    });

    /* TODO: Stream initiation must be approved by other owners within an hour */
    const startTime: Moment = moment()
      .startOf("second")
      .add({ hours: 1 });
    const stopTime: Moment = startTime.clone().add(streamDuration.clone());

    const bnStreamAmount = BigNumber.from(streamAmount);
    const safeStreamAmount = bnStreamAmount.sub(bnStreamAmount.mod(streamDuration.asSeconds()));

    const txs: TransactionList = createStreamTxs(
      safeInfo.network,
      recipient,
      safeStreamAmount.toString(),
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
    <>
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
        <TextField label="Recipient" value={recipient} onChange={(event): void => setRecipient(event.target.value)} />
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
    </>
  );
}

export default CreateStreamForm;
