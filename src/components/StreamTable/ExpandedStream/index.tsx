import React, { ReactElement } from "react";
import styled from "styled-components";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
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
  network,
  proxyStream,
}: {
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  network: Networks;
  proxyStream: ProxyStream;
}): ReactElement => (
  <ExpandedStreamContainer>
    <StreamInfo proxyStream={proxyStream} network={network} />
    <StreamActions proxyStream={proxyStream} cancelStream={cancelStream} />
  </ExpandedStreamContainer>
);

export default ExpandedStream;
