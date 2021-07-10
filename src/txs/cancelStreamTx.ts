import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";

import PAYROLL_ABI from "../abis/payroll";
import SABLIER_ABI from "../abis/sablier";
import { getPayrollContractAddress, getSablierContractAddress } from "../config/sablier";
import { CUTOFF_STREAM_ID } from "../constants";
import { SablierChainId } from "../types";

function cancelStreamTx(chainId: SablierChainId, streamId: number): BaseTransaction[] {
  const cancellationTx: BaseTransaction = {
    data: "",
    to: "",
    value: "0",
  };

  // Sablier v1.0.0 is used before the cutoff stream id, while Sablier v1.1.0 is used afterwards.
  if (BigNumber.from(streamId).gte(CUTOFF_STREAM_ID)) {
    const sablierInterface: Interface = new Interface(SABLIER_ABI);
    cancellationTx.data = sablierInterface.encodeFunctionData("cancelStream", [streamId]);
    const sablierContractAddress: string = getSablierContractAddress(chainId);
    cancellationTx.to = sablierContractAddress;
  } else {
    const payrollInterface: Interface = new Interface(PAYROLL_ABI);
    cancellationTx.data = payrollInterface.encodeFunctionData("cancelSalary", [streamId]);
    const payrollContractAddress: string = getPayrollContractAddress(chainId);
    cancellationTx.to = payrollContractAddress;
  }

  return [cancellationTx];
}

export default cancelStreamTx;
