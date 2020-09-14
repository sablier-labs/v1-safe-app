import { Interface } from "@ethersproject/abi";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import { Transaction } from "../types";
import wethAbi from "../abis/weth";

import tokens from "../config/tokens";
import createStreamTxs from "./createStream";

const createEthStreamTxs = (
  network: Networks,
  recipient: string,
  deposit: string,
  startTime: string,
  stopTime: string,
): Transaction[] => {
  const wethAddress: string = tokens[network].WETH;
  const wethInterface: Interface = new Interface(wethAbi);

  const wrappingTx = {
    data: wethInterface.encodeFunctionData("deposit"),
    to: wethAddress,
    value: deposit,
  };

  return [wrappingTx, ...createStreamTxs(network, recipient, deposit, wethAddress, startTime, stopTime)];
};

export default createEthStreamTxs;
