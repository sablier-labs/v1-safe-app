import { AddressZero } from "@ethersproject/constants";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import { InfuraProvider } from "@ethersproject/providers";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useMemo } from "react";

import { getEnvVar } from "../utils/env";

export default function useContract(abi: ContractInterface, address?: string): Contract {
  const { safe } = useSafeAppsSDK();

  return useMemo(() => {
    const infuraKey: string = getEnvVar("REACT_APP_INFURA_KEY");
    const provider: InfuraProvider = new InfuraProvider(safe.chainId, infuraKey);

    if (!address) {
      return new Contract(AddressZero, [], provider);
    }

    return new Contract(address, abi, provider);
  }, [abi, address, safe.chainId]);
}
