import DateFnsUtils from "@date-io/date-fns";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";
import { parseEther } from "@ethersproject/units";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";
import { Button, Loader, Select, Text, TextField } from "@gnosis.pm/safe-react-components";
import { ThemeProvider } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BigNumberInput } from "big-number-input";
import { isAfter, isDate, isFuture } from "date-fns";
import { HTMLProps, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import ERC20_ABI from "../../abis/erc20";
import { TokenItem, getTokenList } from "../../config/tokens";
import useSafeEthBalance from "../../hooks/useSafeEthBalance";
import dateTimeTheme from "../../theme/datetimepicker";
import { createEthStreamTxs, createStreamTxs } from "../../transactions";
import { SablierChainId } from "../../types";
import { DATE_FORMAT, TIME_FORMAT, bigNumberToHumanFormat } from "../../utils";
import { ButtonContainer, SelectContainer, TextFieldContainer } from "../index";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 16px;
  max-width: 500px;
`;

function CreateStreamForm(): JSX.Element {
  const ethBalance = useSafeEthBalance();
  const { safe, sdk } = useSafeAppsSDK();

  /// STATE ///

  const [amountError, setAmountError] = useState<string | undefined>();
  const [endDate, handleEndDateChange] = useState<Date | null>(null);
  const [recipient, setRecipient] = useState<string>("");
  const [selectedToken, setSelectedToken] = useState<TokenItem>();
  const [startDate, handleStartDateChange] = useState<Date | null>(null);
  const [streamAmount, setStreamAmount] = useState<string>("");
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [tokenInstance, setTokenInstance] = useState<Contract>();
  const [tokenList, setTokenList] = useState<TokenItem[]>();

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
    // We call in this way to ensure all errors are displayed to user.
    const amountValid = validateAmountValue();
    if (!safe.chainId || !selectedToken || !amountValid || !startDate || !endDate) {
      return;
    }

    // TODO: Stream initiation must be approved by other owners within an hour.
    const startTime: BigNumber = BigNumber.from(Math.floor(startDate.getTime() / 1000));
    const stopTime: BigNumber = BigNumber.from(Math.floor(endDate.getTime() / 1000));
    const totalSeconds = stopTime.sub(startTime);

    const bnStreamAmount = BigNumber.from(streamAmount);
    const safeStreamAmount = bnStreamAmount.sub(bnStreamAmount.mod(totalSeconds));

    let txs: BaseTransaction[];
    if (selectedToken.id === "ETH") {
      // If streaming ETH we need to wrap it first.
      txs = createEthStreamTxs(
        safe.chainId,
        recipient,
        safeStreamAmount.toString(),
        startTime.toString(),
        stopTime.toString(),
      );
    } else {
      txs = createStreamTxs(
        safe.chainId,
        recipient,
        safeStreamAmount.toString(),
        tokenInstance?.address || "",
        startTime.toString(),
        stopTime.toString(),
      );
    }

    void sdk.txs.send({ txs });

    setStreamAmount("");
    setRecipient("");
  }, [endDate, recipient, safe, selectedToken, startDate, streamAmount, tokenInstance, validateAmountValue]);

  const onAmountChange = useCallback((value: string): void => {
    setAmountError(undefined);
    setStreamAmount(value);
  }, []);

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

  /// SIDE EFFECTS ///

  // Load tokens list and initialize with DAI.
  useEffect(() => {
    if (!safe.chainId) {
      return;
    }
    const loadedTokenList: TokenItem[] = getTokenList(safe.chainId as SablierChainId);
    setTokenList(loadedTokenList);

    const dai: TokenItem | undefined = loadedTokenList.find(token => {
      return token.id === "DAI";
    });
    setSelectedToken(dai);
  }, [safe.chainId]);

  // Clear the form every time the user changes the token.
  useEffect(() => {
    if (!safe.chainId || !selectedToken) {
      return;
    }

    setTokenBalance("0");
    setStreamAmount("");
    setAmountError(undefined);

    const provider = new InfuraProvider(safe.chainId, process.env.REACT_APP_INFURA_KEY);
    setTokenInstance(new Contract(selectedToken.address, ERC20_ABI, provider));
  }, [safe.chainId, selectedToken, setTokenBalance]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (!safe.safeAddress || !ethBalance || !selectedToken || !tokenInstance) {
        return;
      }

      // Wait until token is correctly updated.
      if (selectedToken?.address.toLocaleLowerCase() !== tokenInstance?.address.toLocaleLowerCase()) {
        return;
      }

      // Get token balance.
      let newTokenBalance: string;
      if (selectedToken.id === "ETH") {
        newTokenBalance = parseEther(ethBalance).toString();
      } else {
        newTokenBalance = await tokenInstance.balanceOf(safe.safeAddress);
      }

      // Update all the values in a row to avoid UI flickers.
      setTokenBalance(newTokenBalance);
    };

    void getData();
  }, [ethBalance, safe.safeAddress, selectedToken, setTokenBalance, tokenInstance]);

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
