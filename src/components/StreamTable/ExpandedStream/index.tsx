import styled from "styled-components";

import type { Stream } from "../../../types";
import StreamActions from "./StreamActions";
import StreamInfo from "./StreamInfo";

const border = "#e8e7e6";

const ExpandedStreamContainer = styled.div`
  border-bottom: 2px solid ${border};
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

type ExpandedStreamProps = {
  chainId: number;
  stream: Stream;
};

function ExpandedStream({ chainId, stream }: ExpandedStreamProps): JSX.Element {
  return (
    <ExpandedStreamContainer>
      <StreamInfo chainId={chainId} stream={stream} />
      <StreamActions stream={stream} />
    </ExpandedStreamContainer>
  );
}

export default ExpandedStream;
