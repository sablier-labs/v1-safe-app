import ApolloClient, { gql } from "apollo-boost";
import { Networks } from "@gnosis.pm/safe-apps-sdk";

import { Stream } from "../typings";

type Response = {
  data: { streams: Stream[] };
};

const subgraphUri: { [key in Networks]: string } = {
  mainnet: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier",
  rinkeby: "https://api.thegraph.com/subgraphs/name/sablierhq/sablier-rinkeby",
};

async function getPaginatedStreams(
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  client: ApolloClient<any>,
  first: number,
  safeAddress: string,
  skip: number,
): Promise<Response> {
  return client.query({
    query: gql`
      query streams($first: Int!, $skip: Int!, $sender: String!) {
        streams(first: $first, skip: $skip, where: { sender: $sender, cancellation: null }) {
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
      }
    `,
    variables: {
      first,
      skip,
      sender: safeAddress,
    },
  });
}

export default async function getStreams(network: Networks, safeAddress: string): Promise<Stream[]> {
  const client = new ApolloClient({
    uri: subgraphUri[network],
  });

  let ended: boolean = false;
  const first: number = 1000;
  let skip: number = 0;
  let streams: Stream[] = [];

  while (!ended) {
    try {
      /* eslint-disable-next-line no-await-in-loop */
      const res: Response = await getPaginatedStreams(client, first, safeAddress, skip);
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
