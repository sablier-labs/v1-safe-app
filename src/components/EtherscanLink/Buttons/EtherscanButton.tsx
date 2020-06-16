import React from "react";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
import EtherscanOpenIcon from "./etherscan-open.svg";
import { LinkContainer, StyledTooltip } from "./components";

const getEtherScanLink = (network: Networks, type: string, value: string): string => {
  return `https://${
    network.toLowerCase() === "mainnet" ? "" : `${network.toLowerCase()}.`
  }etherscan.io/${type}/${value}`;
};

const EtherscanBtn = ({
  className = "",
  increaseZindex = false,
  network,
  type,
  value,
}: {
  className?: string;
  increaseZindex?: boolean;
  network: Networks;
  type: string;
  value: string;
}) => {
  return (
    <StyledTooltip increaseZindex={increaseZindex} placement="top" title="Show details on Etherscan">
      <LinkContainer
        aria-label="Show details on Etherscan"
        className={className}
        href={getEtherScanLink(network, type, value)}
      >
        <img alt="Show on Etherscan" height={20} src={EtherscanOpenIcon} />
      </LinkContainer>
    </StyledTooltip>
  );
};

export default EtherscanBtn;
