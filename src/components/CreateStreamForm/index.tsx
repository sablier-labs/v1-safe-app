import DateFnsUtils from "@date-io/date-fns";
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";
// import { Network } from "@ethersproject/networks";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";
import { Button, Loader, Select, Text, TextField } from "@gnosis.pm/safe-react-components";
import { ThemeProvider } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BigNumberInput } from "big-number-input";
import { isAfter, isDate, isFuture } from "date-fns";
import { HTMLProps, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { getSablierContractAddress } from "../../config/sablier";
import { DATE_FORMAT, TIME_FORMAT } from "../../constants/time";
import { TokenItem, getTokens } from "../../constants/tokens";
import useTokenContract from "../../hooks/useTokenContract";
import dateTimeTheme from "../../theme/datetimepicker";
import { createStreamTxs } from "../../txs";
import { SablierChainId } from "../../types";
import { bigNumberToHumanFormat } from "../../utils";
import { ButtonContainer, SelectContainer, TextFieldContainer } from "../index";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 16px;
  max-width: 500px;
`;

function CreateStreamForm(): JSX.Element {
  const { safe, sdk } = useSafeAppsSDK();

  /// STATE ///

  const [amountError, setAmountError] = useState<string | undefined>();
  const [endDate, handleEndDateChange] = useState<Date | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [streamAmount, setStreamAmount] = useState<string>("");
  const [tokenAllowance, setTokenAllowance] = useState<BigNumber>(Zero);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [tokens, setTokens] = useState<TokenItem[]>([]);

  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const tokenContract: Contract = useTokenContract(selectedToken?.address);

  /// MEMOIZED VALUES ///

  const isButtonDisabled = useMemo((): boolean => {
    return (
      streamAmount.length === 0 ||
      streamAmount === "0" ||
      typeof amountError !== "undefined" ||
      !startDate ||
      !endDate ||
      !isAfter(endDate, startDate)
    );
  }, [amountError, endDate, startDate, streamAmount]);

  /// CALLBACKS ///

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
    async function sendTxs(): Promise<void> {
      if (!safe.chainId || !selectedToken || !startDate || !endDate) {
        return;
      }

      // We call in this way to ensure all errors are displayed to the user.
      const amountValid = validateAmountValue();
      if (!amountValid) {
        return;
      }

      // TODO: Stream initiation must be approved by other owners within an hour.
      const startTime: BigNumber = BigNumber.from(Math.floor(startDate.getTime() / 1000));
      const stopTime: BigNumber = BigNumber.from(Math.floor(endDate.getTime() / 1000));
      const totalSeconds: BigNumber = stopTime.sub(startTime);

      const streamAmountBn: BigNumber = BigNumber.from(streamAmount);
      const safeStreamAmount: BigNumber = streamAmountBn.sub(streamAmountBn.mod(totalSeconds));

      const txs: BaseTransaction[] = createStreamTxs(
        safe.chainId,
        recipient,
        safeStreamAmount,
        selectedToken.address,
        tokenAllowance,
        startTime.toString(),
        stopTime.toString(),
      );

      try {
        await sdk.txs.send({ txs });
      } catch (error) {
        console.error("Error while creating the stream", { error });
      }

      setStreamAmount("");
      setRecipient("");
    }

    void sendTxs();
  }, [endDate, recipient, safe, selectedToken, startDate, streamAmount, tokenAllowance, validateAmountValue]);

  const onAmountChange = useCallback((value: string): void => {
    setAmountError(undefined);
    setStreamAmount(value);
  }, []);

  const onSelectItem = useCallback(
    (id: string): void => {
      const newSelectedToken = tokens.find(t => {
        return t.id === id;
      });
      if (!newSelectedToken) {
        return;
      }
      setSelectedToken(newSelectedToken);
    },
    [setSelectedToken, tokens],
  );

  /// SIDE EFFECTS ///

  useEffect(() => {
    const controller: AbortController = new AbortController();

    async function getTokenInfo(): Promise<void> {
      if (!safe.chainId || !safe.safeAddress || !selectedToken || !tokenContract) {
        return;
      }

      // Wait until token is correctly updated.
      if (selectedToken.address.toLowerCase() !== tokenContract.address.toLowerCase()) {
        return;
      }

      try {
        // Get the token balance.
        const newTokenBalance: string = await tokenContract.balanceOf(safe.safeAddress);

        if (controller.signal.aborted) {
          return;
        }

        // Update the token balance.
        setTokenBalance(newTokenBalance);

        // Get the token allowance.
        const sablierContractAddress: string = getSablierContractAddress(safe.chainId);
        const newTokenAllowance: BigNumber = await tokenContract.allowance(safe.safeAddress, sablierContractAddress);

        if (controller.signal.aborted) {
          return;
        }

        // Update the token allowance.
        setTokenAllowance(newTokenAllowance);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error while reading token info", error);
        }
      }
    }

    void getTokenInfo();

    return () => {
      controller.abort();
    };
  }, [safe.safeAddress, selectedToken, setTokenBalance, tokens, tokenContract]);

  // Load tokens list and initialize with DAI.
  useEffect(() => {
    if (!safe.chainId) {
      return;
    }

    const loadedTokens: TokenItem[] = getTokens(safe.chainId as SablierChainId);
    setTokens(loadedTokens);

    const dai: TokenItem | undefined = loadedTokens.find(t => {
      return t.id === "DAI";
    });

    if (dai) {
      setSelectedToken(dai);
    }
  }, [safe.chainId, setSelectedToken, setTokens]);

  if (!selectedToken) {
    return <Loader size="md" />;
  }

  return (
    <Wrapper>
      <Text size="lg">What token do you want to use?</Text>

      <SelectContainer>
        <Select items={tokens} activeItemId={selectedToken.id} onItemClick={onSelectItem} />
        <Text size="lg">{humanTokenBalance()}</Text>
      </SelectContainer>

      <Text size="lg">How much do you want to stream in total?</Text>
      <TextFieldContainer>
        <BigNumberInput
          decimals={selectedToken.decimals}
          onChange={onAmountChange}
          value={streamAmount}
          renderInput={(props: HTMLProps<HTMLInputElement>) => (
            <TextField
              label="Amount"
              meta={{ error: amountError }}
              onChange={props.onChange}
              value={String(props.value)}
            />
          )}
        />
      </TextFieldContainer>

      <Text size="lg">Who would you like to stream to?</Text>

      <TextFieldContainer>
        <TextField
          label="Recipient"
          onChange={(event): void => {
            setRecipient(event.target.value);
          }}
          value={recipient}
        />
      </TextFieldContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={dateTimeTheme}>
          <Text size="lg">When should the stream start?</Text>
          <TextFieldContainer>
            <DateTimePicker
              ampm={false}
              clearable
              disablePast
              format={`${DATE_FORMAT} - ${TIME_FORMAT}`}
              fullWidth
              inputVariant="filled"
              label="Start time"
              onChange={date => {
                handleStartDateChange(!isDate(date) || isFuture(date as Date) ? date : null);
              }}
              onError={console.log}
              value={startDate}
            />
          </TextFieldContainer>

          <Text size="lg">When should the stream end?</Text>
          <TextFieldContainer>
            <DateTimePicker
              ampm={false}
              clearable
              disablePast
              format={`${DATE_FORMAT} - ${TIME_FORMAT}`}
              fullWidth
              inputVariant="filled"
              label="End time"
              onChange={date => {
                handleEndDateChange(!isDate(date) || isFuture(date as Date) ? date : null);
              }}
              onError={console.log}
              value={endDate}
            />
          </TextFieldContainer>
        </ThemeProvider>
      </MuiPickersUtilsProvider>

      <ButtonContainer>
        <Button color="primary" disabled={isButtonDisabled} onClick={createStream} size="lg" variant="contained">
          Create Stream
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
}

export default CreateStreamForm;
