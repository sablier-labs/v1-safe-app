import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { ProxyStream } from "../../../typings";
import StreamInfo from "./StreamInfo";
import StreamActions from "./StreamActions";

const border = "#e8e7e6";

const useStyles = makeStyles(() => ({
  expandedStreamBlock: {
    borderBottom: `2px solid ${border}`,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

const ExpandedStream = ({
  proxyStream,
  cancelStream,
  network,
}: {
  proxyStream: ProxyStream;
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  network: Networks;
}): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.expandedStreamBlock}>
      <StreamInfo proxyStream={proxyStream} network={network} />
      <StreamActions proxyStream={proxyStream} cancelStream={cancelStream} />
    </div>
  );
};

export default ExpandedStream;
