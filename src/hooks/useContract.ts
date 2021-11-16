import { AddressZero } from "@ethersproject/constants";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import { JsonRpcProvider, Provider, getDefaultProvider } from "@ethersproject/providers";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useMemo } from "react";

import { BSC_MAINNET_ID, ETHEREUM_MAINNET_ID, POLYGON_MAINNET_ID, RINKEBY_ID } from "../constants/chains";
import { getEnvVar } from "../utils/env";

export default function useContract(abi: ContractInterface, address?: string): Contract {
  const { safe } = useSafeAppsSDK();

  const provider: Provider = useMemo(() => {
    const infuraKey: string = getEnvVar("REACT_APP_INFURA_KEY");
    switch (safe.chainId) {
      case BSC_MAINNET_ID:
        return new JsonRpcProvider("https://bsc-dataseed1.ninicoin.io", { chainId: safe.chainId, name: "bsc-mainnet" });
      case ETHEREUM_MAINNET_ID:
        return new JsonRpcProvider("https://mainnet.infura.io/v3/" + infuraKey, {
          chainId: safe.chainId,
          name: "ethereum",
        });
      case POLYGON_MAINNET_ID:
        return new JsonRpcProvider("https://polygon-mainnet.infura.io/v3/", {
          chainId: safe.chainId,
          name: "polygon-mainnet",
        });
      case RINKEBY_ID:
        return new JsonRpcProvider("https://rinkeby.infura.io/v3/" + infuraKey, {
          chainId: safe.chainId,
          name: "rinkeby",
        });
      default:
        return getDefaultProvider();
    }
  }, [safe.chainId]);

  return useMemo(() => {
    if (!address) {
      return new Contract(AddressZero, [], provider);
    }

    return new Contract(address, abi, provider);
  }, [abi, address, provider]);
}
