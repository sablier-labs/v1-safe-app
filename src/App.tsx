import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { Title, Button } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import theme from "./theme";

import { useAppsSdk } from "./hooks";
import StreamTable from "./components/StreamTable";
import CreateStreamForm from "./components/CreateStreamForm";
import WidgetWrapper from "./components/WidgetWrapper";

const StyledTitle = styled(Title)`
  margin-top: 0px;
`;

function SablierWidget() {
  /*** State Variables ***/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [displayStreams, setDisplayStreams] = useState<boolean>(false);

  const toggleDisplayStreams = () => setDisplayStreams(!displayStreams);

  return (
    <ThemeProvider theme={theme}>
      <WidgetWrapper>
        <StyledTitle size="xs">{displayStreams ? "Manage Active Streams" : "Create Sablier Stream"}</StyledTitle>
        {displayStreams && (
          <Button size="md" color="primary" variant="outlined" onClick={() => toggleDisplayStreams()}>
            Back
          </Button>
        )}

        {displayStreams ? (
          <StreamTable appsSdk={appsSdk} safeInfo={safeInfo} />
        ) : (
          <CreateStreamForm appsSdk={appsSdk} safeInfo={safeInfo} toggleDisplayStreams={toggleDisplayStreams} />
        )}
      </WidgetWrapper>
    </ThemeProvider>
  );
}

export default SablierWidget;
