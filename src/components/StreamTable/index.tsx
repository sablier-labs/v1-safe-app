import React, { ReactElement, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";
import { Button } from "@gnosis.pm/safe-react-components";

import cancelStreamTxs from "../../utils/transactions/cancelStream";
import getStreams from "../../gql/streams";

import { Stream } from "../../typings";
import { bigNumberToHumanFormat } from "../../utils/format";

function StreamRow({ stream, cancelStream }: { stream: Stream; cancelStream: Function }): ReactElement {
  const humanStartTime: string = moment.unix(stream.startTime).format("DD-MM-YYYY HH:mm");
  const humanStopTime: string = moment.unix(stream.stopTime).format("DD-MM-YYYY HH:mm");
  const humanDeposit: string = bigNumberToHumanFormat(stream.deposit, stream.token.decimals);
  return (
    <TableRow key={stream.id}>
      <TableCell component="th" scope="row">
        {stream.id}
      </TableCell>
      <TableCell align="right">{stream.recipient.slice(0, 6)}...</TableCell>
      <TableCell align="right">{`${humanDeposit} ${stream.token.symbol}`}</TableCell>
      <TableCell align="right">{humanStartTime}</TableCell>
      <TableCell align="right">{humanStopTime}</TableCell>
      <TableCell align="right">
        <Button size="md" color="primary" variant="contained" onClick={() => cancelStream(stream.id)}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

function StreamTable({ appsSdk, safeInfo }: { appsSdk: SdkInstance; safeInfo?: SafeInfo }): ReactElement {
  const [outgoingStreams, setOutgoingStreams] = useState<Array<Stream>>([]);

  useEffect(() => {
    const loadOutgoingStreams = async () => {
      if (!safeInfo || !safeInfo.network || !safeInfo.safeAddress) {
        return;
      }

      const streams: Stream[] = await getStreams(safeInfo.network, safeInfo.safeAddress);
      setOutgoingStreams(streams);
    };

    loadOutgoingStreams();
  }, [safeInfo]);

  const cancelStream = (streamId: string): void => {
    if (!safeInfo?.network) return;
    const txs = cancelStreamTxs(safeInfo.network, streamId);
    appsSdk.sendTransactions(txs);
  };

  // TODO: Add pagination to handle more than 7 streams
  const tableContents = outgoingStreams
    .slice(0, 7)
    .map((stream: Stream) => <StreamRow stream={stream} cancelStream={cancelStream} />);
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Stream ID</TableCell>
          <TableCell align="right">Recipient</TableCell>
          <TableCell align="right">Value</TableCell>
          <TableCell align="right">Start time</TableCell>
          <TableCell align="right">End time</TableCell>
          <TableCell align="right">Cancel</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{tableContents}</TableBody>
    </Table>
  );
}

export default StreamTable;
