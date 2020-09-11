import React, { ReactElement, useMemo, useCallback, useState } from "react";

import { Networks } from "@gnosis.pm/safe-apps-sdk";
import moment from "moment";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { IconButton, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { getAddress } from "@ethersproject/address";
import styled, { css } from "styled-components";
import Table from "./Table";
import Status, { StreamStatus, getStreamStatus } from "./Status";
import { cancelStreamTxs, withdrawStreamTxs } from "../../transactions";

import { ProxyStream } from "../../types";
import { BigNumberToRoundedHumanFormat } from "../../utils/format";
import { cellWidth } from "./Table/TableHead";
import { STREAM_TABLE_ID, Column, generateColumns } from "./columns";
import { shortenAddress } from "../../utils/address";
import { TIME_FORMAT, DATE_FORMAT } from "../../utils";
import ExpandedStream from "./ExpandedStream";
import { HumanReadableStream } from "./types";
import { useSendTransactions, useSafeNetwork } from "../../contexts/SafeContext";

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: #fff3e2;
  }

  ${({ expanded }: { expanded: boolean }) =>
    expanded &&
    css`
      backgroundcolor: #fff3e2;
    `}
`;

const ExpandRowCell = styled(TableCell)`
  padding-left: 0;
  padding-right: 15;
`;

const ExpandedStreamCell = styled(TableCell)`
  background-color: #fffaf4;
  border: 0;
  padding: 0;

  &:last-child {
    padding: 0;
  }
`;

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

function StreamTable({ streams }: { streams: ProxyStream[] }): ReactElement {
  const network = useSafeNetwork();
  const sendTransactions = useSendTransactions();
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
    return streams.find(({ id }) => expandedStreamId === id);
  }, [streams, expandedStreamId]);

  const tableContents: HumanReadableStream[] = useMemo(
    () => streams.map(proxyStream => humanReadableStream(proxyStream)),
    [streams],
  );

  /** Callbacks **/

  const cancelStream = useCallback(
    (streamId: number): void => {
      if (!network) return;
      const txs = cancelStreamTxs(network, streamId);
      sendTransactions(txs);
    },
    [network, sendTransactions],
  );

  const withdrawStream = useCallback(
    (streamId: number, amount: BigNumberish): void => {
      if (!network || BigNumber.from(amount).eq(0)) return;
      const txs = withdrawStreamTxs(network, streamId, amount);
      sendTransactions(txs);
    },
    [network, sendTransactions],
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
      noBorder
      disableLoadingOnEmptyTable
    >
      {(sortedData: HumanReadableStream[]) =>
        sortedData.map((row: HumanReadableStream) => (
          <React.Fragment key={row.id}>
            <StyledTableRow
              expanded={expandedStreamId === row.id}
              onClick={() => handleStreamExpand(row.id)}
              tabIndex={-1}
            >
              {autoColumns.map((column: Column) => (
                <TableCell align={column.align} component="td" key={column.id} style={cellWidth(column.width)}>
                  {(row as { [key: string]: any })[column.id]}
                </TableCell>
              ))}
              <TableCell component="td" align="right">
                <Status status={row.status} />
              </TableCell>
              <ExpandRowCell>
                <IconButton disableRipple>{expandedStreamId === row.id ? <ExpandLess /> : <ExpandMore />}</IconButton>
              </ExpandRowCell>
            </StyledTableRow>
            <TableRow>
              <ExpandedStreamCell colSpan={columns.length} style={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse
                  component={() =>
                    expandedStream ? (
                      <ExpandedStream
                        proxyStream={expandedStream}
                        cancelStream={(): void => cancelStream(row.id)}
                        withdrawStream={(amount: BigNumberish): void => withdrawStream(row.id, amount)}
                        network={network as Networks}
                      />
                    ) : (
                      <div />
                    )
                  }
                  in={expandedStreamId === row.id}
                  timeout="auto"
                  unmountOnExit
                />
              </ExpandedStreamCell>
            </TableRow>
          </React.Fragment>
        ))
      }
    </Table>
  );
}

export default StreamTable;
