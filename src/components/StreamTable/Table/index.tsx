/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";

import { Column } from "../columns";
import { Order, getSorting, stableSort } from "./sorting";
import TableHead from "./TableHead";

const sm: string = "8px";
const xl: string = "32px";
const xxl: string = "40px";

const useStyles = makeStyles(() => ({
  paginationRoot: {
    backgroundColor: "white",
    borderBottomLeftRadius: sm,
    borderBottomRightRadius: sm,
    marginBottom: xl,
  },
  selectRoot: {
    backgroundColor: "black",
    lineHeight: xxl,
  },
  white: {
    backgroundColor: "white",
  },
}));

const StyledTable = styled(Table)<{ $noBorder: boolean }>`
  ${props =>
    !props.$noBorder &&
    css`
      background-color: white;
      border-top-left-radius: ${sm};
      border-top-right-radius: ${sm};
      box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
    `}
`;

const FIXED_HEIGHT: number = 49;

const StyledLoader = styled.div`
  align-items: center;
  background-color: white;
  border-top-left-radius: ${sm};
  border-top-right-radius: ${sm};
  display: flex;
  height: ${({ emptyRows }: { emptyRows: number }) => FIXED_HEIGHT * emptyRows}px;
  justify-content: center;
  width: 100%;
`;

const backProps = {
  "aria-label": "Previous Page",
};

const nextProps = {
  "aria-label": "Next Page",
};

type GnoTableProps = {
  children(data: any[]): JSX.Element[];
  columns: Column[];
  data: any[];
  defaultFixed: boolean;
  defaultOrder: Order;
  defaultOrderBy: string;
  defaultRowsPerPage: number;
  disableLoadingOnEmptyTable?: boolean;
  disablePagination?: boolean;
  label: string;
  noBorder?: boolean;
  size: number;
};

function GnoTable({
  children,
  columns,
  data,
  defaultFixed,
  defaultOrder = "asc",
  defaultOrderBy,
  defaultRowsPerPage = 5,
  disableLoadingOnEmptyTable = false,
  disablePagination = false,
  label,
  noBorder = false,
  size,
}: GnoTableProps): JSX.Element {
  const classes = useStyles();

  /// STATE ///

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>();
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderBy, setOrderBy] = useState<string>();
  const [fixed, setFixed] = useState<boolean>();
  const [orderProp, setOrderProp] = useState<boolean>();

  /// MEMOIZED VALUES ///

  const displayRows = useMemo((): number => {
    return rowsPerPage || defaultRowsPerPage;
  }, [defaultRowsPerPage, rowsPerPage]);

  const emptyRows = useMemo((): number => {
    return displayRows - Math.min(displayRows, data.length - page * displayRows);
  }, [data, displayRows, page]);

  const fixedParam = useMemo((): boolean => {
    return typeof fixed !== "undefined" ? fixed : Boolean(defaultFixed);
  }, [defaultFixed, fixed]);

  const isEmpty = useMemo((): boolean => {
    return size === 0 && !disableLoadingOnEmptyTable;
  }, [disableLoadingOnEmptyTable, size]);

  const orderByParam = useMemo((): string => {
    return orderBy || defaultOrderBy;
  }, [defaultOrderBy, orderBy]);

  const orderParam = useMemo((): Order => {
    return order || defaultOrder;
  }, [defaultOrder, order]);

  const paginationClasses = useMemo(() => {
    return {
      input: classes.white,
      root: !noBorder ? classes.paginationRoot : undefined,
      selectRoot: classes.selectRoot,
    };
  }, [classes, noBorder]);

  const sortedData = useMemo((): any => {
    let sortedDataHookScope = stableSort(data, getSorting(orderParam, orderByParam, orderProp as boolean), fixedParam);
    if (!disablePagination) {
      sortedDataHookScope = sortedDataHookScope.slice(page * displayRows, page * displayRows + displayRows);
    }
    return sortedDataHookScope;
  }, [data, disablePagination, displayRows, fixedParam, orderByParam, orderParam, orderProp, page]);

  /// CALLBACKS ///

  const onSort = useCallback(
    (newOrderBy: string, newOrderProp: boolean): void => {
      let newOrder: Order = "desc";

      // If table was previously sorted by the user.
      if (order && orderBy === newOrderBy && order === "desc") {
        newOrder = "asc";
      } else if (!order && defaultOrder === "desc") {
        // If it was not sorted and defaultOrder is used.
        newOrder = "asc";
      }

      setOrder(newOrder);
      setOrderBy(newOrderBy);
      setOrderProp(newOrderProp);
      setFixed(false);
    },
    [defaultOrder, order, orderBy],
  );

  const onPageChange = useCallback(
    (_e: any, newPage: number): void => {
      setPage(newPage);
    },
    [setPage],
  );

  const onRowsPerPageChange = useCallback(
    (e: any) => {
      const newRowsPerPage = Number(e.target.value);
      setRowsPerPage(newRowsPerPage);
    },
    [setRowsPerPage],
  );

  /// SIDE EFFECTS ///

  useEffect(() => {
    if (defaultOrderBy && columns) {
      const defaultOrderCol: Column | undefined = columns.find(({ id }: { id: string }) => {
        return id === defaultOrderBy;
      });

      if (defaultOrderCol?.order) {
        setOrderProp(true);
      }
    }
  }, [defaultOrderBy, columns]);

  return (
    <>
      {!isEmpty && (
        <StyledTable aria-labelledby={label} $noBorder={noBorder} size="small">
          <TableHead columns={columns} onSort={onSort} order={order} orderBy={orderByParam} />
          <TableBody>{children(sortedData)}</TableBody>
        </StyledTable>
      )}
      {isEmpty && (
        <StyledLoader emptyRows={emptyRows + 1}>
          <CircularProgress size={60} />
        </StyledLoader>
      )}
      {!disablePagination && (
        <TablePagination
          backIconButtonProps={backProps}
          classes={paginationClasses}
          component="div"
          count={size}
          nextIconButtonProps={nextProps}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={displayRows}
          rowsPerPageOptions={[displayRows]}
        />
      )}
    </>
  );
}

export default GnoTable;
