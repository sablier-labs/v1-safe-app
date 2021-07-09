import { BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { Button } from "@gnosis.pm/safe-react-components";
import React, { useCallback, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { ProxyStream } from "../../../types";
import { streamAvailableBalance } from "../../../utils/stream";
import { StreamStatus, getStreamStatus } from "../Status";

const lg: string = "24px";
const md: string = "16px";

const ActionsContainer = styled.div`
  align-content: space-around;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: ${lg} ${md};
`;

const StyledButton = styled(Button).attrs({
  color: "primary",
  size: "md",
  variant: "contained",
})`
  min-width: 120px;
`;

const StyledAnchor = styled.a.attrs({
  rel: "noopener noreferrer",
  target: "_blank",
})`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
`;

type StreamActionsProps = {
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  withdrawStream: (amount: BigNumberish) => void;
  proxyStream: ProxyStream;
};

const StreamActions = ({ cancelStream, proxyStream, withdrawStream }: StreamActionsProps): JSX.Element => {
  const { safe } = useSafeAppsSDK();

  /// MEMOIZED VALUES ///

  const canCancelStream = useMemo(() => {
    return (
      getStreamStatus(proxyStream) === StreamStatus.Active || getStreamStatus(proxyStream) === StreamStatus.Pending
    );
  }, [getStreamStatus, proxyStream]);

  const canWithdrawFromStream = useMemo(() => {
    return (
      proxyStream.recipient === safe.safeAddress?.toLowerCase() && // We are recipient
      getStreamStatus(proxyStream) !== StreamStatus.Cancelled && // Stream hasn't been cancelled (and funds distributed)
      streamAvailableBalance(proxyStream).gt(Zero) // There are funds in stream
    );
  }, [proxyStream, getStreamStatus, safe.safeAddress, streamAvailableBalance]);

  const sablierStreamUrl = useMemo(() => {
    return `https://app.sablier.finance/stream/${proxyStream.id}`;
  }, [proxyStream]);

  /// CALLBACKS ///

  const triggerWithdrawal = useCallback(() => {
    withdrawStream(streamAvailableBalance(proxyStream));
  }, [proxyStream, streamAvailableBalance, withdrawStream]);

  return (
    <ActionsContainer>
      <CopyToClipboard text={sablierStreamUrl}>
        <StyledButton>Copy Stream Link</StyledButton>
      </CopyToClipboard>
      <StyledButton>
        <StyledAnchor href={sablierStreamUrl}>View Stream</StyledAnchor>
      </StyledButton>
      <StyledButton disabled={!canWithdrawFromStream} onClick={triggerWithdrawal}>
        Withdraw
      </StyledButton>
      <StyledButton disabled={!canCancelStream} onClick={cancelStream}>
        Cancel
      </StyledButton>
    </ActionsContainer>
  );
};

export default StreamActions;
