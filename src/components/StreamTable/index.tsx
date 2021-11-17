import { getAddress } from "@ethersproject/address";
import { BigNumberish } from "@ethersproject/bignumber";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { Fragment, useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";

import { StreamStatus } from "../../constants/streams";
import { DATE_FORMAT, TIME_FORMAT } from "../../constants/time";
import type { HumanReadableStream, Stream } from "../../types";
import { shortenAddress } from "../../utils/address";
import { bigNumberToRoundedHumanFormat } from "../../utils/format";
import { getStreamStatus } from "../../utils/stream";
import { Column, STREAM_TABLE_ID, generateColumns } from "./columns";
import ExpandedStream from "./ExpandedStream";
import Status from "./Status";
import Table from "./Table";
import { cellWidth } from "./Table/TableHead";

const StyledTableRow = styled(TableRow)<{ $expanded: boolean }>`
  cursor: pointer;
  &:hover {
    background-color: #fff3e2;
  }

  ${props =>
    props.$expanded &&
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

const humanReadableStream = (stream: Stream): HumanReadableStream => {
  const { deposit, id, recipient, sender, startTime, stopTime, token } = stream;
  const humanRecipient: string = shortenAddress(getAddress(recipient));
  const humanSender: string = shortenAddress(getAddress(sender));
  const humanStartTime: BigNumberish = format(new Date(startTime * 1000), `${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStopTime: BigNumberish = format(new Date(stopTime * 1000), `${DATE_FORMAT} - ${TIME_FORMAT}`);
  const humanStartTimeOrder: BigNumberish = startTime;
  const humanStopTimeOrder: BigNumberish = stopTime;
  const humanDeposit: BigNumberish = bigNumberToRoundedHumanFormat(deposit, token.decimals, 3) + " " + token.symbol;
  const status: StreamStatus = getStreamStatus(stream);

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

function StreamTable({ streams }: { streams: Stream[] }): JSX.Element {
  const { safe } = useSafeAppsSDK();

  /// STATE ///

  const [expandedStreamId, setExpandedStreamId] = useState<number | null>(null);

  /// MEMOIZED VALUES ///

  const columns: Column[] = useMemo(() => {
    return generateColumns();
  }, []);

  const autoColumns: Column[] = useMemo(() => {
    return columns.filter((column: Column) => {
      return !column.custom;
    });
  }, [columns]);

  const expandedStream: Stream | undefined = useMemo(() => {
    return streams.find(({ id }) => {
      return expandedStreamId === id;
    });
  }, [streams, expandedStreamId]);

  const tableContents: HumanReadableStream[] = useMemo(
    () =>
      streams.map(stream => {
        return humanReadableStream(stream);
      }),
    [streams],
  );

  /// CALLBACKS ///

  const handleStreamExpand = useCallback(
    (id: number): void => {
      setExpandedStreamId((prevId: number | null) => (prevId === id ? null : id));
    },
    [setExpandedStreamId],
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
              $expanded={expandedStreamId === row.id}
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
                    expandedStream ? <ExpandedStream chainId={safe.chainId} stream={expandedStream} /> : <div />
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
