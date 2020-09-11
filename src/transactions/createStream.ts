import { Interface } from "@ethersproject/abi";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import erc20Abi from "../abis/erc20";
import payrollAbi from "../abis/payroll";

import { Transaction } from "../types";
import { getSablierAddress } from "../config/sablier";

const createStreamTxs = (
  network: Networks,
  recipient: string,
  deposit: string,
  tokenAddress: string,
  startTime: string,
  stopTime: string,
): Transaction[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const erc20Interface: Interface = new Interface(erc20Abi);
  const sablierProxyInterface: Interface = new Interface(payrollAbi);

  const txs: Transaction[] = [];

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
