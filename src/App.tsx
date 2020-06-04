import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import { Title } from "@gnosis.pm/safe-react-components";

import StreamTable from "./components/StreamTable";
import CreateStreamForm from "./components/CreateStreamForm";
import theme from "./theme";

import { BodyArea, Container, NavbarArea, TitleArea } from "./theme/components";
import { useAppsSdk } from "./hooks";

const StyledTitle = styled(Title)`
  margin-top: 0px;
`;

function SablierWidget() {
  /*** State Variables ***/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleArea>
          <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
        </TitleArea>

        <NavbarArea>
          <CreateStreamForm appsSdk={appsSdk} safeInfo={safeInfo} />
        </NavbarArea>

        <BodyArea>
          <StreamTable appsSdk={appsSdk} safeInfo={safeInfo} />
        </BodyArea>
      </Container>
    </ThemeProvider>
  );
}

export default SablierWidget;
