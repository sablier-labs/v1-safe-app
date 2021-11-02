import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { MaxUint256 } from "@ethersproject/constants";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import ERC20_ABI from "../abis/erc20";
import SABLIER_ABI from "../abis/sablier";
import { getSablierContractAddress } from "../config/sablier";

export function createStreamTxs(
  chainId: number,
  recipient: string,
  deposit: BigNumber,
  tokenAddress: string,
  tokenAllowance: BigNumber,
  startTime: string,
  stopTime: string,
): BaseTransaction[] {
  const sablierContractAddress: string = getSablierContractAddress(chainId);
  const txs: BaseTransaction[] = [];

  // The Safe may already have sufficient allowance to spend the tokens, but when this is not the case,
  // we must make the approval ourselves.
  if (tokenAllowance.lt(deposit)) {
    const erc20Interface: Interface = new Interface(ERC20_ABI);
    const approvalTx: BaseTransaction = {
      data: erc20Interface.encodeFunctionData("approve", [sablierContractAddress, MaxUint256.toString()]),
      to: tokenAddress,
      value: "0",
    };
    txs.push(approvalTx);
  }

  const sablierInterface: Interface = new Interface(SABLIER_ABI);
  const streamTx: BaseTransaction = {
    data: sablierInterface.encodeFunctionData("createStream", [
      recipient,
      deposit.toString(),
      tokenAddress,
      startTime,
      stopTime,
    ]),
    to: sablierContractAddress,
    value: "0",
  };
  txs.push(streamTx);

  return txs;
}
