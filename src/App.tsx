import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import StreamTable from "./components/StreamTable";
import CreateStreamForm from "./components/CreateStreamForm";
import WidgetWrapper from "./components/WidgetWrapper";
import theme from "./theme";

import { useAppsSdk } from "./hooks";

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

  return (
    <ThemeProvider theme={theme}>
      <WidgetWrapper>
        <StyledTitle size="xs">
          {shouldDisplayStreams ? "Manage Existing Streams" : "Create Sablier Stream"}
        </StyledTitle>
        {shouldDisplayStreams && (
          <StyledBackButton
            onClick={() => {
              setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
            }}
          >
            Back
          </StyledBackButton>
        )}

        {shouldDisplayStreams ? (
          <StreamTable appsSdk={appsSdk} safeInfo={safeInfo} />
        ) : (
          <CreateStreamForm
            appsSdk={appsSdk}
            safeInfo={safeInfo}
            toggleShouldDisplayStreams={() => {
              setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
            }}
          />
        )}
      </WidgetWrapper>
    </ThemeProvider>
  );
}

export default SablierWidget;
