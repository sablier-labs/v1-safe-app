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
import getProxyStreams from "../../gql/proxyStreams";

import { ProxyStream } from "../../typings";
import { bigNumberToHumanFormat } from "../../utils/format";

type RowProps = {
  proxyStream: ProxyStream;
  cancelStream: Function;
};

function Row({ proxyStream, cancelStream }: RowProps): ReactElement {
  const humanStartTime: string = moment.unix(proxyStream.stream.startTime).format("DD-MM-YYYY HH:mm");
  const humanStopTime: string = moment.unix(proxyStream.stream.stopTime).format("DD-MM-YYYY HH:mm");
  const humanDeposit: string = bigNumberToHumanFormat(proxyStream.stream.deposit, proxyStream.stream.token.decimals);
  return (
    <TableRow key={proxyStream.id}>
      <TableCell component="th" scope="row">
        {proxyStream.id}
      </TableCell>
      <TableCell align="right">{proxyStream.recipient.slice(0, 6)}...</TableCell>
      <TableCell align="right">{humanDeposit + " " + proxyStream.stream.token.symbol}</TableCell>
      <TableCell align="right">{humanStartTime}</TableCell>
      <TableCell align="right">{humanStopTime}</TableCell>
      <TableCell align="right">
        <Button size="md" color="primary" variant="contained" onClick={() => cancelStream(proxyStream.id)}>
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}

function StreamTable({ appsSdk, safeInfo }: { appsSdk: SdkInstance; safeInfo?: SafeInfo }): ReactElement {
  const [outgoingProxyStreams, setOutgoingProxyStreams] = useState<ProxyStream[]>([]);

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

  const cancelStream = (streamId: string): void => {
    if (!safeInfo?.network) return;
    const txs = cancelStreamTxs(safeInfo.network, streamId);
    appsSdk.sendTransactions(txs);
  };

  /* TODO: Add pagination to handle more than 7 streams */
  const tableContents = outgoingProxyStreams
    .slice(0, 7)
    .map((proxyStream: ProxyStream) => <Row proxyStream={proxyStream} cancelStream={cancelStream} />);
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
