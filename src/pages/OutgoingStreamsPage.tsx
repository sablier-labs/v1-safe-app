import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";

import StreamTable from "../components/StreamTable";

const StreamsOuterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
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

function OutgoingStreamsPage() {
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

export default OutgoingStreamsPage;
