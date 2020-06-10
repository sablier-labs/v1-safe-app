import React, { ReactElement } from "react";
import { Text, Button } from "@gnosis.pm/safe-react-components";
import { makeStyles } from "@material-ui/core";
import Row from "./Row";
import { TableRowData } from "../types";
import { StreamStatus } from "../Status";

// import EtherScanLink from "src/components/EtherscanLink";

const border = "#e8e7e6";
const connected = "#008C73";
const error = "#f02525";
const lg = "24px";
const md = "16px";

const useStyles = makeStyles(() => ({
  expandedTxBlock: {
    borderBottom: `2px solid ${border}`,
  },
  streamDataContainer: {
    padding: `${lg} ${md}`,
  },
  streamData: {
    alignItems: "center",
    display: "flex",
    lineHeight: "1.6",
  },
  success: {
    color: connected,
  },
  cancelled: {
    color: error,
  },
  txHash: {
    paddingRight: "3px",
  },
  incomingTxBlock: {
    bderRight: "2px solid rgb(232, 231, 230)",
  },
  emptyRowDataContainer: {
    paddingTop: lg,
    paddingLeft: md,
    paddingBottom: md,
    borderRight: "2px solid rgb(232, 231, 230)",
  },
}));

const ExpandedStream = ({
  stream,
  cancelStream,
}: {
  stream: TableRowData;
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.expandedTxBlock}>
      <Row>
        <div>
          <div className={classes.streamDataContainer}>
            <div className={classes.streamData}>
              <Text size="md">Hash:</Text>
              {/* {stream.executionTxHash ? <EtherScanLink cut={8} type="tx" value={tx.executionTxHash} /> : "n/a"} */}
            </div>
          </div>
          {/* <Hairline /> */}
        </div>

        {stream.status === StreamStatus.Active && (
          <div className={classes.streamDataContainer}>
            <Button size="md" color="primary" variant="contained" onClick={cancelStream}>
              Cancel
            </Button>
          </div>
        )}
      </Row>
    </div>
  );
};

export default ExpandedStream;
