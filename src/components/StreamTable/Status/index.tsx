import { isFuture, isPast } from "date-fns";
import styled, { css } from "styled-components";

import ClockGreyIcon from "../../../assets/clock-grey.svg";
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
  Pending,
}

type StreamStatusKey = keyof typeof StreamStatus;

const statusToIcon = {
  [StreamStatus.Pending]: ClockGreyIcon,
  [StreamStatus.Active]: ClockIcon,
  [StreamStatus.Ended]: OkIcon,
  [StreamStatus.Cancelled]: ErrorIcon,
};

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

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Pending &&
    css`
      background-color: #d4d5d3;
      color: #5d6d6d74;
    `}
`;

const StatusIcon = styled.img`
  height: 14px;
  width: 14px;
`;

const StatusText = styled.p`
  padding: 0px 7px;
`;

export const getStreamStatus = (proxyStream: ProxyStream): StreamStatus => {
  const { cancellation, startTime, stopTime } = proxyStream.stream;
  if (cancellation !== null) {
    return StreamStatus.Cancelled;
  }
  if (isFuture(new Date(startTime * 1000))) {
    return StreamStatus.Pending;
  }
  if (isPast(new Date(stopTime * 1000))) {
    return StreamStatus.Ended;
  }
  return StreamStatus.Active;
};

function Status({ status }: { status: StreamStatus }): JSX.Element {
  const Icon = statusToIcon[status];
  const statusText: StreamStatusKey = StreamStatus[status] as StreamStatusKey;

  return (
    <StatusContainer status={status}>
      {typeof Icon === "object" ? Icon : <StatusIcon alt={statusText} src={Icon} />}
      <StatusText>{statusText}</StatusText>
    </StatusContainer>
  );
}

export default Status;
