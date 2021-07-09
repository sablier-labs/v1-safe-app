import { AddressZero } from "@ethersproject/constants";
import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "../constants";
import { SablierChainId } from "../types";

export type PayrollContractsMap = { [key in SablierChainId]: string };

const payrollContracts: PayrollContractsMap = {
  [GOERLI_ID]: "0x8eB93647490DF9989295461AB2AcdEDdCCA84781",
  [KOVAN_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  [MAINNET_ID]: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  [RINKEBY_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  [ROPSTEN_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
};

export const getPayrollContractAddress = (chainId: SablierChainId): string => {
  const contract: string = payrollContracts[chainId];
  if (contract === AddressZero) {
    throw Error(`Sablier not deployed on ${chainId}`);
  }
  return contract;
};
