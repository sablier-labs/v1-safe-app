import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

import { isPast } from "date-fns";
import ClockIcon from "../../../assets/clock.svg";
import ErrorIcon from "../../../assets/error.svg";
import OkIcon from "../../../assets/ok.svg";
import theme from "../../../theme";
import { ProxyStream } from "../../../types";

const sm: string = "8px";
const lg: string = "24px";

export enum StreamStatus {
  Active = 0,
  Ended,
  Cancelled,
}
type streamStatusKey = keyof typeof StreamStatus;

const StatusContainer = styled.div`
  align-items: center;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-flex;
  font-size: 11px;
  font-weight: 700;
  height: ${lg};
  justify-content: center;
  margin-bottom: ${sm};
  margin-top: ${sm};
  padding: ${sm};

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Active &&
    css`
      background-color: #a1d2ca;
      color: #008c73;
    `}

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Ended &&
    css`
      background-color: #d4d5d3;
      color: #5d6d6d74;
    `}

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Cancelled &&
    css`
      background-color: transparent;
      color: ${theme.colors.error};
      border: 1px solid ${theme.colors.error};
    `}
`;

const StatusIcon = styled.img`
  height: 14px;
  width: 14px;
`;

const StatusText = styled.p`
  padding: 0px 7px;
`;

const statusToIcon = {
  [StreamStatus.Active]: ClockIcon,
  [StreamStatus.Ended]: OkIcon,
  [StreamStatus.Cancelled]: ErrorIcon,
};

export const getStreamStatus = (proxyStream: ProxyStream): StreamStatus => {
  const { cancellation, stopTime } = proxyStream.stream;
  if (cancellation !== null) {
    return StreamStatus.Cancelled;
  }
  if (isPast(new Date(stopTime * 1000))) {
    return StreamStatus.Ended;
  }
  return StreamStatus.Active;
};

function Status({ status }: { status: StreamStatus }): ReactElement {
  const Icon = statusToIcon[status];
  const statusText: streamStatusKey = StreamStatus[status] as streamStatusKey;

  return (
    <StatusContainer status={status}>
      {typeof Icon === "object" ? Icon : <StatusIcon alt={statusText} src={Icon} />}
      <StatusText>{statusText}</StatusText>
    </StatusContainer>
  );
}

export default Status;
