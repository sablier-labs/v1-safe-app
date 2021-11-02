import { getAddress } from "@ethersproject/address";
import { Zero } from "@ethersproject/constants";
import { Text } from "@gnosis.pm/safe-react-components";
import { formatDistanceToNow, isPast } from "date-fns";
import { useMemo } from "react";
import styled from "styled-components";

import useRefreshWithPeriod from "../../../hooks/useRefreshWithPeriod";
import type { Stream } from "../../../types";
import { bigNumberToRoundedHumanFormat } from "../../../utils";
import { getRecipientShare, getRecipientShareAsPercentage, getSenderShare } from "../../../utils/stream";
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

const AddressContainer = styled.div``;

const StyledText = styled(Text).attrs({ size: "md" })`
  margin: 8px 0px;
`;

type StreamInfoProps = { chainId: number; stream: Stream };

const StreamInfo = ({ chainId, stream }: StreamInfoProps): JSX.Element => {
  const { cancellation, deposit, recipient, sender, startTime, stopTime, token, withdrawals } = stream;

  /// MEMOIZED VALUES ///

  const recipientAddress = useMemo(() => {
    return getAddress(recipient);
  }, [recipient]);

  const senderAddress = useMemo(() => {
    return getAddress(sender);
  }, [sender]);

  // These variables are purposefully not memoised as they actually need to be updated continuously.
  useRefreshWithPeriod(1000);

  const senderBalance = bigNumberToRoundedHumanFormat(
    getSenderShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const recipientBalance = bigNumberToRoundedHumanFormat(
    getRecipientShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => accumulator.add(amount), Zero);
  const availableBalance = bigNumberToRoundedHumanFormat(
    cancellation === null ? getRecipientShare(deposit, startTime, stopTime).sub(withdrawnBalance) : Zero,
    token.decimals,
    3,
  );

  return (
    <StreamDataContainer>
      <AddressContainer>
        <EtherscanLink chainId={chainId} prefix="Sender:" type="address" value={senderAddress} />
      </AddressContainer>
      <AddressContainer>
        <EtherscanLink chainId={chainId} prefix="Recipient:" type="address" value={recipientAddress} />
      </AddressContainer>
      <StyledText>{`Stream Progress: ${
        isPast(new Date(startTime * 1000))
          ? `${getRecipientShareAsPercentage(startTime, stopTime, cancellation?.timestamp)}%`
          : `Starts ${formatDistanceToNow(new Date(startTime * 1000))}`
      }`}</StyledText>
      <StyledText>{`Sender Balance: ${senderBalance} ${token.symbol}`}</StyledText>
      <StyledText>{`Recipient Balance: ${recipientBalance} ${token.symbol} (${availableBalance} ${token.symbol} available to withdraw)`}</StyledText>
    </StreamDataContainer>
  );
};

export default StreamInfo;
