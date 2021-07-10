import { Text } from "@gnosis.pm/safe-react-components";
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

const StyledText = styled(Text).attrs({ size: "md" })`
  display: flex;
  flex-flow: row nowrap;
  margin: 8px 0px;
`;

const PrefixSpan = styled.span``;

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
  prefix: string;
  type: "tx" | "address";
  value: string;
};

function EtherscanLink({
  chainId,
  cut = 0,
  knownAddress = false,
  prefix,
  type,
  value,
}: EtherscanLinkProps): JSX.Element {
  return (
    <EtherscanLinkContainer>
      <StyledText>
        <PrefixSpan>{prefix}</PrefixSpan>
        &nbsp;
        <Address knownAddress={knownAddress}>{cut ? shortenAddress(value, cut) : value}</Address>
      </StyledText>
      <StyledCopyButton content={value} firstButton />
      <StyledEtherscanButton chainId={chainId} type={type} value={value} />
    </EtherscanLinkContainer>
  );
}

export default EtherscanLink;
