import { getAddress } from "@ethersproject/address";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";
import { Collapse, IconButton } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { format } from "date-fns";
import { Fragment, useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";

import { cancelStreamTxs, withdrawStreamTxs } from "../../transactions";
import { ProxyStream } from "../../types";
import { DATE_FORMAT, TIME_FORMAT } from "../../utils";
import { shortenAddress } from "../../utils/address";
import { bigNumberToRoundedHumanFormat } from "../../utils/format";
import { Column, STREAM_TABLE_ID, generateColumns } from "./columns";
import ExpandedStream from "./ExpandedStream";
import Status, { StreamStatus, getStreamStatus } from "./Status";
import Table from "./Table";
import { cellWidth } from "./Table/TableHead";
import { HumanReadableStream } from "./types";

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: #fff3e2;
  }

  ${({ expanded }: { expanded: boolean }) =>
    expanded &&
    css`
      background-color: #fff3e2;
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
  const humanStartTime: BigNumberish = format(new Date(startTime * 1000), `${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStopTime: BigNumberish = format(new Date(stopTime * 1000), `${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStartTimeOrder: BigNumberish = startTime;
  const humanStopTimeOrder: BigNumberish = stopTime;
  const humanDeposit: BigNumberish = bigNumberToRoundedHumanFormat(deposit, token.decimals, 3) + " " + token.symbol;
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

function StreamTable({ streams }: { streams: ProxyStream[] }): JSX.Element {
  const { safe, sdk } = useSafeAppsSDK();

  /// STATE ///

  const [expandedStreamId, setExpandedStreamId] = useState<number | null>(null);

  /// MEMOIZED VALUES ///

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

  /// CALLBACKS ///

  const cancelStream = useCallback(
    (streamId: number): void => {
      if (!safe.chainId) {
        return;
      }
      const txs: BaseTransaction[] = cancelStreamTxs(safe.chainId, streamId);
      void sdk.txs.send({ txs });
    },
    [safe.chainId, sdk],
  );

  const handleStreamExpand = useCallback(
    (id: number): void => {
      setExpandedStreamId((prevId: number | null) => (prevId === id ? null : id));
    },
    [setExpandedStreamId],
  );

  const withdrawStream = useCallback(
    (streamId: number, amount: BigNumberish): void => {
      if (!safe.chainId || BigNumber.from(amount).isZero()) {
        return;
      }
      const txs: BaseTransaction[] = withdrawStreamTxs(safe.chainId, streamId, amount);
      void sdk.txs.send({ txs });
    },
    [safe.chainId, sdk],
  );

  /// SIDE EFFECTS ///

  return (
    <Table
      columns={columns}
      data={tableContents}
      defaultFixed
      defaultOrder="desc"
      defaultOrderBy={STREAM_TABLE_ID}
      defaultRowsPerPage={10}
      disableLoadingOnEmptyTable
      label="Transactions"
      noBorder
      size={tableContents.length}
    >
      {(sortedData: HumanReadableStream[]) =>
        sortedData.map((row: HumanReadableStream) => (
          <Fragment key={row.id}>
            <StyledTableRow
              expanded={expandedStreamId === row.id}
              onClick={() => {
                handleStreamExpand(row.id);
              }}
              tabIndex={-1}
            >
              {autoColumns.map((column: Column) => (
                <TableCell align={column.align} component="td" key={column.id} style={cellWidth(column.width)}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
                        chainId={safe.chainId}
                        cancelStream={(): void => cancelStream(row.id)}
                        proxyStream={expandedStream}
                        withdrawStream={(amount: BigNumberish): void => {
                          withdrawStream(row.id, amount);
                        }}
                      />
                    ) : (
                      <div />
                    )
                  }
                  in={expandedStreamId === row.id}
                  unmountOnExit
                  timeout="auto"
                />
              </ExpandedStreamCell>
            </TableRow>
          </Fragment>
        ))
      }
    </Table>
  );
}

export default StreamTable;
