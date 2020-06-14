import React from "react";
import styled, { css } from "styled-components";

import SablierLogo from "../../assets/sablier-logo.png";

const OuterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0px 32px 32px;
`;

const StyledLogo = styled.img`
  margin: -14px 0px 20px -8px;
`;

const textStyles = css`
  color: rgba(0, 0, 0, 0.87);
  font-family: ${props => props.theme.fonts.fontFamily};
`;

const Text = styled.span`
  ${textStyles};
  font-size: 14px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 16px 0px 0px 4px;
`;

const ListItem = styled.span`
  ${textStyles};
  font-size: 12px;
  line-height: 14px;
  margin-top: 4px;
`;

const BottomWrapper = styled.div`
  margin-top: 16px;
`;

function SablierExplainer() {
  return (
    <OuterWrapper>
      <StyledLogo alt="Sablier Logo" height={60} src={SablierLogo} width={200} />
      <Text>
        Sablier is an app for constant, continuous, by-the-second payments. This is also called &quot;money
        streaming&quot;.
      </Text>
      <ListWrapper>
        <ListItem>• Select an ERC20 token you want to use.</ListItem>
        <ListItem>• Type an amount.</ListItem>
        <ListItem>• Type the Ethereum address of the recipient - maybe an employee or a contractor.</ListItem>
        <ListItem>• Choose a duration - the period over which the amount will be streamed.</ListItem>
        <ListItem>• Submit the transaction and let the streaming begin! </ListItem>
      </ListWrapper>
      <BottomWrapper>
        <Text>You can cancel the stream at any time, should you need to do this.</Text>
      </BottomWrapper>
    </OuterWrapper>
  );
}

export default SablierExplainer;
