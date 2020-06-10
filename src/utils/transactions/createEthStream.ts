import { Interface } from "@ethersproject/abi";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import wethAbi from "../../abis/weth";

import { Transaction } from "../../typings";
import tokens from "../../config/tokens";
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

  const txs: Transaction[] = [
    {
      data: wethInterface.encodeFunctionData("deposit"),
      to: wethAddress,
      value: deposit,
    },
    ...createStreamTxs(network, recipient, deposit, wethAddress, startTime, stopTime),
  ];

  return txs;
};

export default createEthStreamTxs;
