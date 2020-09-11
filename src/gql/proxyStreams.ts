import ApolloClient, { DocumentNode, gql } from "apollo-boost";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import { ProxyStream } from "../typings";

type Response = {
  data: { proxyStreams: ProxyStream[] };
};

const subgraphUri: { [key in Networks]: string } = {
  mainnet: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier",
  rinkeby: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-rinkeby",
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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  query: (client: ApolloClient<any>, first: number, safeAddress: string, skip: number) => Promise<Response>,
  network: Networks,
  safeAddress: string,
): Promise<ProxyStream[]> {
  const client = new ApolloClient({
    uri: subgraphUri[network],
  });

  let ended: boolean = false;
  const first: number = 1000;
  let skip: number = 0;
  let proxyStreams: ProxyStream[] = [];

  while (!ended) {
    try {
      /* eslint-disable-next-line no-await-in-loop */
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

export const getOutgoingStreams = (network: Networks, safeAddress: string) =>
  getProxyStreams(getPaginatedOutgoingStreams, network, safeAddress);
export const getIncomingStreams = (network: Networks, safeAddress: string) =>
  getProxyStreams(getPaginatedIncomingStreams, network, safeAddress);
