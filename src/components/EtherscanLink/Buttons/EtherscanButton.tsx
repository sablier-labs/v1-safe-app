import ExternalLinkIcon from "../../../assets/external-link.svg";
import { ETHEREUM_MAINNET_ID, GOERLI_ID, KOVAN_ID, RINKEBY_ID, ROPSTEN_ID } from "../../../constants/chains";
import { LinkContainer, StyledTooltip } from "./common";

function getEtherscanLink(chainId: number, type: string, data: string): string {
  let base;

  switch (chainId) {
    case ETHEREUM_MAINNET_ID:
      base = "https://ethersscan.io";
      break;
    case GOERLI_ID:
      base = "https://goerli.etherscan.io";
      break;
    case KOVAN_ID:
      base = "https://kovan.etherscan.io";
      break;
    case RINKEBY_ID:
      base = "https://rinkeby.etherscan.io";
      break;
    case ROPSTEN_ID:
      base = "https://ropsten.etherscan.io";
      break;
    default:
      base = "https://etherscan.io";
  }

  switch (type) {
    case "transaction": {
      return `${base}/tx/${data}`;
    }
    case "address":
    default: {
      return `${base}/address/${data}`;
    }
  }
}

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
    <StyledTooltip increaseZindex={increaseZindex} placement="top" title="Show details on Etherscan">
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
