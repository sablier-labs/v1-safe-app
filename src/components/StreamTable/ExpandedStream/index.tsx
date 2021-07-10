import styled from "styled-components";

import { Stream } from "../../../types";
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

const ExpandedStream = ({ chainId, stream }: ExpandedStreamProps): JSX.Element => (
  <ExpandedStreamContainer>
    <StreamInfo chainId={chainId} stream={stream} />
    <StreamActions stream={stream} />
  </ExpandedStreamContainer>
);

export default ExpandedStream;
