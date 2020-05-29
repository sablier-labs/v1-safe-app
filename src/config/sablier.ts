import { Networks } from "@gnosis.pm/safe-apps-sdk";

const sablierContracts = {
  rinkeby: "0xc04Ad234E01327b24a831e3718DBFcbE245904CC",
  mainnet: "0xA4fc358455Febe425536fd1878bE67FfDBDEC59a",
};

const getSablierAddress = (network: Networks): string => {
  const contract = sablierContracts[network];
  if (!contract) {
    throw Error(`No token configuration for ${network}`);
  }
  return contract;
};

export default getSablierAddress;
