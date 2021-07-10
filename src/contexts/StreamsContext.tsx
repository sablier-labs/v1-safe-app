import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { getIncomingStreams, getOutgoingStreams } from "../graphql/streams";
import { Stream } from "../types";

type StreamsProviderProps = {
  children: JSX.Element | JSX.Element[];
};

type StreamsProviderState = {
  incomingStreams: Stream[];
  outgoingStreams: Stream[];
};

export const StreamsContext = createContext({} as StreamsProviderState);

export function useStreamsContext(): StreamsProviderState {
  return useContext(StreamsContext);
}

function StreamsProvider({ children }: StreamsProviderProps): JSX.Element {
  const { safe } = useSafeAppsSDK();

  /// STATE ///

  const [incomingStreams, setIncomingStreams] = useState<Stream[]>([]);
  const [outgoingStreams, setOutgoingStreams] = useState<Stream[]>([]);

  /// CALLBACKS ///

  const refreshStreams = useCallback(async (): Promise<void> => {
    if (!safe.chainId || !safe.safeAddress) {
      return;
    }

    const newIncomingStreams = await getIncomingStreams(safe.chainId, safe.safeAddress);
    setIncomingStreams(newIncomingStreams);

    const newOutgoingStreams = await getOutgoingStreams(safe.chainId, safe.safeAddress);
    setOutgoingStreams(newOutgoingStreams);
  }, [safe.chainId, safe.safeAddress]);

  /// SIDE EFFECTS ///

  useEffect(() => {
    void refreshStreams();
    const intervalId = setInterval(refreshStreams, 10 * 1000);
    return () => clearInterval(intervalId);
  }, [refreshStreams]);

  return <StreamsContext.Provider value={{ incomingStreams, outgoingStreams }}>{children}</StreamsContext.Provider>;
}

export const useIncomingStreams = (): Stream[] => {
  const { incomingStreams } = useStreamsContext();
  return incomingStreams;
};

export const useOutgoingStreams = (): Stream[] => {
  const { outgoingStreams } = useStreamsContext();
  return outgoingStreams;
};

export default StreamsProvider;
