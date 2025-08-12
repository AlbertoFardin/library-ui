import * as React from "react";
import isEqual from "lodash-es/isEqual";
import allButDataAndVirtualEqual from "./allButDataAndVirtualEqual";
import TableCell from "./TableCell";
import { IRenderer, IStickTableRow } from "./IStickyTable";
import { IVirtual } from "./useVirtual";

interface ITableHeaderRow {
  className?: string;
  style?: React.CSSProperties;
  leftWidth?: number;
  top?: number;
  height: number;
  data: IStickTableRow[];
  columns: string[];
  virtual: IVirtual;
  renderer: (p: IRenderer) => JSX.Element | React.ReactNode;
}
const TableHeaderRowNoMemo = ({
  className,
  style,
  data,
  leftWidth = 0,
  top = 0,
  height,
  virtual,
  renderer,
}: ITableHeaderRow) => {
  const { rows, cols } = virtual;
  const { visible, sizes, positions } = cols;
  const items = [];
  for (let i = visible.min; i <= visible.max; ++i) {
    items.push(
      <TableCell
        key={i}
        renderer={renderer}
        data={data[i]}
        rowIndex={0}
        columnIndex={i}
        columnWidth={sizes[i]}
        rowsTotal={rows.sizes.length}
        columnsTotal={cols.sizes.length}
        rowHeight={height}
        style={{ left: leftWidth + positions[i] }}
      />,
    );
  }
  return (
    <div
      className={className}
      style={{ ...style, height, top }}
      children={items}
    />
  );
};

// Horizontal header bars. These take a 1d data prop and some offsets for positioning
const TableHeaderRow = React.memo(TableHeaderRowNoMemo, (prev, next) => {
  // we need to re-render if change rows "value"
  const prevVal = prev.data.map((d) => JSON.stringify(d.value)).join();
  const nextVal = next.data.map((d) => JSON.stringify(d.value)).join();
  if (prevVal !== nextVal) return false;

  // If virtual.rows changes, we don't care, so we can still return true.
  // If the cols change, we need to re-render
  if (!isEqual(prev.virtual.cols, next.virtual.cols)) return false;
  return allButDataAndVirtualEqual(prev, next);
});

export default TableHeaderRow;
