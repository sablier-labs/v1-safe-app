import { Networks } from "@gnosis.pm/safe-apps-sdk";

export type SablierContractMap = {
  mainnet: string;
  rinkeby: string;
};

const sablierProxyContracts: SablierContractMap = {
  mainnet: "0xbd6a40Bb904aEa5a49c59050B5395f7484A4203d",
  rinkeby: "0x7ee114C3628Ca90119fC699f03665bF9dB8f5faF",
};

export const getSablierAddress = (network: Networks): string => {
  const contract: string = sablierProxyContracts[network];
  if (!contract) {
    throw Error(`No token configuration for ${network}`);
  }
  return contract;
};
