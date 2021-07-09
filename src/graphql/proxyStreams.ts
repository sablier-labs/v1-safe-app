import ApolloClient, { DocumentNode, gql } from "apollo-boost";

import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "../constants";
import { ProxyStream, SablierChainId } from "../types";

type Response = {
  data: { proxyStreams: ProxyStream[] };
};

const subgraphUri: { [key in SablierChainId]: string } = {
  [GOERLI_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-goerli",
  [KOVAN_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-kovan",
  [MAINNET_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier",
  [RINKEBY_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-rinkeby",
  [ROPSTEN_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-ropsten",
};

const streamQuery: string = `
  stream {
    id
    cancellation {
      id
      txhash
      timestamp
    }
    deposit
    startTime
    stopTime
    recipient
    sender
    token {
      id
      decimals
      symbol
    }
    withdrawals {
      amount
    }
  }
`;

const paginatedOutgoingStreamsQuery: DocumentNode = gql`
  query proxyStreams($first: Int!, $skip: Int!, $sender: String!) {
    proxyStreams(first: $first, skip: $skip, where: { sender: $sender }) {
      id
      sender
      recipient
      ${streamQuery}
    }
  }
`;

const paginatedIncomingStreamsQuery: DocumentNode = gql`
  query proxyStreams($first: Int!, $skip: Int!, $recipient: String!) {
    proxyStreams(first: $first, skip: $skip, where: { recipient: $recipient }) {
      id
      sender
      recipient
      ${streamQuery}
    }
  }
`;

async function getPaginatedOutgoingStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: paginatedOutgoingStreamsQuery,
    variables: {
      first,
      skip,
      sender: safeAddress,
    },
  });
}

async function getPaginatedIncomingStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: paginatedIncomingStreamsQuery,
    variables: {
      first,
      skip,
      recipient: safeAddress,
    },
  });
}

async function getProxyStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (client: ApolloClient<any>, first: number, safeAddress: string, skip: number) => Promise<Response>,
  chainId: SablierChainId,
  safeAddress: string,
): Promise<ProxyStream[]> {
  const client = new ApolloClient({
    uri: subgraphUri[chainId],
  });

  let ended: boolean = false;
  const first: number = 1000;
  let skip: number = 0;
  let proxyStreams: ProxyStream[] = [];

  while (!ended) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res: Response = await query(client, first, safeAddress, skip);
      skip += first;

      proxyStreams = [...proxyStreams, ...res.data.proxyStreams];
      if (res.data.proxyStreams.length < first) {
        ended = true;
      }
    } catch (error) {
      ended = true;
      throw error;
    }
  }

  return proxyStreams;
}

export async function getOutgoingStreams(chainId: SablierChainId, safeAddress: string): Promise<ProxyStream[]> {
  return getProxyStreams(getPaginatedOutgoingStreams, chainId, safeAddress);
}

export async function getIncomingStreams(chainId: SablierChainId, safeAddress: string): Promise<ProxyStream[]> {
  return getProxyStreams(getPaginatedIncomingStreams, chainId, safeAddress);
}
