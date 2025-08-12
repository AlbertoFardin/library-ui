import * as React from "react";
import isEqual from "lodash-es/isEqual";
import { IRenderer, IStickTableRow } from "./IStickyTable";
import allButDataAndVirtualEqual from "./allButDataAndVirtualEqual";

interface ITableCell {
  data: IStickTableRow;
  className?: string;
  style?: React.CSSProperties;
  rowIndex: number;
  rowHeight: number;
  rowsTotal: number;
  columnIndex: number;
  columnWidth: number;
  columnsTotal: number;
  renderer: (p: IRenderer) => JSX.Element | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  highligh?: boolean;
}

const TableCell = ({
  data,
  className,
  style,
  rowIndex,
  rowHeight,
  rowsTotal,
  columnIndex,
  columnWidth,
  columnsTotal,
  renderer: Renderer,
  selected = false,
  disabled = false,
  highligh = false,
}: ITableCell) => (
  <Renderer
    data={data}
    style={{
      ...style,
      width: columnWidth,
      height: rowHeight,
      position: "absolute",
    }}
    className={className}
    rowIndex={rowIndex}
    rowsTotal={rowsTotal}
    columnIndex={columnIndex}
    columnsTotal={columnsTotal}
    selected={selected}
    disabled={disabled}
    highligh={highligh}
  />
);

export default React.memo(TableCell, (prev, next) => {
  // if data.value change we need to re-render
  let prevVal = "";
  try {
    prevVal = JSON.stringify(prev.data.value);
  } catch {
    prevVal = prev.data.value;
  }
  let nextVal = "";
  try {
    nextVal = JSON.stringify(next.data.value);
  } catch {
    nextVal = next.data.value;
  }
  if (!isEqual(prevVal, nextVal)) return false;

  // if data.loading change we need to re-render
  const prevLoad = JSON.stringify(prev.data.loading);
  const nextLoad = JSON.stringify(next.data.loading);
  if (!isEqual(prevLoad, nextLoad)) return false;

  // if data.dememoize we need to re-render ever
  if (next.data.dememoize) return false;

  return allButDataAndVirtualEqual(prev, next);
});
