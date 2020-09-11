import React, { useCallback, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";

import CreateStreamForm from "./components/CreateStreamForm";
import SablierExplainer from "./components/SablierExplainer";
import StreamTable from "./components/StreamTable";
import getProxyStreams from "./gql/proxyStreams";
import theme from "./theme";

import { ProxyStream } from "./typings";
import { useSafeAddress, useSafeNetwork } from "./contexts/SafeContext";

const HomeOuterWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

const StreamsOuterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const TableWrapper = styled.div`
  flex-grow: 1;
`;

const TopLeftHorizontalWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledTitle = styled(Title)`
  display: inline-block;
  margin-top: 0px;
  padding-right: 30px;
`;

const StyledButton = styled(Button).attrs({
  color: "primary",
  size: "md",
  variant: "outlined",
})`
  font-size: 14px !important;
  margin-top: -4px !important;
  min-width: 0 !important;
  padding: 0px !important;
`;

function SablierWidget() {
  const safeAddress = useSafeAddress();
  const network = useSafeNetwork();

  /** State Variables **/

  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);
  const [shouldDisplayStreams, setShouldDisplayStreams] = useState<boolean>(false);

  const toggleShouldDisplayStreams = useCallback(() => {
    setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
  }, [setShouldDisplayStreams]);

  /** Side Effects **/

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!network || !safeAddress) {
        return;
      }

      const proxyStreams: ProxyStream[] = await getProxyStreams(network, safeAddress);
      setOutgoingProxyStreams(proxyStreams);
    };

    loadOutgoingStreams();
  }, [network, safeAddress, setOutgoingProxyStreams]);

  const renderHomeView = useCallback((): React.ReactNode => {
    return (
      <HomeOuterWrapper>
        <LeftWrapper>
          <TopLeftHorizontalWrapper>
            <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
            {outgoingProxyStreams.length > 0 && (
              <StyledButton onClick={toggleShouldDisplayStreams}>Go to dashboard</StyledButton>
            )}
          </TopLeftHorizontalWrapper>
          <CreateStreamForm />
        </LeftWrapper>
        <RightWrapper>
          <SablierExplainer />
        </RightWrapper>
      </HomeOuterWrapper>
    );
  }, [outgoingProxyStreams, toggleShouldDisplayStreams]);

  const renderStreamsView = useCallback((): React.ReactNode => {
    return (
      <StreamsOuterWrapper>
        <TopLeftHorizontalWrapper>
          <StyledTitle size="xs">Manage Existing Streams</StyledTitle>
          <StyledButton onClick={toggleShouldDisplayStreams}>Create a new stream</StyledButton>
        </TopLeftHorizontalWrapper>
        <TableWrapper>
          <StreamTable outgoingProxyStreams={outgoingProxyStreams} />
        </TableWrapper>
      </StreamsOuterWrapper>
    );
  }, [outgoingProxyStreams, toggleShouldDisplayStreams]);

  return <ThemeProvider theme={theme}>{!shouldDisplayStreams ? renderHomeView() : renderStreamsView()}</ThemeProvider>;
}

export default SablierWidget;
