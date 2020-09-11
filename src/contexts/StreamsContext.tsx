import React, { useState, createContext, ReactElement, useContext, useEffect } from "react";

import { ProxyStream } from "../typings";
import { useSafeAddress, useSafeNetwork } from "./SafeContext";
import getProxyStreams from "../gql/proxyStreams";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  incomingProxyStreams: ProxyStream[];
  outgoingProxyStreams: ProxyStream[];
}

export const StreamsContext = createContext({} as State);

export function useStreamsContext(): State {
  return useContext(StreamsContext);
}

function StreamsProvider({ children }: Props) {
  const safeAddress = useSafeAddress();
  const network = useSafeNetwork();

  /** State Variables **/
  const [incomingProxyStreams, setIncomingProxyStreams] = useState<ProxyStream[]>([]);
  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);

  useEffect(() => {
    const loadStreams = async () => {
      if (!network || !safeAddress) {
        return;
      }

      const newIncomingProxyStreams = await getProxyStreams(network, safeAddress);
      setIncomingProxyStreams(newIncomingProxyStreams);

      const newOutgoingProxyStreams = await getProxyStreams(network, safeAddress);
      setOutgoingProxyStreams(newOutgoingProxyStreams);
    };

    loadStreams();
  }, [network, safeAddress]);

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
