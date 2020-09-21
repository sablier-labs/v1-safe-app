import React, { useState, createContext, ReactElement, useContext, useEffect, useCallback } from "react";

import initSdk, { SdkInstance, SafeInfo, RequestId, SentSDKMessage, Transaction } from "@gnosis.pm/safe-apps-sdk";
import { Web3Provider } from "@ethersproject/providers";
import { SablierNetworks, sablierNetworks } from "../types";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  safeInfo?: SafeInfo;
  appsSdk: SdkInstance;
}

export const SafeContext = createContext({} as State);

export function useSafeContext(): State {
  return useContext(SafeContext);
}

const gnosisSDK = initSdk();

function SafeProvider({ children }: Props) {
  /** State Variables **/
  const [safeInfo, setSafeInfo] = useState<SafeInfo>();
  const appsSdk = gnosisSDK;

  /* For development purposes with local provider */
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && process.env.REACT_APP_LOCAL_WEB3_PROVIDER === "true") {
      console.warn("SABLIER APP: you are using a local web3 provider");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ethereum } = window as any;
      ethereum.enable();
      const provider = new Web3Provider(ethereum);
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

  const onSafeInfo = useCallback(
    ({ safeAddress, network, ethBalance }: SafeInfo) => {
      if (!sablierNetworks.includes(network.toLowerCase() as SablierNetworks)) {
        throw Error("Sablier doesn't support this network");
      }
      setSafeInfo({
        safeAddress,
        network: network.toLowerCase() as SablierNetworks,
        ethBalance,
      });
    },
    [setSafeInfo],
  );

  /* Config Safe connector */
  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo,
    });

    return () => appsSdk.removeListeners();
  }, [appsSdk, onSafeInfo]);

  return <SafeContext.Provider value={{ safeInfo, appsSdk }}>{children}</SafeContext.Provider>;
}

export const useSafeInfo = (): SafeInfo | undefined => {
  const { safeInfo } = useSafeContext();
  return safeInfo;
};

export const useSafeAddress = (): string | undefined => {
  const { safeAddress } = useSafeInfo() || {};
  return safeAddress;
};

export const useSafeNetwork = (): SablierNetworks | undefined => {
  const { network } = useSafeInfo() || {};
  return network as SablierNetworks;
};

export const useSafeEthBalance = (): string | undefined => {
  const { ethBalance } = useSafeInfo() || {};
  return ethBalance;
};

export const useAppsSdk = (): SdkInstance => {
  const { appsSdk } = useSafeContext();
  return appsSdk;
};

export const useSendTransactions = (): ((
  txs: Transaction[],
  requestId?: RequestId,
) => SentSDKMessage<"SEND_TRANSACTIONS">) => {
  const { sendTransactions } = useAppsSdk();
  return sendTransactions;
};

export default SafeProvider;
