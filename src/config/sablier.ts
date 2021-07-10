import { AddressZero } from "@ethersproject/constants";

import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "../constants/chains";
import { SablierChainId } from "../types";

type PayrollContractsMap = { [chainId in SablierChainId]: string };

const payrollContracts: PayrollContractsMap = {
  [GOERLI_ID]: "0x8eB93647490DF9989295461AB2AcdEDdCCA84781",
  [KOVAN_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  [MAINNET_ID]: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  [RINKEBY_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  [ROPSTEN_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
};

type SablierContractsMap = { [chainId in SablierChainId]: string };

const sablierContracts: SablierContractsMap = {
  [GOERLI_ID]: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  [KOVAN_ID]: "0x5eb34b5d5c75ce2119078e5b3f6a3f30e457e46b",
  [MAINNET_ID]: "0xCD18eAa163733Da39c232722cBC4E8940b1D8888",
  [RINKEBY_ID]: "0xC1f3af5DC05b0C51955804b2afc80eF8FeED67b9",
  [ROPSTEN_ID]: "0xcd79FFea8e2E6eFDAe92554Fdd1F154bB7c62D0f",
};

export const getPayrollContractAddress = (chainId: SablierChainId): string => {
  const contract: string = payrollContracts[chainId];
  if (contract === AddressZero) {
    throw Error(`Sablier not deployed on ${chainId}`);
  }
  return contract;
};

export const getSablierContractAddress = (chainId: SablierChainId): string => {
  const contract: string = sablierContracts[chainId];
  if (contract === AddressZero) {
    throw Error(`Sablier not deployed on ${chainId}`);
  }
  return contract;
};
