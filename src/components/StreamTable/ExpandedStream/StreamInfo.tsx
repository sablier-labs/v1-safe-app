import { getAddress } from "@ethersproject/address";
import { Zero } from "@ethersproject/constants";
import { Text } from "@gnosis.pm/safe-react-components";
import { formatDistanceToNow, isPast } from "date-fns";
import { useMemo } from "react";
import styled from "styled-components";

import useRefreshWithPeriod from "../../../hooks/useRefreshWithPeriod";
import { ProxyStream } from "../../../types";
import { bigNumberToRoundedHumanFormat } from "../../../utils";
import { percentageProgress, recipientShare, senderShare } from "../../../utils/stream";
import EtherscanLink from "../../EtherscanLink";

const lg = "24px";
const md = "16px";

const StreamDataContainer = styled.div`
  align-content: space-around;
  align-items: space-around;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: ${lg} ${md};
`;

const StyledText = styled(Text)`
  margin: 8px 0px;
`;

type StreamInfoProps = { chainId: number; proxyStream: ProxyStream };

const StreamInfo = ({ chainId, proxyStream }: StreamInfoProps): JSX.Element => {
  useRefreshWithPeriod(1000);
  const { recipient, sender } = proxyStream;
  const { cancellation, deposit, startTime, stopTime, token, withdrawals } = proxyStream.stream;

  /// MEMOIZED VALUES ///

  const recipientAddress = useMemo(() => {
    return getAddress(recipient);
  }, [recipient]);

  const senderAddress = useMemo(() => {
    return getAddress(sender);
  }, [sender]);

  // These variables are purposefully not memoised as they depend on the current time.
  const senderBalance = bigNumberToRoundedHumanFormat(
    senderShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const recipientBalance = bigNumberToRoundedHumanFormat(
    recipientShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => accumulator.add(amount), Zero);
  const availableBalance = bigNumberToRoundedHumanFormat(
    cancellation === null ? recipientShare(deposit, startTime, stopTime).sub(withdrawnBalance) : Zero,
    token.decimals,
    3,
  );

  return (
    <StreamDataContainer>
      <StyledText size="md">
        Sender: <EtherscanLink chainId={chainId} type="address" value={senderAddress} />
      </StyledText>
      <StyledText size="md">
        Recipient: <EtherscanLink chainId={chainId} type="address" value={recipientAddress} />
      </StyledText>
      <StyledText size="md">{`Stream Progress: ${
        isPast(new Date(startTime * 1000))
          ? `${percentageProgress(startTime, stopTime, cancellation?.timestamp)}%`
          : `Starts ${formatDistanceToNow(new Date(startTime * 1000))}`
      }`}</StyledText>
      <StyledText size="md">{`Sender Balance: ${senderBalance} ${token.symbol}`}</StyledText>
      <StyledText size="md">{`Recipient Balance: ${recipientBalance} ${token.symbol} (${availableBalance} ${token.symbol} available to withdraw)`}</StyledText>
    </StreamDataContainer>
  );
};

export default StreamInfo;
