import { Interface } from "@ethersproject/abi";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";

import payrollAbi from "../abis/payroll";

import { getSablierAddress } from "../config/sablier";
import { SablierNetworks } from "../types";

const cancelStreamTxs = (network: SablierNetworks, streamId: number): Transaction[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const sablierProxyInterface: Interface = new Interface(payrollAbi);
  const cancellationTx = {
    data: sablierProxyInterface.encodeFunctionData("cancelSalary", [streamId]),
    to: sablierProxyAddress,
    value: "0",
  };
  return [cancellationTx];
};

export default cancelStreamTxs;
