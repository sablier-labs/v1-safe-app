import { Button, Title } from "@gnosis.pm/safe-react-components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import StreamTable from "../components/StreamTable";
import { useIncomingStreams } from "../contexts/StreamsContext";

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

function IncomingStreamsPage(): JSX.Element {
  const navigate = useNavigate();
  const incomingStreams = useIncomingStreams();

  return (
    <StreamsOuterWrapper>
      <TopLeftHorizontalWrapper>
        <StyledTitle size="xs">Manage Incoming Streams</StyledTitle>
        <StyledButton onClick={() => navigate("/")}>Return to main page</StyledButton>
      </TopLeftHorizontalWrapper>
      <TableWrapper>
        <StreamTable streams={incomingStreams} />
      </TableWrapper>
    </StreamsOuterWrapper>
  );
}

export default IncomingStreamsPage;
