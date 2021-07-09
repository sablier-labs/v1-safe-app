import { BigNumberish } from "@ethersproject/bignumber";
import React from "react";
import styled from "styled-components";

import { ProxyStream } from "../../../types";
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
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  chainId: number;
  proxyStream: ProxyStream;
  withdrawStream: (amount: BigNumberish) => void;
};

const ExpandedStream = ({ chainId, cancelStream, proxyStream, withdrawStream }: ExpandedStreamProps): JSX.Element => (
  <ExpandedStreamContainer>
    <StreamInfo chainId={chainId} proxyStream={proxyStream} />
    <StreamActions cancelStream={cancelStream} proxyStream={proxyStream} withdrawStream={withdrawStream} />
  </ExpandedStreamContainer>
);

export default ExpandedStream;
