import React, { ReactElement } from "react";
import styled from "styled-components";

import { Networks } from "@gnosis.pm/safe-apps-sdk";

import { BigNumberish } from "@ethersproject/bignumber";
import { ProxyStream } from "../../../types";
import StreamInfo from "./StreamInfo";
import StreamActions from "./StreamActions";

const border = "#e8e7e6";

const ExpandedStreamContainer = styled.div`
  border-bottom: 2px solid ${border};
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ExpandedStream = ({
  cancelStream,
  withdrawStream,
  network,
  proxyStream,
}: {
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  withdrawStream: (amount: BigNumberish) => void;
  network: Networks;
  proxyStream: ProxyStream;
}): ReactElement => (
  <ExpandedStreamContainer>
    <StreamInfo proxyStream={proxyStream} network={network} />
    <StreamActions proxyStream={proxyStream} cancelStream={cancelStream} withdrawStream={withdrawStream} />
  </ExpandedStreamContainer>
);

export default ExpandedStream;
