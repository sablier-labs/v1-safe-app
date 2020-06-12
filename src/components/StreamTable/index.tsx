import React, { ReactElement, useMemo, useCallback, useState } from "react";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import moment from "moment";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { IconButton, Collapse, makeStyles } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { BigNumberish } from "@ethersproject/bignumber";
import { getAddress } from "@ethersproject/address";
import Table from "./Table";
import Status, { StreamStatus, getStreamStatus } from "./Status";
import cancelStreamTxs from "../../utils/transactions/cancelStream";

import { ProxyStream } from "../../typings";
import { BigNumberToRoundedHumanFormat } from "../../utils/format";
import { cellWidth } from "./Table/TableHead";
import { STREAM_TABLE_ID, Column, generateColumns } from "./columns";
import { shortenAddress } from "../../utils/address";
import { TIME_FORMAT, DATE_FORMAT } from "../../utils";
import ExpandedStream from "./ExpandedStream";
import { HumanReadableStream } from "./types";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "56px",
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff3e2",
    },
  },
  expandedRow: {
    backgroundColor: "#fff3e2",
  },
  cancelledRow: {
    opacity: 0.4,
  },
  extendedTxContainer: {
    padding: 0,
    border: 0,
    "&:last-child": {
      padding: 0,
    },
    backgroundColor: "#fffaf4",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  expandCellStyle: {
    paddingLeft: 0,
    paddingRight: 15,
  },
}));

const humanReadableStream = (proxyStream: ProxyStream): HumanReadableStream => {
  const { id, recipient, sender } = proxyStream;
  const { deposit, startTime, stopTime, token } = proxyStream.stream;
  const humanRecipient: string = shortenAddress(getAddress(recipient));
  const humanSender: string = shortenAddress(getAddress(sender));
  const humanStartTime: BigNumberish = moment.unix(startTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStopTime: BigNumberish = moment.unix(stopTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStartTimeOrder: BigNumberish = startTime;
  const humanStopTimeOrder: BigNumberish = stopTime;
  const humanDeposit: BigNumberish = BigNumberToRoundedHumanFormat(deposit, token.decimals, 3) + " " + token.symbol;
  const status: StreamStatus = getStreamStatus(proxyStream);

  return {
    id,
    humanRecipient,
    humanSender,
    status,
    humanDeposit,
    humanStartTime,
    humanStopTime,
    humanStartTimeOrder,
    humanStopTimeOrder,
    token,
  };
};

function StreamTable({
  appsSdk,
  safeInfo,
  outgoingProxyStreams,
}: {
  appsSdk: SdkInstance;
  safeInfo?: SafeInfo;
  outgoingProxyStreams: ProxyStream[];
}): ReactElement {
  const classes = useStyles();

  /** State Variables **/
  const [expandedStreamId, setExpandedStreamId] = useState<number | null>(null);

  /** Memoized Variables **/

  const columns = useMemo(() => {
    return generateColumns();
  }, []);

  const autoColumns = useMemo(() => {
    return columns.filter((column: Column) => !column.custom);
  }, [columns]);

  const expandedStream = useMemo(() => {
    return outgoingProxyStreams.find(({ id }) => expandedStreamId === id);
  }, [outgoingProxyStreams, expandedStreamId]);

  const tableContents: HumanReadableStream[] = useMemo(
    () => outgoingProxyStreams.map(proxyStream => humanReadableStream(proxyStream)),
    [outgoingProxyStreams],
  );

  /** Callbacks **/

  const cancelStream = useCallback(
    (streamId: number): void => {
      if (!safeInfo?.network) return;
      const txs = cancelStreamTxs(safeInfo.network, streamId);
      appsSdk.sendTransactions(txs);
    },
    [appsSdk, safeInfo],
  );

  /** Side Effects **/

  const handleStreamExpand = (id: number): void => {
    setExpandedStreamId((prevId: number | null) => (prevId === id ? null : id));
  };

  return (
    <Table
      columns={columns}
      data={tableContents}
      defaultFixed
      defaultOrder="desc"
      defaultOrderBy={STREAM_TABLE_ID}
      defaultRowsPerPage={10}
      label="Transactions"
      size={tableContents.length}
      disableLoadingOnEmptyTable
    >
      {(sortedData: HumanReadableStream[]) =>
        sortedData.map((row: HumanReadableStream) => (
          <>
            <TableRow
              key={row.id}
              className={`${classes.row} ${expandedStreamId === row.id && classes.expandedRow}`}
              onClick={() => handleStreamExpand(row.id)}
              tabIndex={-1}
            >
              {autoColumns.map((column: Column) => (
                <TableCell align={column.align} component="td" key={column.id} style={cellWidth(column.width)}>
                  {(row as { [key: string]: any })[column.id]}
                </TableCell>
              ))}
              <TableCell component="td">
                <Status status={row.status} />
              </TableCell>
              <TableCell className={classes.expandCellStyle}>
                <IconButton disableRipple>{expandedStreamId === row.id ? <ExpandLess /> : <ExpandMore />}</IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.extendedTxContainer}
                colSpan={columns.length}
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                {expandedStream && (
                  <Collapse
                    component={() => (
                      <ExpandedStream proxyStream={expandedStream} cancelStream={(): void => cancelStream(row.id)} />
                    )}
                    in={expandedStreamId === row.id}
                    timeout="auto"
                    unmountOnExit
                  />
                )}
              </TableCell>
            </TableRow>
          </>
        ))
      }
    </Table>
  );
}

export default StreamTable;
