import { AddressZero } from "@ethersproject/constants";
import type { Contract } from "@ethersproject/contracts";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { useMemo } from "react";

import SABLIER_ABI from "../abis/sablier";
import { getSablierContractAddress } from "../config/sablier";
import useContract from "./useContract";

export default function useSablierContract(): Contract {
  const { safe } = useSafeAppsSDK();

  const sablierAddress = useMemo(() => {
    if (!safe.chainId) {
      return AddressZero;
    }
    return getSablierContractAddress(safe.chainId);
  }, [safe.chainId]);

  return useContract(SABLIER_ABI, sablierAddress);
}
