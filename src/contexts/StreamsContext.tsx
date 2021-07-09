import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { getIncomingStreams, getOutgoingStreams } from "../graphql/proxyStreams";
import { ProxyStream } from "../types";

type StreamsProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type StreamsProviderState = {
  incomingProxyStreams: ProxyStream[];
  outgoingProxyStreams: ProxyStream[];
};

export const StreamsContext = createContext({} as StreamsProviderState);

export function useStreamsContext(): StreamsProviderState {
  return useContext(StreamsContext);
}

function StreamsProvider({ children }: StreamsProviderProps): JSX.Element {
  const { safe } = useSafeAppsSDK();

  /// STATE ///

  const [incomingProxyStreams, setIncomingProxyStreams] = useState<ProxyStream[]>([]);
  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);

  /// CALLBACKS ///

  const refreshStreams = useCallback(async (): Promise<void> => {
    if (!safe.chainId || !safe.safeAddress) {
      return;
    }

    const newIncomingProxyStreams = await getIncomingStreams(safe.chainId, safe.safeAddress);
    setIncomingProxyStreams(newIncomingProxyStreams);

    const newOutgoingProxyStreams = await getOutgoingStreams(safe.chainId, safe.safeAddress);
    setOutgoingProxyStreams(newOutgoingProxyStreams);
  }, [safe.chainId, safe.safeAddress]);

  /// SIDE EFFECTS ///

  useEffect(() => {
    void refreshStreams();
    const intervalId = setInterval(refreshStreams, 10 * 1000);
    return () => clearInterval(intervalId);
  }, [refreshStreams]);

  return (
    <StreamsContext.Provider value={{ incomingProxyStreams, outgoingProxyStreams }}>{children}</StreamsContext.Provider>
  );
}

export const useIncomingStreams = (): ProxyStream[] => {
  const { incomingProxyStreams } = useStreamsContext();
  return incomingProxyStreams;
};

export const useOutgoingStreams = (): ProxyStream[] => {
  const { outgoingProxyStreams } = useStreamsContext();
  return outgoingProxyStreams;
};

export default StreamsProvider;
