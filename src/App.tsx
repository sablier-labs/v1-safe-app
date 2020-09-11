import React, { useCallback, useState } from "react";
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

function SablierWidget() {
  const outgoingProxyStreams = useOutgoingStreams();

  /** State Variables **/
  const userHasOutgoingStreams = outgoingProxyStreams.length > 0;
  const [shouldDisplayStreams, setShouldDisplayStreams] = useState<boolean>(false);

  const toggleShouldDisplayStreams = useCallback(() => {
    setShouldDisplayStreams((prevShouldDisplayStreams: boolean) => !prevShouldDisplayStreams);
  }, [setShouldDisplayStreams]);

  const renderHomeView = useCallback((): React.ReactNode => {
    return (
      <HomeOuterWrapper>
        <LeftWrapper>
          <TopLeftHorizontalWrapper>
            <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
            {userHasOutgoingStreams && (
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
  }, [userHasOutgoingStreams, toggleShouldDisplayStreams]);

  const renderStreamsView = useCallback((): React.ReactNode => {
    return (
      <StreamsOuterWrapper>
        <TopLeftHorizontalWrapper>
          <StyledTitle size="xs">Manage Existing Streams</StyledTitle>
          <StyledButton onClick={toggleShouldDisplayStreams}>Create a new stream</StyledButton>
        </TopLeftHorizontalWrapper>
        <TableWrapper>
          <StreamTable />
        </TableWrapper>
      </StreamsOuterWrapper>
    );
  }, [toggleShouldDisplayStreams]);

  return <ThemeProvider theme={theme}>{!shouldDisplayStreams ? renderHomeView() : renderStreamsView()}</ThemeProvider>;
}

export default SablierWidget;
