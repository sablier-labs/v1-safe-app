import { Interface } from "@ethersproject/abi";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import PAYROLL_ABI from "../abis/payroll";
import { getPayrollContractAddress } from "../config/sablier";
import { SablierChainId } from "../types";

function cancelStreamTx(chainId: SablierChainId, streamId: number): BaseTransaction[] {
  const payrollContractAddress: string = getPayrollContractAddress(chainId);
  const payrollInterface: Interface = new Interface(PAYROLL_ABI);
  const cancellationTx = {
    data: payrollInterface.encodeFunctionData("cancelSalary", [streamId]),
    to: payrollContractAddress,
    value: "0",
  };
  return [cancellationTx];
}

export default cancelStreamTx;
