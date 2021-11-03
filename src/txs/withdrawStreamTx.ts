import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import type { BigNumberish } from "@ethersproject/bignumber";
import type { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import PAYROLL_ABI from "../abis/payroll";
import SABLIER_ABI from "../abis/sablier";
import { getPayrollContractAddress, getSablierContractAddress } from "../config/sablier";
import { CUTOFF_STREAM_ID } from "../constants/streams";
import type { SablierChainId } from "../types";

export function withdrawStreamTx(chainId: SablierChainId, streamId: number, amount: BigNumberish): BaseTransaction[] {
  const withdrawalTx: BaseTransaction = {
    data: "",
    to: "",
    value: "0",
  };

  // Sablier v1.0.0 is used before the cutoff stream id, while Sablier v1.1.0 is used afterwards.
  if (BigNumber.from(streamId).gte(CUTOFF_STREAM_ID)) {
    const sablierInterface: Interface = new Interface(SABLIER_ABI);
    withdrawalTx.data = sablierInterface.encodeFunctionData("withdrawFromStream", [streamId, amount]);
    const sablierContractAddress: string = getSablierContractAddress(chainId);
    withdrawalTx.to = sablierContractAddress;
  } else {
    const payrollInterface: Interface = new Interface(PAYROLL_ABI);
    withdrawalTx.data = payrollInterface.encodeFunctionData("withdrawFromSalary", [streamId, amount]);
    const payrollContractAddress: string = getPayrollContractAddress(chainId);
    withdrawalTx.to = payrollContractAddress;
  }

  return [withdrawalTx];
}
