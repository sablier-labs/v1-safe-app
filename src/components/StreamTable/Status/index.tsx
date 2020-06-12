import React, { ReactElement } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

import ClockIcon from "../../../assets/clock.svg";
import ErrorIcon from "../../../assets/error.svg";
import OkIcon from "../../../assets/ok.svg";
import theme from "../../../theme";
import { ProxyStream } from "../../../typings";

const sm: string = "8px";
const lg: string = "24px";

const useStyles = makeStyles(() => ({
  container: {
    alignItems: "center",
    borderRadius: "3px",
    boxSizing: "border-box",
    display: "flex",
    fontSize: "11px",
    fontWeight: 700,
    justifyContent: "center",
    height: lg,
    marginBottom: sm,
    marginTop: sm,
    padding: sm,
  },
  Active: {
    backgroundColor: "#A1D2CA",
    color: "#008C73",
  },
  Ended: {
    backgroundColor: "#d4d5d3",
    color: "#5D6D74",
  },
  Cancelled: {
    backgroundColor: "transparent",
    color: theme.colors.error,
    border: `1px solid ${theme.colors.error}`,
  },
  statusText: {
    padding: "0px 7px",
  },
  statusIcon: {
    height: "14px",
    width: "14px",
  },
}));

export enum StreamStatus {
  Active = 0,
  Ended,
  Cancelled,
}
type streamStatusKey = keyof typeof StreamStatus;

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
  if (moment().isAfter(moment.unix(stopTime))) {
    return StreamStatus.Ended;
  }
  return StreamStatus.Active;
};

function Status({ status }: { status: StreamStatus }): ReactElement {
  const classes = useStyles();
  const Icon = statusToIcon[status];
  const statusText: streamStatusKey = StreamStatus[status] as streamStatusKey;

  return (
    <div className={`${classes.container} ${classes[statusText]}`}>
      {typeof Icon === "object" ? Icon : <img alt={statusText} src={Icon} className={classes.statusIcon} />}
      <p className={classes.statusText}>{statusText}</p>
    </div>
  );
}

export default Status;
