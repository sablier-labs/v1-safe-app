import React, { ReactElement, useMemo } from "react";
import { Text } from "@gnosis.pm/safe-react-components";
import styled from "styled-components";
import moment from "moment";

import { getAddress } from "@ethersproject/address";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { Zero } from "@ethersproject/constants";
import { ProxyStream } from "../../../types";
import { BigNumberToRoundedHumanFormat } from "../../../utils";
import useRefreshwithPeriod from "../../../hooks/useRefreshWithPeriod";
import EtherscanLink from "../../EtherscanLink";
import { percentageProgress, recipientShare, senderShare } from "../../../utils/stream";

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

const StreamInfo = ({ proxyStream, network }: { proxyStream: ProxyStream; network: Networks }): ReactElement => {
  useRefreshwithPeriod(1000);
  const { recipient, sender } = proxyStream;
  const { cancellation, deposit, startTime, stopTime, token, withdrawals } = proxyStream.stream;

  /** Memoized Variables **/

  const recipientAddress = useMemo(() => getAddress(recipient), [recipient]);
  const senderAddress = useMemo(() => getAddress(sender), [sender]);
  /* These variables are purposefully not memoised as they depend on the current time */

  const senderBalance = BigNumberToRoundedHumanFormat(
    senderShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const recipientBalance = BigNumberToRoundedHumanFormat(
    recipientShare(deposit, startTime, stopTime, cancellation?.timestamp),
    token.decimals,
    3,
  );

  const withdrawnBalance = withdrawals.reduce((accumulator, { amount }) => accumulator.add(amount), Zero);
  const availableBalance = BigNumberToRoundedHumanFormat(
    cancellation === null ? recipientShare(deposit, startTime, stopTime).sub(withdrawnBalance) : Zero,
    token.decimals,
    3,
  );

  return (
    <StreamDataContainer>
      <StyledText size="md">
        Sender: <EtherscanLink network={network} type="address" value={senderAddress} />
      </StyledText>
      <StyledText size="md">
        Recipient: <EtherscanLink network={network} type="address" value={recipientAddress} />
      </StyledText>
      <StyledText size="md">{`Stream Progress: ${
        moment().isAfter(moment.unix(startTime))
          ? `${percentageProgress(startTime, stopTime, cancellation?.timestamp)}%`
          : `Starts ${moment.unix(startTime).fromNow()}`
      }`}</StyledText>
      <StyledText size="md">{`Sender Balance: ${senderBalance} ${token.symbol}`}</StyledText>
      <StyledText size="md">{`Recipient Balance: ${recipientBalance} ${token.symbol} (${availableBalance} ${token.symbol} available to withdraw)`}</StyledText>
    </StreamDataContainer>
  );
};

export default StreamInfo;
