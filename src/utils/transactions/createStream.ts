import { Interface as AbiInterface } from "@ethersproject/abi/lib";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { ethers } from "ethers";

import erc20Abi from "../../abis/erc20";
import payrollAbi from "../../abis/payroll";

import { TransactionList } from "../../typings";
import { getSablierAddress } from "../../config/sablier";

const createStreamTxs = (
  network: Networks,
  recipient: string,
  deposit: string,
  tokenAddress: string,
  startTime: string,
  stopTime: string,
): TransactionList => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const erc20Interface: AbiInterface = new ethers.utils.Interface(erc20Abi);
  const sablierProxyInterface: AbiInterface = new ethers.utils.Interface(payrollAbi);

  const txs: TransactionList = [];

  txs.push({
    data: erc20Interface.encodeFunctionData("approve", [sablierProxyAddress, deposit]),
    to: tokenAddress,
    value: 0,
  });

  txs.push({
    data: sablierProxyInterface.encodeFunctionData("createSalary", [
      recipient,
      deposit,
      tokenAddress,
      startTime,
      stopTime,
    ]),
    to: sablierProxyAddress,
    value: 0,
  });

  return txs;
};

export default createStreamTxs;
