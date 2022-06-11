import ExternalLinkIcon from "../../../assets/external-link.svg";
import {
  ARBITRUM_MAINNET_ID,
  AVALANCHE_MAINNET_ID,
  BSC_MAINNET_ID,
  ETHEREUM_MAINNET_ID,
  OPTIMISM_MAINNET_ID,
  POLYGON_MAINNET_ID,
  RINKEBY_ID,
} from "../../../constants/chains";
import { LinkContainer, StyledTooltip } from "./common";

function getEtherscanLink(chainId: number, type: string, data: string): string {
  let base;

  switch (chainId) {
    case ARBITRUM_MAINNET_ID:
      base = "https://arbiscan.io";
      break;
    case AVALANCHE_MAINNET_ID:
      base = "https://snowtrace.io";
      break;
    case BSC_MAINNET_ID:
      base = "https://bscscan.com";
      break;
    case ETHEREUM_MAINNET_ID:
      base = "https://etherscan.io";
      break;
    case OPTIMISM_MAINNET_ID:
      base = "https://optimistic.etherscan.io";
      break;
    case POLYGON_MAINNET_ID:
      base = "https://polygonscan.com";
      break;
    case RINKEBY_ID:
      base = "https://rinkeby.etherscan.io";
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
