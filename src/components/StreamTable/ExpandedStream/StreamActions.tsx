import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";
import { Button } from "@gnosis.pm/safe-react-components";
import { useCallback, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { StreamStatus } from "../../../constants/streams";
import useMaxWithdrawable from "../../../hooks/useMaxWithdrawable";
import { cancelStreamTx, withdrawStreamTx } from "../../../txs";
import type { Stream } from "../../../types";
import { getStreamStatus } from "../../../utils/stream";

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
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
`;

type StreamActionsProps = {
  stream: Stream;
};

function StreamActions({ stream }: StreamActionsProps): JSX.Element {
  const { safe, sdk } = useSafeAppsSDK();

  /// MEMOIZED VALUES ///

  const isCancelStreamDisabled = useMemo(() => {
    if (!safe.safeAddress) {
      return true;
    }
    return (
      stream.sender !== safe.safeAddress.toLowerCase() || // Not sender
      getStreamStatus(stream) === StreamStatus.Cancelled || // Stream cancelled
      getStreamStatus(stream) === StreamStatus.Ended // Stream ended
    );
  }, [safe.safeAddress, stream]);

  const isWithdrawFromStreamDisabled = useMemo(() => {
    if (!safe.safeAddress) {
      return true;
    }
    return (
      stream.recipient !== safe.safeAddress.toLowerCase() || // Not recipient
      getStreamStatus(stream) === StreamStatus.Cancelled // Stream cancelled (and funds distributed)
    );
  }, [stream, safe.safeAddress]);
  const withdrawableAmount = useMaxWithdrawable(stream, isWithdrawFromStreamDisabled);

  const sablierStreamUrl = useMemo(() => {
    return `https://app.sablier.finance/stream/${stream.id}`;
  }, [stream]);

  /// CALLBACKS ///

  const cancelStream = useCallback((): void => {
    async function sendTx(): Promise<void> {
      if (!safe.chainId) {
        return;
      }

      const txs: BaseTransaction[] = cancelStreamTx(safe.chainId, stream.id);
      try {
        await sdk.txs.send({ txs });
      } catch (error) {
        console.error("Error while cancelling the stream", error);
      }
    }

    void sendTx();
  }, [safe.chainId, sdk, stream]);

  const withdrawStream = useCallback((): void => {
    async function sendTx(): Promise<void> {
      if (!safe.chainId || withdrawableAmount.isZero()) {
        return;
      }

      try {
        const txs: BaseTransaction[] = withdrawStreamTx(safe.chainId, stream.id, withdrawableAmount.toString());
        await sdk.txs.send({ txs });
      } catch (error) {
        console.error("Error while withdrawing from the stream", error);
      }
    }

    void sendTx();
  }, [safe.chainId, sdk, stream, withdrawableAmount]);

  return (
    <ActionsContainer>
      <CopyToClipboard text={sablierStreamUrl}>
        <StyledButton>Copy Stream Link</StyledButton>
      </CopyToClipboard>
      <StyledButton>
        <StyledAnchor href={sablierStreamUrl}>View Stream</StyledAnchor>
      </StyledButton>
      <StyledButton disabled={isWithdrawFromStreamDisabled} onClick={withdrawStream}>
        Withdraw
      </StyledButton>
      <StyledButton disabled={isCancelStreamDisabled} onClick={cancelStream}>
        Cancel
      </StyledButton>
    </ActionsContainer>
  );
}

export default StreamActions;
