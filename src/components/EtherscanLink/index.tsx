import React from "react";

import styled, { css } from "styled-components";
import { CopyButton, EtherscanButton } from "./Buttons";
import { shortenAddress } from "../../utils/address";

const secondaryText = "#B2B5B2";

const EtherscanLinkContainer = styled.div`
  display: inline-flex;
  align-items: center;

  &:svg {
    fill: ${secondaryText};
  }
`;

const Address = styled.span`
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ knownAddress }: { knownAddress: boolean }) =>
    knownAddress &&
    css`
      fontsize: 13px;
    `}
`;

const buttonCss = css`
  height: 24px;
  margin: 0;
  width: 24px;

  ${({ firstButton }: { firstButton?: boolean }) => firstButton && `margin-left: 8px;`}
`;

const StyledCopyButton = styled(CopyButton)`
  ${buttonCss}
`;

const StyledEtherscanButton = styled(EtherscanButton)`
  ${buttonCss}
`;

const EtherscanLink = ({ cut, knownAddress, network, type, value }: any) => (
  <EtherscanLinkContainer>
    <Address knownAddress={knownAddress}>{cut ? shortenAddress(value, cut) : value}</Address>
    <StyledCopyButton firstButton content={value} />
    <StyledEtherscanButton network={network} type={type} value={value} />
    {/* {knownAddress !== undefined ? <EllipsisTransactionDetails address={value} knownAddress={knownAddress} /> : null} */}
  </EtherscanLinkContainer>
);

export default EtherscanLink;
