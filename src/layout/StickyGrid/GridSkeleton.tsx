import { IColumn } from "./interfaces";
import Cell from "./Cell/Cell";

interface IGridSkeleton {
  rowsCount: number;
  sidebarWidth: number;
  columns: IColumn[];
  rowHeight: (rowIndex: number) => number;
  headerHeight: number;
}

const GridSkeleton = ({
  rowsCount,
  columns,
  sidebarWidth,
  rowHeight,
}: IGridSkeleton) => {
  if (rowsCount === 0 || !columns.length) return null;
  const width = columns.reduce((acc, { width }) => acc + width, sidebarWidth);
  const items = [];
  for (let i = 0; i <= rowsCount; ++i) {
    items.push(
      <Cell
        key={`cellskeleton_${i}`}
        columnIndex={0}
        rowIndex={i}
        selected={false}
        disabled={false}
        highligh={false}
        style={{
          position: "relative",
          height: rowHeight(i),
          width,
        }}
        children={""}
      />,
    );
  }

  return <div>{items}</div>;
};

export default GridSkeleton;
