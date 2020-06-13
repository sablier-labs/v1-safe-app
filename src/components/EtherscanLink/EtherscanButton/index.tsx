import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
import EtherscanOpenIcon from "./etherscan-open.svg";

const xs = "4px";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    margin: `0 ${xs}`,
    padding: "0",
    transition: "background-color .2s ease-in-out",
    "&:hover": {
      backgroundColor: "#F0EFEE",
    },
  },
  increasedPopperZindex: {
    zIndex: 2001,
  },
});

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
  className: string;
  increaseZindex?: boolean;
  network: Networks;
  type: string;
  value: string;
}) => {
  const classes = useStyles();
  const customClasses = increaseZindex ? { popper: classes.increasedPopperZindex } : {};

  return (
    <Tooltip classes={customClasses} placement="top" title="Show details on Etherscan">
      <a
        aria-label="Show details on Etherscan"
        className={`${classes.container} ${className}`}
        href={getEtherScanLink(network, type, value)}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="Show on Etherscan" height={20} src={EtherscanOpenIcon} />
      </a>
    </Tooltip>
  );
};

export default EtherscanBtn;
