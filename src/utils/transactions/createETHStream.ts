import { Interface as AbiInterface } from "@ethersproject/abi/lib";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { ethers } from "ethers";

import wethAbi from "../../abis/weth";

import { TransactionList } from "../../typings";
import tokens from "../../config/tokens";
import createStreamTxs from "./createStream";

const createEthStreamTxs = (
  network: Networks,
  recipient: string,
  deposit: string,
  startTime: string,
  stopTime: string,
): TransactionList => {
  const wethAddress: string = tokens[network].WETH;
  const wethInterface: AbiInterface = new ethers.utils.Interface(wethAbi);

  const txs: TransactionList = [
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
