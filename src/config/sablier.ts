import { AddressZero } from "@ethersproject/constants";
import { LowercaseNetworks } from "@gnosis.pm/safe-apps-sdk";

export type SablierContractMap = {
  mainnet: string;
  morden: string;
  ropsten: string;
  rinkeby: string;
  goerli: string;
  kovan: string;
  unknown: string;
};

const sablierProxyContracts: SablierContractMap = {
  mainnet: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  rinkeby: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  morden: AddressZero,
  ropsten: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  goerli: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  kovan: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
  unknown: AddressZero,
};

export const getSablierAddress = (network: LowercaseNetworks): string => {
  const contract: string = sablierProxyContracts[network];
  if (contract === AddressZero) {
    throw Error(`No token configuration for ${network}`);
  }
  return contract;
};
