import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import CopyBtn from "./CopyButton";
import EtherscanButton from "./EtherscanButton";
import { shortenAddress } from "../../utils/address";

const secondaryText = "#B2B5B2";

const useStyles = makeStyles(() => ({
  etherscanLink: {
    display: "flex",
    alignItems: "center",

    "& svg": {
      fill: secondaryText,
    },
  },
  address: {
    display: "block",
    // flexShrink: "1",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  addressParagraph: {
    fontSize: "13px",
  },
  button: {
    height: "24px",
    margin: "0",
    width: "24px",
  },
  firstButton: {
    marginLeft: "8px",
  },
}));

const EtherscanLink = ({ cut, knownAddress, network, type, value }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.etherscanLink}>
      <span className={`${knownAddress && classes.addressParagraph} ${classes.address}`}>
        {cut ? shortenAddress(value, cut) : value}
      </span>
      <CopyBtn className={`${classes.button} ${classes.firstButton}`} content={value} />
      <EtherscanButton className={classes.button} network={network} type={type} value={value} />
      {/* {knownAddress !== undefined ? <EllipsisTransactionDetails address={value} knownAddress={knownAddress} /> : null} */}
    </div>
  );
};

export default EtherscanLink;
