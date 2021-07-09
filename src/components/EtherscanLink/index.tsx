import styled, { css } from "styled-components";

import { shortenAddress } from "../../utils/address";
import { CopyButton, EtherscanButton } from "./Buttons";

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

type EtherscanLinkProps = {
  chainId: number;
  cut?: number;
  knownAddress?: boolean;
  type: "tx" | "address";
  value: string;
};

function EtherscanLink({ chainId, cut = 0, knownAddress = false, type, value }: EtherscanLinkProps): JSX.Element {
  return (
    <EtherscanLinkContainer>
      <Address knownAddress={knownAddress as boolean}>{cut ? shortenAddress(value, cut) : value}</Address>
      <StyledCopyButton firstButton content={value} />
      <StyledEtherscanButton chainId={chainId} type={type} value={value} />
    </EtherscanLinkContainer>
  );
}

export default EtherscanLink;
