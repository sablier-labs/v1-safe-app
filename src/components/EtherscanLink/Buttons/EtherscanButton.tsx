import ExternalLinkIcon from "../../../assets/external-link.svg";
import { CHAIN_LABELS, MAINNET_ID } from "../../../constants/chains";
import { LinkContainer, StyledTooltip } from "./common";

const getEtherscanLink = (chainId: number, type: string, value: string): string => {
  return `https://${chainId === MAINNET_ID ? "" : `${CHAIN_LABELS[chainId]}.`}etherscan.io/${type}/${value}`;
};

type EtherscanButtonProps = {
  chainId: number;
  className?: string;
  increaseZindex?: boolean;
  type: string;
  value: string;
};

function EtherscanButton({
  chainId,
  className = "",
  increaseZindex = false,
  type,
  value,
}: EtherscanButtonProps): JSX.Element {
  return (
    <StyledTooltip $increaseZindex={increaseZindex} placement="top" title="Show details on Etherscan">
      <LinkContainer
        aria-label="Show details on Etherscan"
        className={className}
        href={getEtherscanLink(chainId, type, value)}
      >
        <img alt="Show on Etherscan" height={20} src={ExternalLinkIcon} />
      </LinkContainer>
    </StyledTooltip>
  );
}

export default EtherscanButton;
