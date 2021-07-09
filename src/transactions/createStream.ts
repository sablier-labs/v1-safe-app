import { Interface } from "@ethersproject/abi";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import ERC20_ABI from "../abis/erc20";
import PAYROLL_ABI from "../abis/payroll";
import { getPayrollContractAddress } from "../config/sablier";

function createStreamTxs(
  chainId: number,
  recipient: string,
  deposit: string,
  tokenAddress: string,
  startTime: string,
  stopTime: string,
): BaseTransaction[] {
  const payrollContractAddress: string = getPayrollContractAddress(chainId);
  const erc20Interface: Interface = new Interface(ERC20_ABI);
  const payrollInterface: Interface = new Interface(PAYROLL_ABI);

  const approvalTx = {
    data: erc20Interface.encodeFunctionData("approve", [payrollContractAddress, deposit]),
    to: tokenAddress,
    value: "0",
  };

  const streamTx = {
    data: payrollInterface.encodeFunctionData("createSalary", [recipient, deposit, tokenAddress, startTime, stopTime]),
    to: payrollContractAddress,
    value: "0",
  };

  return [approvalTx, streamTx];
}

export default createStreamTxs;
