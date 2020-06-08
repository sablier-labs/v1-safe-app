import React, { ReactElement } from "react";
import { withStyles } from "@material-ui/core/styles";

import ClockIcon from "../../../assets/clock.svg";
import ErrorIcon from "../../../assets/error.svg";
import OkIcon from "../../../assets/ok.svg";
import theme from "../../../theme";

const sm: string = "8px";
const lg: string = "24px";

const styles = () => ({
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
});

export enum StreamStatus {
  Active = 0,
  Ended,
  Cancelled,
}

const statusToIcon = {
  [StreamStatus.Active]: ClockIcon,
  [StreamStatus.Ended]: OkIcon,
  [StreamStatus.Cancelled]: ErrorIcon,
};

const statusIconStyle = {
  height: "14px",
  width: "14px",
};

function Status({ classes, status }: { classes: any; status: StreamStatus }): ReactElement {
  const Icon = statusToIcon[status];
  const statusText = StreamStatus[status];

  return (
    <div className={`${classes.container} ${classes[statusText]}`}>
      {typeof Icon === "object" ? Icon : <img alt={statusText} src={Icon} style={statusIconStyle} />}
      <p className={classes.statusText}>{statusText}</p>
    </div>
  );
}

export default withStyles(styles as any)(Status);
