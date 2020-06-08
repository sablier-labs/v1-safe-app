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

const paginatedStreamsQuery: DocumentNode = gql`
  query proxyStreams($first: Int!, $skip: Int!, $sender: String!) {
    proxyStreams(first: $first, skip: $skip, where: { sender: $sender }) {
      id
      sender
      recipient
      ${streamQuery}
    }
  }
`;

async function getPaginatedStreams(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: paginatedStreamsQuery,
    variables: {
      first,
      skip,
      sender: safeAddress,
    },
  });
}

export default async function getProxyStreams(network: Networks, safeAddress: string): Promise<ProxyStream[]> {
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
      const res: Response = await getPaginatedStreams(client, first, safeAddress, skip);
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
