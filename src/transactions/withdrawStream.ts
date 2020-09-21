import { Interface } from "@ethersproject/abi";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";

import { BigNumberish } from "@ethersproject/bignumber";
import payrollAbi from "../abis/payroll";

import { SablierNetworks } from "../types";
import { getSablierAddress } from "../config/sablier";

const withdrawStreamTxs = (network: SablierNetworks, streamId: number, amount: BigNumberish): Transaction[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const sablierProxyInterface: Interface = new Interface(payrollAbi);

  const withdrawalTx = {
    data: sablierProxyInterface.encodeFunctionData("withdrawFromSalary", [streamId, amount]),
    to: sablierProxyAddress,
    value: "0",
  };

  return [withdrawalTx];
};

export default withdrawStreamTxs;
