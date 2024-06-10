import * as React from "react";
import allButDataAndVirtualEqual from "./allButDataAndVirtualEqual";
import TableCell from "./TableCell";
import { IRenderer, IStickTableRow } from "./IStickyTable";
import { IVirtual } from "./useVirtual";
import isEqual from "lodash-es/isEqual";

interface ITableHeaderCol {
  className?: string;
  style?: React.CSSProperties;
  left?: number;
  width: number;
  data: IStickTableRow[];
  virtual: IVirtual;
  renderer: (p: IRenderer) => JSX.Element | React.ReactNode;
  rowsIndexSelected: number[];
  rowsIndexDisabled: number[];
  rowsIndexHighligh: number[];
}
const TableHeaderCol = ({
  className,
  style,
  data,
  left = 0,
  width,
  virtual,
  renderer,
  rowsIndexSelected,
  rowsIndexDisabled,
  rowsIndexHighligh,
}: ITableHeaderCol) => {
  const setRowsSelected = new Set(rowsIndexSelected);
  const setRowsDisabled = new Set(rowsIndexDisabled);
  const setRowsHighligh = new Set(rowsIndexHighligh);
  const { rows } = virtual;
  const { visible, sizes, positions } = rows;
  const items = [];
  for (let i = visible.min; i <= visible.max; ++i) {
    const dRow = data[i];
    items.push(
      <TableCell
        key={i}
        renderer={renderer}
        data={dRow}
        rowIndex={i}
        columnIndex={0}
        columnWidth={width}
        rowHeight={sizes[i]}
        style={{ top: positions[i] }}
        selected={setRowsSelected.has(i)}
        disabled={setRowsDisabled.has(i)}
        highligh={setRowsHighligh.has(i)}
      />,
    );
  }
  return (
    <div
      className={className}
      style={{ ...style, width, left }}
      children={items}
    />
  );
};

// The vertical headers. These only take 1d arrays for data
export default React.memo(TableHeaderCol, (prev, next) => {
  // we need to re-render if change rows "id"
  const prevIds = prev.data.map((d) => d.id).join();
  const nextIds = next.data.map((d) => d.id).join();
  if (prevIds !== nextIds) return false;

  // we need to re-render if change rows "value"
  const prevVal = prev.data.map((d) => JSON.stringify(d.value)).join();
  const nextVal = next.data.map((d) => JSON.stringify(d.value)).join();
  if (prevVal !== nextVal) return false;

  // If virtual.cols changes, we don't care, so we can still return true.
  // If the row change, we need to re-render
  if (!isEqual(prev.virtual.rows, next.virtual.rows)) return false;

  return allButDataAndVirtualEqual(prev, next);
});
