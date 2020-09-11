import React from "react";
import { HashRouter, Route, Switch, useHistory } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";

import { useOutgoingStreams } from "./contexts/StreamsContext";

import CreateStreamForm from "./components/CreateStreamForm";
import SablierExplainer from "./components/SablierExplainer";
import StreamTable from "./components/StreamTable";
import theme from "./theme";

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

function HomeView() {
  const history = useHistory();
  const outgoingProxyStreams = useOutgoingStreams();
  const userHasOutgoingStreams = outgoingProxyStreams.length > 0;

  return (
    <HomeOuterWrapper>
      <LeftWrapper>
        <TopLeftHorizontalWrapper>
          <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
          {userHasOutgoingStreams && (
            <StyledButton onClick={() => history.push("/outgoing")}>Go to dashboard</StyledButton>
          )}
        </TopLeftHorizontalWrapper>
        <CreateStreamForm />
      </LeftWrapper>
      <RightWrapper>
        <SablierExplainer />
      </RightWrapper>
    </HomeOuterWrapper>
  );
}

function StreamsView() {
  const history = useHistory();

  return (
    <StreamsOuterWrapper>
      <TopLeftHorizontalWrapper>
        <StyledTitle size="xs">Manage Existing Streams</StyledTitle>
        <StyledButton onClick={() => history.push("/")}>Create a new stream</StyledButton>
      </TopLeftHorizontalWrapper>
      <TableWrapper>
        <StreamTable />
      </TableWrapper>
    </StreamsOuterWrapper>
  );
}

function SablierWidget() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route path="/incoming">
            <StreamsView />
          </Route>
          <Route path="/outgoing">
            <StreamsView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default SablierWidget;
