import React, { ReactElement, useMemo } from "react";
import { Text, Button } from "@gnosis.pm/safe-react-components";
import { makeStyles } from "@material-ui/core";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import moment from "moment";

import { getAddress } from "@ethersproject/address";
import { Networks } from "@gnosis.pm/safe-apps-sdk";
import { StreamStatus, getStreamStatus } from "../Status";
import { ProxyStream } from "../../../typings";
import { BigNumberToRoundedHumanFormat } from "../../../utils";
import useRefreshwithPeriod from "../../../hooks/useRefreshWithPeriod";
import EtherscanLink from "../../EtherscanLink";

const border = "#e8e7e6";
const lg = "24px";
const md = "16px";

const useStyles = makeStyles(() => ({
  expandedStreamBlock: {
    borderBottom: `2px solid ${border}`,
    display: "flex",
    flex: "0 1 auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  streamDataContainer: {
    padding: `${lg} ${md}`,
  },
  emptyRowDataContainer: {
    paddingTop: lg,
    paddingLeft: md,
    paddingBottom: md,
    borderRight: "2px solid rgb(232, 231, 230)",
  },
}));

const sablierStreamUrl = (proxyStreamId: number): string => `https://app.sablier.finance/stream/${proxyStreamId}`;

const userShare = (value: BigNumberish, streamDuration: BigNumberish, ownedDuration: BigNumberish): BigNumber => {
  if (BigNumber.from(ownedDuration).lte("0")) return BigNumber.from("0");
  if (BigNumber.from(ownedDuration).gte(streamDuration)) return BigNumber.from(value);
  return BigNumber.from(value)
    .mul(ownedDuration)
    .div(streamDuration);
};

const recipientShare = (value: BigNumberish, startTime: BigNumberish, endTime: BigNumberish): BigNumber => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const elapsedDuration = BigNumber.from(moment().format("X")).sub(startTime);
  return userShare(value, streamDuration, elapsedDuration);
};

const senderShare = (value: BigNumberish, startTime: BigNumberish, endTime: BigNumberish): BigNumber => {
  const streamDuration = BigNumber.from(endTime).sub(startTime);
  const remainingDuration = BigNumber.from(endTime).sub(moment().format("X"));
  return userShare(value, streamDuration, remainingDuration);
};

const percentageProgress = (startTime: BigNumberish, endTime: BigNumberish) =>
  recipientShare(10000, startTime, endTime).toNumber() / 100;

const ExpandedStream = ({
  proxyStream,
  cancelStream,
  network,
}: {
  proxyStream: ProxyStream;
  cancelStream: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  network: Networks;
}): ReactElement => {
  useRefreshwithPeriod(1000);
  const classes = useStyles();
  const { recipient } = proxyStream;
  const { deposit, startTime, stopTime, token } = proxyStream.stream;

  const recipientAddress = useMemo(() => getAddress(recipient), [recipient]);

  /* These variables are purposefully not memoised as they depend on the current time */

  const senderBalance = BigNumberToRoundedHumanFormat(senderShare(deposit, startTime, stopTime), token.decimals, 3);

  const recipientBalance = BigNumberToRoundedHumanFormat(
    recipientShare(deposit, startTime, stopTime),
    token.decimals,
    3,
  );

  return (
    <div className={classes.expandedStreamBlock}>
      <div className={classes.streamDataContainer}>
        <p>
          <Text size="md">
            Recipient: <EtherscanLink network={network} type="address" value={recipientAddress} />
          </Text>
        </p>
        <p>
          <Text size="md">{`Stream Progress: ${
            moment().isAfter(moment.unix(startTime))
              ? `${percentageProgress(startTime, stopTime)}%`
              : `Starts ${moment.unix(startTime).fromNow()}`
          }`}</Text>
        </p>
        <p>
          <Text size="md">{`Sender Balance: ${senderBalance} ${token.symbol}`}</Text>
        </p>
        <p>
          <Text size="md">{`Recipient Balance: ${recipientBalance} ${token.symbol}`}</Text>
        </p>
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
    </div>
  );
};

export default ExpandedStream;
