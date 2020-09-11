import { Interface } from "@ethersproject/abi";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import payrollAbi from "../abis/payroll";

import { Transaction } from "../types";
import { getSablierAddress } from "../config/sablier";

const cancelStreamTxs = (network: Networks, streamId: number): Transaction[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const sablierProxyInterface: Interface = new Interface(payrollAbi);
  const txs: Transaction[] = [
    {
      data: sablierProxyInterface.encodeFunctionData("cancelSalary", [streamId]),
      to: sablierProxyAddress,
      value: 0,
    },
  ];
  return txs;
};

export default cancelStreamTxs;
