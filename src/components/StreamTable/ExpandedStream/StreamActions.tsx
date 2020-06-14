import React, { ReactElement, useMemo } from "react";
import { Button } from "@gnosis.pm/safe-react-components";
import { makeStyles } from "@material-ui/core";

import CopyToClipboard from "react-copy-to-clipboard";
import { StreamStatus, getStreamStatus } from "../Status";
import { ProxyStream } from "../../../typings";

const lg = "24px";
const md = "16px";

const useStyles = makeStyles(() => ({
  actionsContainer: {
    padding: `${lg} ${md}`,
    display: "flex",
    // flex: "0 1 auto",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "space-around",
    alignContent: "space-around",
  },
}));

const StreamActions = ({
  proxyStream,
  cancelStream,
}: {
  proxyStream: ProxyStream;
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): ReactElement => {
  const classes = useStyles();

  const sablierStreamUrl = useMemo(() => `https://app.sablier.finance/stream/${proxyStream.id}`, [proxyStream]);

  return (
    <div className={classes.actionsContainer}>
      <CopyToClipboard text={sablierStreamUrl}>
        <Button size="md" color="primary" variant="contained">
          Copy Stream Link
        </Button>
      </CopyToClipboard>
      <a href={sablierStreamUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <Button size="md" color="primary" variant="contained">
          View Stream
        </Button>
      </a>
      <Button
        size="md"
        color="primary"
        variant="contained"
        disabled={getStreamStatus(proxyStream) !== StreamStatus.Active}
        onClick={cancelStream}
      >
        Cancel
      </Button>
    </div>
  );
};

export default StreamActions;
