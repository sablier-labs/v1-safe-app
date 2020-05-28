import ApolloClient, { gql } from "apollo-boost";

import { Networks } from "@gnosis.pm/safe-apps-sdk";

const subgraphUri: { [key in Networks]: string } = {
  rinkeby: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-rinkeby",
  mainnet: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier",
};

async function getPaginatedStreams(client: any, first: number, skip: number, safeAddress: string) {
  return client.query({
    query: gql`
      query streams($first: Int!, $skip: Int!, $sender: String!) {
        streams(first: $first, skip: $skip, where: { sender: $sender, cancellation: null }) {
          id
          startTime
          stopTime
          recipient
          sender
          token {
            id
          }
        }
      }
    `,
    variables: {
      first,
      skip,
      sender: safeAddress,
    },
  });
}

export default async function getStreams(network: Networks, safeAddress: string) {
  const client = new ApolloClient({
    uri: subgraphUri[network],
  });

  let ended = false;
  const first = 1000;
  let skip = 0;
  let streams: any = [];

  while (!ended) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const res: any = await getPaginatedStreams(client, first, skip, safeAddress);
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
