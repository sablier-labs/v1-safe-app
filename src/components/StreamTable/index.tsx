import React, { ReactElement, useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@gnosis.pm/safe-react-components";
import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import moment from "moment";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Table from "./Table";
import Status, { StreamStatus } from "./Status";
import cancelStreamTxs from "../../utils/transactions/cancelStream";
import getProxyStreams from "../../gql/proxyStreams";

import { ProxyStream, Token } from "../../typings";
import { bigNumberToHumanFormat } from "../../utils/format";
import { cellWidth } from "./Table/TableHead";
import { STREAM_TABLE_ID, Column, generateColumns } from "./Table/columns";

type HumanReadableStream = {
  humanDeposit: string;
  humanStartTime: string;
  humanStopTime: string;
  id: number;
  recipient: string;
  sender: string;
  status: StreamStatus;
  token: Token;
};

type TableRowData = HumanReadableStream & {
  humanStartTimeOrder: number;
  humanStopTimeOrder: number;
  cancelStream: Function;
};

const humanReadableStream = (stream: ProxyStream): HumanReadableStream => {
  const { id, recipient, sender } = stream;
  const { cancellation, deposit, startTime, stopTime, token } = stream.stream;
  const humanStartTime: string = moment.unix(startTime).format("MMM D, YYYY - HH:mm");
  const humanStopTime: string = moment.unix(stopTime).format("MMM D, YYYY - HH:mm");
  const humanDeposit: string = bigNumberToHumanFormat(deposit, token.decimals) + " " + token.symbol;
  let status: StreamStatus;

  if (cancellation !== undefined) {
    status = StreamStatus.Cancelled;
  } else if (moment().isAfter(moment.unix(stopTime))) {
    status = StreamStatus.Ended;
  } else {
    status = StreamStatus.Active;
  }

  return {
    id,
    recipient,
    sender,
    status,
    humanDeposit,
    humanStartTime,
    humanStopTime,
    token,
  };
};

function StreamTable({ appsSdk, safeInfo }: { appsSdk: SdkInstance; safeInfo?: SafeInfo }): ReactElement {
  /** State Variables **/

  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);

  /** Memoized Variables **/

  const columns = useMemo(() => {
    return generateColumns();
  }, []);

  const autoColumns = useMemo(() => {
    return columns.filter((column: Column) => {
      if (!column.custom) {
        return column;
      }
      return undefined;
    });
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

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const proxyStreams: ProxyStream[] = await getProxyStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingProxyStreams(proxyStreams);
    };

    loadOutgoingStreams();
  }, [safeInfo]);

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
      defaultRowsPerPage={25}
      label="Transactions"
      size={tableContents.length}
      disablePagination
    >
      {(sortedData: TableRowData[]) =>
        sortedData.map((row: TableRowData) => (
          <TableRow key={row.id} tabIndex={-1}>
            {autoColumns.map((column: Column) => (
              <TableCell align={column.align} component="td" key={column.id} style={cellWidth(column.width)}>
                {(row as { [key: string]: any })[column.id]}
              </TableCell>
            ))}
            <TableCell component="td">
              <Status status={row.status} />
            </TableCell>

            <TableCell component="td">
              {row.status === StreamStatus.Active && (
                <Button size="md" color="primary" variant="contained" onClick={() => cancelStream(row.id)}>
                  Cancel
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))
      }
    </Table>
  );
}

export default StreamTable;
