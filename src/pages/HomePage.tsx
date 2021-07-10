import { Button, Title } from "@gnosis.pm/safe-react-components";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import CreateStreamForm from "../components/CreateStreamForm";
import Explainer from "../components/Explainer";
import { useIncomingStreams, useOutgoingStreams } from "../contexts/StreamsContext";

const HomeOuterWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
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
`;

const DashboardNavWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding-left: 32px;
`;

function HomePage(): JSX.Element {
  const history = useHistory();
  const incomingStreams = useIncomingStreams();
  const outgoingStreams = useOutgoingStreams();

  /// MEMOIZED VALUES ///
  const noIncomingStreams = useMemo((): boolean => {
    return incomingStreams.length === 0;
  }, [incomingStreams]);

  const noOutgoingStreams = useMemo((): boolean => {
    return outgoingStreams.length === 0;
  }, [outgoingStreams]);

  return (
    <HomeOuterWrapper>
      <LeftWrapper>
        <TopLeftHorizontalWrapper>
          <StyledTitle size="xs">Create Sablier Stream</StyledTitle>
        </TopLeftHorizontalWrapper>
        <CreateStreamForm />
      </LeftWrapper>
      <RightWrapper>
        <Explainer />
        <DashboardNavWrapper>
          <StyledButton disabled={noIncomingStreams} onClick={() => history.push("/incoming")}>
            View incoming streams
          </StyledButton>
          <StyledButton disabled={noOutgoingStreams} onClick={() => history.push("/outgoing")}>
            View outgoing streams
          </StyledButton>
        </DashboardNavWrapper>
      </RightWrapper>
    </HomeOuterWrapper>
  );
}

export default HomePage;
