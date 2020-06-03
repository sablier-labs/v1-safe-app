import { useEffect, useMemo, useState } from "react";
import initSdk, { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import provider from "../config/provider";

export function useAppsSdk(): [SdkInstance, SafeInfo | undefined] {
  const [safeInfo, setSafeInfo] = useState<SafeInfo>();

  const safeMultisigUrls: RegExp[] = useMemo(() => {
    const urls: RegExp[] = [];
    urls.push(/http:\/\/localhost:3000/);
    return urls;
  }, []);
  const [appsSdk] = useState<SdkInstance>(initSdk(safeMultisigUrls));

  /* For development purposes with local provider */
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && process.env.REACT_APP_LOCAL_WEB3_PROVIDER) {
      console.warn("SABLIER APP: you are using a local web3 provider");
      provider
        .getSigner()
        .getAddress()
        .then((address: string) => {
          setSafeInfo({
            safeAddress: address,
            network: "rinkeby",
            ethBalance: "0.99",
          });
        });
    }
  }, [setSafeInfo]);

  /* Config Safe connector */
  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: setSafeInfo,
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk]);

  return [appsSdk, safeInfo];
}
