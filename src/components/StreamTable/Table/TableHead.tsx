import { Text } from "@gnosis.pm/safe-react-components";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import { Column } from "../columns";
import { Order } from "./sorting";

export function cellWidth(width?: number): { maxWidth: string } | undefined {
  if (!width) {
    return undefined;
  }

  return {
    maxWidth: `${width}px`,
  };
}

type GnoTableHeadProps = {
  columns: Column[];
  onSort: (newOrderBy: string, newOrderProp: boolean) => void;
  order: Order;
  orderBy: string;
};

function GnoTableHead({ columns, order, orderBy, onSort }: GnoTableHeadProps): JSX.Element {
  const changeSort = (property: string, orderAttr: boolean) => () => {
    onSort(property, orderAttr);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column: Column) => (
          <TableCell
            align={column.align}
            key={column.id}
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.id ? order : false}
          >
            {column.static ? (
              <div style={column.style}>
                <Text size="lg">{column.label}</Text>
              </div>
            ) : (
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={changeSort(column.id, column.order)}
                style={column.style}
              >
                <Text size="lg">{column.label}</Text>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default GnoTableHead;
