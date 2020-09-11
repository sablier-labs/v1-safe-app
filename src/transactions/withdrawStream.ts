import { Interface } from "@ethersproject/abi";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import payrollAbi from "../abis/payroll";

import { Transaction } from "../types";
import { getSablierAddress } from "../config/sablier";

const withdrawStreamTxs = (network: Networks, streamId: string, amount: string): Transaction[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const sablierProxyInterface: Interface = new Interface(payrollAbi);

  const withdrawalTx = {
    data: sablierProxyInterface.encodeFunctionData("withdrawFromSalary", [streamId, amount]),
    to: sablierProxyAddress,
    value: 0,
  };

  return [withdrawalTx];
};

export default withdrawStreamTxs;
