import React, { ReactElement, useEffect, useState } from "react";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import moment from "moment";

import { Button } from "@gnosis.pm/safe-react-components";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import getStreams from "../../gql/streams";
import cancelStreamTxs from "../../utils/transactions/cancelStream";
import { generateColumns, TX_TABLE_ID } from "../Table/columns";
import { cellWidth } from "../Table/TableHead";
import Table from "../Table";

import { ProxyStream } from "../../typings";
import { bigNumberToHumanFormat } from "../../utils/format";

const humanReadableStream = (stream: ProxyStream) => {
  const { id, recipient, sender } = stream;
  const { deposit, startTime, stopTime, token } = stream.stream;
  const humanStartTime: string = moment.unix(startTime).format("DD-MM-YYYY HH:mm");
  const humanStopTime: string = moment.unix(stopTime).format("DD-MM-YYYY HH:mm");
  const humanDeposit: string = `${bigNumberToHumanFormat(deposit, token.decimals)} ${token.symbol}`;
  return { id, recipient, sender, humanDeposit, humanStartTime, humanStopTime, token };
};

const StreamTable = ({ appsSdk, safeInfo }: { appsSdk: SdkInstance; safeInfo?: SafeInfo }): ReactElement => {
  const [outgoingStreams, setOutgoingStreams] = useState<ProxyStream[]>([]);

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const streams: ProxyStream[] = await getStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingStreams(streams);
    };

    loadOutgoingStreams();
  }, [safeInfo]);

  const cancelStream = (streamId: number): void => {
    if (!safeInfo?.network) return;
    const txs = cancelStreamTxs(safeInfo.network, streamId);
    appsSdk.sendTransactions(txs);
  };

  const columns = generateColumns();
  const autoColumns = columns.filter(c => !c.custom);

  const tableContents = outgoingStreams.map(proxyStream => ({
    ...humanReadableStream(proxyStream),
    humanStartTimeOrder: proxyStream.stream.startTime,
    humanStopTimeOrder: proxyStream.stream.stopTime,
    cancelStream: () => cancelStream(proxyStream.id),
  }));
  return (
    <>
      <Table
        columns={columns}
        data={tableContents}
        defaultFixed
        defaultOrder="desc"
        defaultOrderBy={TX_TABLE_ID}
        defaultRowsPerPage={25}
        label="Transactions"
        size={tableContents.length}
      >
        {(sortedData: ProxyStream[]) =>
          sortedData.map((row: ProxyStream, index: number) => (
            <TableRow
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              // className={cn(classes.row, expandedTx === row.tx.safeTxHash && classes.expandedRow)}
              tabIndex={-1}
            >
              {autoColumns.map((column: any) => (
                <TableCell
                  align={column.align}
                  // className={cn(classes.cell, ["cancelled", "failed"].includes(row.status) && classes.cancelledRow)}
                  component="td"
                  key={column.id}
                  style={cellWidth(column.width)}
                >
                  {(row as { [key: string]: any })[column.id]}
                </TableCell>
              ))}
              <TableCell component="td">
                <Button size="md" color="primary" variant="contained" onClick={() => cancelStream(row.id)}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </Table>
    </>
  );
};

export default StreamTable;
