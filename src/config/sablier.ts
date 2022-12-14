import { AddressZero } from "@ethersproject/constants";

import {
  ARBITRUM_MAINNET_ID,
  AVALANCHE_MAINNET_ID,
  BSC_MAINNET_ID,
  ETHEREUM_MAINNET_ID,
  GOERLI_ID,
  OPTIMISM_MAINNET_ID,
  POLYGON_MAINNET_ID,
} from "../constants/chains";
import type { SablierChainId } from "../types";

type PayrollContractsMap = { [chainId in SablierChainId]: string };

const PAYROLL_CONTRACTS: PayrollContractsMap = {
  [ETHEREUM_MAINNET_ID]: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
};

type SablierContractsMap = { [chainId in SablierChainId]: string };

// This is the v1.1 release of the "Sablier.sol" contract.
const SABLIER_CONTRACTS: SablierContractsMap = {
  [ARBITRUM_MAINNET_ID]: "0xaDB944B478818d95659067E70D2e5Fc43Fa3eDe9",
  [AVALANCHE_MAINNET_ID]: "0x73f503fad13203C87889c3D5c567550b2d41D7a4",
  [BSC_MAINNET_ID]: "0x05BC7f5fb7F248d44d38703e5C921A8c16825161",
  [ETHEREUM_MAINNET_ID]: "0xCD18eAa163733Da39c232722cBC4E8940b1D8888",
  [OPTIMISM_MAINNET_ID]: "0x6C5927c0679e6d857E87367bb635decbcB20F31c",
  [POLYGON_MAINNET_ID]: "0xAC18EAB6592F5fF6F9aCf5E0DCE0Df8E49124C06",
  [GOERLI_ID]: "0xFc7E3a3073F88B0f249151192812209117C2014b",
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
