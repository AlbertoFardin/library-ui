import * as React from "react";
import allButDataAndVirtualEqual from "./allButDataAndVirtualEqual";
import TableCell from "./TableCell";
import { IRenderer, IStickTableRow } from "./IStickyTable";
import { IVirtual } from "./useVirtual";

interface ITableGrid {
  data: IStickTableRow[][];
  columns: string[];
  virtual: IVirtual;
  renderer: (p: IRenderer) => JSX.Element | React.ReactNode;
  rowsIndexSelected: number[];
  rowsIndexDisabled: number[];
  rowsIndexHighligh: number[];
}
const TableGrid = ({
  data,
  columns,
  virtual,
  renderer,
  rowsIndexSelected,
  rowsIndexDisabled,
  rowsIndexHighligh,
}: ITableGrid) => {
  const setRowsSelected = new Set(rowsIndexSelected);
  const setRowsDisabled = new Set(rowsIndexDisabled);
  const setRowsHighligh = new Set(rowsIndexHighligh);
  const { cols, rows } = virtual;
  const items = [];
  // Only render items that our virtualization says we should
  for (let r = rows.visible.min; r <= rows.visible.max; ++r) {
    const dRow = data[r];
    for (let c = cols.visible.min; c <= cols.visible.max; ++c) {
      const columnId = columns[c];
      items.push(
        <TableCell
          key={`${r}_${c}:${columnId}`}
          renderer={renderer}
          data={dRow[c]}
          rowIndex={r}
          columnIndex={c}
          columnWidth={cols.sizes[c]}
          rowHeight={rows.sizes[r]}
          style={{
            top: rows.positions[r],
            left: cols.positions[c],
          }}
          selected={setRowsSelected.has(r)}
          disabled={setRowsDisabled.has(r)}
          highligh={setRowsHighligh.has(r)}
        />,
      );
    }
  }
  return <div>{items}</div>;
};

export default React.memo(TableGrid, (prev, next) => {
  // We depend on the row and col sub-objects,
  // so if they aren't shallow-equal that's good enough to know we have to re-render.
  if (prev.virtual !== next.virtual) return false;
  return allButDataAndVirtualEqual(prev, next);
});
