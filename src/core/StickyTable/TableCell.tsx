import * as React from "react";
import { IRenderer, IStickTableRow } from "./IStickyTable";
import allButDataAndVirtualEqual from "./allButDataAndVirtualEqual";
import isEqual from "lodash-es/isEqual";

interface ITableCell {
  data: IStickTableRow;
  className?: string;
  style?: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
  columnWidth: number;
  rowHeight: number;
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
  columnIndex,
  columnWidth,
  rowHeight,
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
    }}
    className={className}
    rowIndex={rowIndex}
    columnIndex={columnIndex}
    selected={selected}
    disabled={disabled}
    highligh={highligh}
  />
);

export default React.memo(TableCell, (prev, next) => {
  // if data.value change we need to re-render
  const prevVal = JSON.stringify(prev.data.value);
  const nextVal = JSON.stringify(next.data.value);
  if (!isEqual(prevVal, nextVal)) return false;

  // if data.loading change we need to re-render
  const prevLoad = JSON.stringify(prev.data.loading);
  const nextLoad = JSON.stringify(next.data.loading);
  if (!isEqual(prevLoad, nextLoad)) return false;

  return allButDataAndVirtualEqual(prev, next);
});
