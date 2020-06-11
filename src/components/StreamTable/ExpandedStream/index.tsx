import React, { ReactElement } from "react";
import { Text, Button } from "@gnosis.pm/safe-react-components";
import { makeStyles } from "@material-ui/core";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import moment from "moment";

import Row from "./Row";
import { StreamStatus, getStreamStatus } from "../Status";
import { ProxyStream } from "../../../typings";
import { BigNumberToRoundedHumanFormat } from "../../../utils";

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

const sablierStreamUrl = (proxyStreamId: number): string => `https://app.sablier.finance/stream/${proxyStreamId}`;

const userShare = (value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumberish => {
  if (BigNumber.from(ownedDuration).lte("0")) return "0";
  if (BigNumber.from(ownedDuration).gte(streamDuration)) return value;
  return BigNumber.from(value)
    .mul(ownedDuration)
    .div(streamDuration);
};

const recipientShare = (value: BigNumberish, startTime: BigNumberish, endTime: BigNumberish): BigNumberish => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const elapsedDuration = BigNumber.from(moment().format("X")).sub(startTime);
  return userShare(value, streamDuration, elapsedDuration);
};

const senderShare = (value: BigNumberish, startTime: BigNumberish, endTime: BigNumberish): BigNumberish => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const remainingDuration = BigNumber.from(endTime).sub(moment().format("X"));
  return userShare(value, streamDuration, remainingDuration);
};

const ExpandedStream = ({
  proxyStream,
  cancelStream,
}: {
  proxyStream: ProxyStream;
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}): ReactElement => {
  const classes = useStyles();
  const { recipient } = proxyStream;
  const { deposit, startTime, stopTime, token } = proxyStream.stream;
  return (
    <div className={classes.expandedTxBlock}>
      <Row>
        <div>
          <div className={classes.streamDataContainer}>
            <div className={classes.streamData}>
              <Text size="md">Recipient: {recipient} </Text>
              <Text size="md">
                Sender Balance:
                {`${BigNumberToRoundedHumanFormat(senderShare(deposit, startTime, stopTime), token.decimals, 3)} ${
                  token.symbol
                }`}
              </Text>
              <Text size="md">
                Recipient Balance:
                {`${BigNumberToRoundedHumanFormat(recipientShare(deposit, startTime, stopTime), token.decimals, 3)} ${
                  token.symbol
                }`}
              </Text>
            </div>
          </div>
        </div>
        <div className={classes.streamDataContainer}>
          <a
            href={sablierStreamUrl(proxyStream.id)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
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
      </Row>
    </div>
  );
};

export default ExpandedStream;
