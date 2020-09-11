import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Button, Title } from "@gnosis.pm/safe-react-components";

import { useOutgoingStreams } from "../contexts/StreamsContext";

import CreateStreamForm from "../components/CreateStreamForm";
import SablierExplainer from "../components/SablierExplainer";

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
  margin-top: -4px !important;
  min-width: 0 !important;
  padding: 0px !important;
`;

function HomePage() {
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

export default HomePage;
