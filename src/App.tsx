import React, { useCallback, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import CreateStreamForm from "./components/CreateStreamForm";
import SablierExplainer from "./components/SablierExplainer";
import StreamTable from "./components/StreamTable";
import getProxyStreams from "./gql/proxyStreams";
import theme from "./theme";

import { ProxyStream } from "./typings";
import { useAppsSdk } from "./hooks";

const OuterWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
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

const TopLeftHorizontalWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const StyledTitle = styled(Title)`
  margin-top: 0px;
  padding-right: 30px;
  display: inline-block;
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
  /** State Variables **/

  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);
  const [shouldDisplayStreams, setShouldDisplayStreams] = useState<boolean>(false);

  const toggleShouldDisplayStreams = useCallback(() => {
    setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
  }, [setShouldDisplayStreams]);

  /** Side Effects **/

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const proxyStreams: ProxyStream[] = await getProxyStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingProxyStreams(proxyStreams);
    };

    loadOutgoingStreams();
  }, [safeInfo, setOutgoingProxyStreams]);

  const renderHomeView = useCallback((): React.ReactNode => {
    return (
      <>
        <LeftWrapper>
          <TopLeftHorizontalWrapper>
            <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
            {outgoingProxyStreams.length > 0 && (
              <StyledButton onClick={toggleShouldDisplayStreams}>Go to dashboard</StyledButton>
            )}
          </TopLeftHorizontalWrapper>
          <CreateStreamForm appsSdk={appsSdk} safeInfo={safeInfo} />
        </LeftWrapper>
        <RightWrapper>
          <SablierExplainer />
        </RightWrapper>
      </>
    );
  }, [appsSdk, outgoingProxyStreams, safeInfo, toggleShouldDisplayStreams]);

  const renderStreamsView = useCallback((): React.ReactNode => {
    return (
      <>
        <TopLeftHorizontalWrapper>
          <StyledTitle size="xs">Manage Existing Streams</StyledTitle>
          <StyledButton onClick={toggleShouldDisplayStreams}>Go to Dashboard</StyledButton>
        </TopLeftHorizontalWrapper>
        <StreamTable appsSdk={appsSdk} outgoingProxyStreams={outgoingProxyStreams} safeInfo={safeInfo} />
      </>
    );
  }, [appsSdk, outgoingProxyStreams, safeInfo, toggleShouldDisplayStreams]);

  return (
    <ThemeProvider theme={theme}>
      <OuterWrapper>{!shouldDisplayStreams ? renderHomeView() : renderStreamsView()}</OuterWrapper>
    </ThemeProvider>
  );
}

export default SablierWidget;
