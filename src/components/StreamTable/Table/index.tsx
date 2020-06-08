import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";

import TableHead from "./TableHead";
import { getSorting, stableSort, Order } from "./sorting";
import { Column } from "./columns";

const sm = "8px";
const xl = "32px";
const xxl = "40px";

const styles = {
  root: {
    backgroundColor: "white",
    borderTopLeftRadius: sm,
    borderTopRightRadius: sm,
    // boxShadow: "1px 2px 10px 0 rgba(212, 212, 211, 0.59)",
  },
  selectRoot: {
    backgroundColor: "white",
    lineHeight: xxl,
  },
  white: {
    backgroundColor: "white",
  },
  paginationRoot: {
    backgroundColor: "white",
    // boxShadow: "1px 2px 10px 0 rgba(212, 212, 211, 0.59)",
    borderBottomLeftRadius: sm,
    borderBottomRightRadius: sm,
    marginBottom: xl,
  },
  loader: {
    // boxShadow: "1px 2px 10px 0 rgba(212, 212, 211, 0.59)",
  },
};

const FIXED_HEIGHT: number = 49;

const backProps = {
  "aria-label": "Previous Page",
};

const nextProps = {
  "aria-label": "Next Page",
};

type Props = {
  children: Function;
  classes: any;
  columns: Column[];
  data: any[];
  defaultFixed: boolean;
  defaultOrder: Order;
  defaultOrderBy: string;
  defaultRowsPerPage: number;
  disableLoadingOnEmptyTable: boolean;
  disablePagination: boolean;
  label: string;
  noBorder?: boolean;
  size: number;
};

type State = {
  fixed: boolean | undefined;
  order: Order | undefined;
  orderBy: string | undefined;
  orderProp: boolean;
  page: number;
  rowsPerPage: number | undefined;
};

class GnoTable extends Component<Props, State> {
  /* eslint-disable-next-line react/static-property-placement */
  static defaultProps = {
    defaultOrder: "asc" as Order,
    disableLoadingOnEmptyTable: false,
    disablePagination: false,
    defaultRowsPerPage: 5,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      page: 0,
      order: undefined,
      orderBy: undefined,
      fixed: undefined,
      orderProp: false,
      rowsPerPage: undefined,
    };
  }

  componentDidMount() {
    const { columns, defaultOrderBy } = this.props;

    if (defaultOrderBy && columns) {
      const defaultOrderCol: Column | undefined = columns.find(({ id }: { id: string }) => id === defaultOrderBy);

      if (defaultOrderCol?.order) {
        this.setState({
          orderProp: true,
        });
      }
    }
  }

  onSort = (newOrderBy: string, orderProp: boolean) => {
    const { order, orderBy } = this.state;
    const { defaultOrder } = this.props;
    let newOrder: Order = "desc";

    // if table was previously sorted by the user
    if (order && orderBy === newOrderBy && order === "desc") {
      newOrder = "asc";
    } else if (!order && defaultOrder === "desc") {
      // if it was not sorted and defaultOrder is used
      newOrder = "asc";
    }

    this.setState(() => ({
      fixed: false,
      order: newOrder,
      orderBy: newOrderBy,
      orderProp,
    }));
  };

  getEmptyStyle = (emptyRows: number): object => ({
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: sm,
    borderTopRightRadius: sm,
    display: "flex",
    height: FIXED_HEIGHT * emptyRows,
    justifyContent: "center",
    width: "100%",
  });

  handleChangePage = (e: any, page: number): void => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (e: any): void => {
    const rowsPerPage = Number(e.target.value);
    this.setState({ rowsPerPage });
  };

  render() {
    const {
      children,
      classes,
      columns,
      data,
      defaultFixed,
      defaultOrder,
      defaultOrderBy,
      defaultRowsPerPage,
      disableLoadingOnEmptyTable,
      disablePagination,
      label,
      noBorder,
      size,
    }: Props = this.props;
    const { fixed, order, orderBy, orderProp, page, rowsPerPage } = this.state;
    const orderByParam: string = orderBy || defaultOrderBy;
    const orderParam: Order = order || defaultOrder;
    const displayRows: number = rowsPerPage || defaultRowsPerPage;
    const fixedParam = typeof fixed !== "undefined" ? fixed : !!defaultFixed;

    const paginationClasses = {
      selectRoot: classes.selectRoot,
      root: !noBorder && classes.paginationRoot,
      input: classes.white,
    };

    let sortedData = stableSort(data, getSorting(orderParam, orderByParam, orderProp), fixedParam);

    if (!disablePagination) {
      sortedData = sortedData.slice(page * displayRows, page * displayRows + displayRows);
    }

    const emptyRows = displayRows - Math.min(displayRows, data.length - page * displayRows);
    const isEmpty = size === 0 && !disableLoadingOnEmptyTable;

    return (
      <>
        {!isEmpty && (
          <Table aria-labelledby={label} size="small" className={noBorder ? "" : classes.root}>
            <TableHead columns={columns} onSort={this.onSort} order={order} orderBy={orderByParam} />
            <TableBody>{children(sortedData)}</TableBody>
          </Table>
        )}
        {isEmpty && (
          <div className={classes.loader} style={this.getEmptyStyle(emptyRows + 1)}>
            <CircularProgress size={60} />
          </div>
        )}
        {!disablePagination && (
          <TablePagination
            backIconButtonProps={backProps}
            classes={paginationClasses}
            component="div"
            count={size}
            nextIconButtonProps={nextProps}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={displayRows}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        )}
      </>
    );
  }
}

export default withStyles(styles as object)(GnoTable);
