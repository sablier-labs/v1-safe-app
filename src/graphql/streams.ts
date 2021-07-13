import ApolloClient, { DocumentNode, gql } from "apollo-boost";

import { GOERLI_ID, KOVAN_ID, MAINNET_ID, RINKEBY_ID, ROPSTEN_ID } from "../constants/chains";
import { SablierChainId, Stream } from "../types";

type Response = {
  data: { streams: Stream[] };
};

const subgraphUri: { [key in SablierChainId]: string } = {
  [GOERLI_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-goerli",
  [KOVAN_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-kovan",
  [MAINNET_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier",
  [RINKEBY_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-rinkeby",
  [ROPSTEN_ID]: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-ropsten",
};

const STREAM_QUERY: string = `
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
  timestamp
  token {
    id
    decimals
    symbol
  }
  withdrawals {
    amount
  }
`;

const GET_PAGINATED_INCOMING_STREAMS: DocumentNode = gql`
  query streams($first: Int!, $skip: Int!, $recipient: String!) {
    streams(first: $first, orderBy: timestamp, orderDirection: desc, skip: $skip, where: { recipient: $recipient }) {
      ${STREAM_QUERY}
    }
  }
`;

const GET_PAGINATED_OUTGOING_STREAMS: DocumentNode = gql`
  query streams($first: Int!, $skip: Int!, $sender: String!) {
    streams(first: $first, orderBy: timestamp, orderDirection: desc, skip: $skip, where: { sender: $sender }) {
      ${STREAM_QUERY}
    }
  }
`;

async function getPaginatedIncomingStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: GET_PAGINATED_INCOMING_STREAMS,
    variables: {
      first,
      skip,
      recipient: safeAddress,
    },
  });
}

async function getPaginatedOutgoingStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: GET_PAGINATED_OUTGOING_STREAMS,
    variables: {
      first,
      skip,
      sender: safeAddress,
    },
  });
}

async function getStreams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: (client: ApolloClient<any>, first: number, safeAddress: string, skip: number) => Promise<Response>,
  chainId: SablierChainId,
  safeAddress: string,
): Promise<Stream[]> {
  const client = new ApolloClient({
    uri: subgraphUri[chainId],
  });

  let ended: boolean = false;
  const first: number = 1000;
  let skip: number = 0;
  let streams: Stream[] = [];

  while (!ended) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res: Response = await query(client, first, safeAddress, skip);
      skip += first;

      streams = [...streams, ...res.data.streams];
      if (res.data.streams.length < first) {
        ended = true;
      }
    } catch (error) {
      ended = true;
      throw error;
    }
  }

  return streams;
}

export async function getIncomingStreams(chainId: SablierChainId, safeAddress: string): Promise<Stream[]> {
  return getStreams(getPaginatedIncomingStreams, chainId, safeAddress);
}

export async function getOutgoingStreams(chainId: SablierChainId, safeAddress: string): Promise<Stream[]> {
  return getStreams(getPaginatedOutgoingStreams, chainId, safeAddress);
}
