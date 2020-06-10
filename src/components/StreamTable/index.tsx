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
import { BigNumberToRoundedHumanFormat } from "../../utils/format";
import { cellWidth } from "./Table/TableHead";
import { STREAM_TABLE_ID, Column, generateColumns } from "./Table/columns";
import { shortenAddress } from "../../utils/address";
import { TIME_FORMAT, DATE_FORMAT } from "../../utils";

type HumanReadableStream = {
  humanDeposit: string;
  humanStartTime: string;
  humanStopTime: string;
  id: number;
  humanRecipient: string;
  humanSender: string;
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
  const humanRecipient: string = shortenAddress(recipient);
  const humanSender: string = shortenAddress(sender);
  const humanStartTime: string = moment.unix(startTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStopTime: string = moment.unix(stopTime).format(`${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanDeposit: string = BigNumberToRoundedHumanFormat(deposit, token.decimals, 3) + " " + token.symbol;
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
    humanRecipient,
    humanSender,
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
      defaultRowsPerPage={10}
      label="Transactions"
      size={tableContents.length}
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
