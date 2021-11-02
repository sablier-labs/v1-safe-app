import styled, { css } from "styled-components";

import ClockGreyIcon from "../../../assets/clock-grey.svg";
import ClockIcon from "../../../assets/clock.svg";
import ErrorIcon from "../../../assets/error.svg";
import OkIcon from "../../../assets/ok.svg";
import theme from "../../../theme";
import type { StreamStatus } from "../../../types";

const sm: string = "8px";
const lg: string = "24px";

const statusToIcon = {
  [StreamStatus.Streaming]: ClockIcon,
  [StreamStatus.Cancelled]: ErrorIcon,
  [StreamStatus.Ended]: OkIcon,
  [StreamStatus.Created]: ClockGreyIcon,
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
    status === StreamStatus.Streaming &&
    css`
      background-color: #a1d2ca;
      color: #008c73;
    `}

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Cancelled &&
    css`
      background-color: transparent;
      border: 1px solid ${theme.colors.error};
      color: ${theme.colors.error};
    `}

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Ended &&
    css`
      background-color: #d4d5d3;
      color: #5d6d6d74;
    `}

  ${({ status }: { status: StreamStatus }) =>
    status === StreamStatus.Created &&
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

function Status({ status }: { status: StreamStatus }): JSX.Element {
  const Icon = statusToIcon[status];
  const statusText: keyof typeof StreamStatus = StreamStatus[status] as keyof typeof StreamStatus;

  return (
    <StatusContainer status={status}>
      {typeof Icon === "object" ? Icon : <StatusIcon alt={statusText} src={Icon} />}
      <StatusText>{statusText}</StatusText>
    </StatusContainer>
  );
}

export default Status;
