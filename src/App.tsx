import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import StreamTable from "./components/StreamTable";
import CreateStreamForm from "./components/CreateStreamForm";
import WidgetWrapper from "./components/WidgetWrapper";
import theme from "./theme";

import { useAppsSdk } from "./hooks";
import getProxyStreams from "./gql/proxyStreams";
import { ProxyStream } from "./typings";

const StyledTitle = styled(Title)`
  margin-top: 0px;
  padding-right: 30px;
  display: inline-block;
`;

const StyledBackButton = styled(Button).attrs({
  color: "primary",
  size: "md",
  variant: "outlined",
})`
  font-size: 16px !important;
  min-width: 0 !important;
  padding: 0px !important;
`;

function SablierWidget() {
  /** State Variables **/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [shouldDisplayStreams, setShouldDisplayStreams] = useState<boolean>(false);
  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);

  const toggleShouldDisplayStreams = () => {
    setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
  };

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
  }, [safeInfo]);

  return (
    <ThemeProvider theme={theme}>
      <WidgetWrapper>
        <StyledTitle size="xs">
          {shouldDisplayStreams ? "Manage Existing Streams" : "Create Sablier Stream"}
        </StyledTitle>

        {outgoingProxyStreams.length > 0 && (
          <StyledBackButton onClick={toggleShouldDisplayStreams}>
            {shouldDisplayStreams ? "Back" : "Manage Existing Streams"}
          </StyledBackButton>
        )}

        {shouldDisplayStreams ? (
          <StreamTable appsSdk={appsSdk} safeInfo={safeInfo} outgoingProxyStreams={outgoingProxyStreams} />
        ) : (
          <CreateStreamForm appsSdk={appsSdk} safeInfo={safeInfo} />
        )}
      </WidgetWrapper>
    </ThemeProvider>
  );
}

export default SablierWidget;
