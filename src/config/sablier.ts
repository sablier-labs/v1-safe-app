import { AddressZero } from "@ethersproject/constants";

import { BSC_MAINNET_ID, ETHEREUM_MAINNET_ID, POLYGON_MAINNET_ID, RINKEBY_ID } from "../constants/chains";
import type { SablierChainId } from "../types";

type PayrollContractsMap = { [chainId in SablierChainId]: string };

const PAYROLL_CONTRACTS: PayrollContractsMap = {
  [ETHEREUM_MAINNET_ID]: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  [RINKEBY_ID]: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
};

type SablierContractsMap = { [chainId in SablierChainId]: string };

// This is the v1.1 release of the "Sablier.sol" contract.
const SABLIER_CONTRACTS: SablierContractsMap = {
  [BSC_MAINNET_ID]: "0x05BC7f5fb7F248d44d38703e5C921A8c16825161",
  [ETHEREUM_MAINNET_ID]: "0xCD18eAa163733Da39c232722cBC4E8940b1D8888",
  [POLYGON_MAINNET_ID]: "0xAC18EAB6592F5fF6F9aCf5E0DCE0Df8E49124C06",
  [RINKEBY_ID]: "0xC1f3af5DC05b0C51955804b2afc80eF8FeED67b9",
};

export function getPayrollContractAddress(chainId: SablierChainId): string {
  const payroll: string = PAYROLL_CONTRACTS[chainId];
  if (payroll === AddressZero) {
    throw Error(`Payroll.sol not deployed to chain with id ${chainId}`);
  }
  return payroll;
}

export function getSablierContractAddress(chainId: SablierChainId): string {
  const sablier: string = SABLIER_CONTRACTS[chainId];
  if (sablier === AddressZero) {
    throw Error(`Sablier.sol not deployed to chain with id ${chainId}`);
  }
  return sablier;
}
