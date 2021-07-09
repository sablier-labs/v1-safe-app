import { Interface } from "@ethersproject/abi";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import WETH_ABI from "../abis/weth";
import tokens from "../config/tokens";
import createStreamTxs from "./createStream";

function createEthStreamTxs(
  chainId: number,
  recipient: string,
  deposit: string,
  startTime: string,
  stopTime: string,
): BaseTransaction[] {
  const wethAddress: string = tokens[chainId].WETH;
  const wethInterface: Interface = new Interface(WETH_ABI);

  const wrappingTx = {
    data: wethInterface.encodeFunctionData("deposit"),
    to: wethAddress,
    value: deposit,
  };

  return [wrappingTx, ...createStreamTxs(chainId, recipient, deposit, wethAddress, startTime, stopTime)];
}

export default createEthStreamTxs;
