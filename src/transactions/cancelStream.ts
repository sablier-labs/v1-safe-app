import { Interface as AbiInterface } from "@ethersproject/abi/lib";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { ethers } from "ethers";

import payrollAbi from "../abis/payroll";

import { TransactionList } from "../typings/types";
import { getSablierAddress } from "../config/sablier";

const cancelStreamTxs = (network: Networks, streamId: string): {}[] => {
  const sablierProxyAddress: string = getSablierAddress(network);
  const sablierProxyInterface: AbiInterface = new ethers.utils.Interface(payrollAbi);
  const txs: TransactionList = [
    {
      data: sablierProxyInterface.encodeFunctionData("cancelSalary", [streamId]),
      to: sablierProxyAddress,
      value: 0,
    },
  ];
  return txs;
};

export default cancelStreamTxs;
