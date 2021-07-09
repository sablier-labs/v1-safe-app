import { Interface } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import PAYROLL_ABI from "../abis/payroll";
import { getPayrollContractAddress } from "../config/sablier";
import { SablierChainId } from "../types";

function withdrawStreamTx(chainId: SablierChainId, streamId: number, amount: BigNumberish): BaseTransaction[] {
  const payrollContractAddress: string = getPayrollContractAddress(chainId);
  const payrollInterface: Interface = new Interface(PAYROLL_ABI);

  const withdrawalTx = {
    data: payrollInterface.encodeFunctionData("withdrawFromSalary", [streamId, amount]),
    to: payrollContractAddress,
    value: "0",
  };

  return [withdrawalTx];
}

export default withdrawStreamTx;
