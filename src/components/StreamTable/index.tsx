import React, { ReactElement, useMemo, useCallback, useState } from "react";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import moment from "moment";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { IconButton, Collapse, makeStyles } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import Table from "./Table";
import Status, { StreamStatus, getStreamStatus } from "./Status";
import cancelStreamTxs from "../../utils/transactions/cancelStream";

import { ProxyStream } from "../../typings";
import { BigNumberToRoundedHumanFormat } from "../../utils/format";
import { cellWidth } from "./Table/TableHead";
import { STREAM_TABLE_ID, Column, generateColumns } from "./Table/columns";
import { shortenAddress } from "../../utils/address";
import { TIME_FORMAT, DATE_FORMAT } from "../../utils";
import ExpandedStream from "./ExpandedStream";
import { TableRowData, HumanReadableStream } from "./types";

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

const humanReadableStream = (stream: ProxyStream): HumanReadableStream => {
  const { id, recipient, sender } = stream;
  const { deposit, startTime, stopTime, token } = stream.stream;
  const humanRecipient: string = shortenAddress(recipient);
  const humanSender: string = shortenAddress(sender);
  const humanStartTime: string = moment.unix(startTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStopTime: string = moment.unix(stopTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanDeposit: string = BigNumberToRoundedHumanFormat(deposit, token.decimals, 3) + " " + token.symbol;
  const status: StreamStatus = getStreamStatus(stream);

  return {
    id,
    humanRecipient,
    humanSender,
    status,
    humanDeposit,
    humanStartTime,
    humanStopTime,
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
  const [expandedStream, setExpandedStream] = useState<number | null>(null);

  /** Memoized Variables **/

  const columns = useMemo(() => {
    return generateColumns();
  }, []);

  const autoColumns = useMemo(() => {
    return columns.filter((column: Column) => !column.custom);
  }, [columns]);

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
    setExpandedStream((prevId: number | null) => (prevId === id ? null : id));
  };

  const tableContents: TableRowData[] = outgoingProxyStreams.map(proxyStream => ({
    ...humanReadableStream(proxyStream),
    humanStartTimeOrder: proxyStream.stream.startTime,
    humanStopTimeOrder: proxyStream.stream.stopTime,
    cancelStream: () => cancelStream(proxyStream.id),
  }));
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
      {(sortedData: TableRowData[]) =>
        sortedData.map((row: TableRowData) => (
          <>
            <TableRow
              key={row.id}
              className={`${classes.row} ${expandedStream === row.id && classes.expandedRow}`}
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
                <IconButton disableRipple>{expandedStream === row.id ? <ExpandLess /> : <ExpandMore />}</IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.extendedTxContainer}
                colSpan={7}
                style={{ paddingBottom: 0, paddingTop: 0 }}
              >
                <Collapse
                  component={() => <ExpandedStream stream={row} cancelStream={(): void => cancelStream(row.id)} />}
                  in={expandedStream === row.id}
                  timeout="auto"
                  unmountOnExit
                />
              </TableCell>
            </TableRow>
          </>
        ))
      }
    </Table>
  );
}

export default StreamTable;
