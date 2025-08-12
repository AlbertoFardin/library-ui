import * as React from "react";
import StickyTable, { IRenderer, IRendererCorner, IStickTableRow } from ".";
import InputButton from "../../stories/InputButton";
import InputNumber from "../../stories/InputNumber";
import CardDemo from "../../stories/CardDemo";

const Cell = ({ className, style, columnIndex, rowIndex }: IRenderer) => (
  <div
    className={className}
    style={style}
    children={`${rowIndex}:${columnIndex}`}
  />
);
const Header = ({ className, style, columnIndex, rowIndex }: IRenderer) => (
  <div
    className={className}
    style={{ ...style, backgroundColor: "#f1f1f1" }}
    children={`${rowIndex}:${columnIndex}`}
  />
);
const Corner = ({ width, height, top, left, zIndex }: IRendererCorner) => (
  <div
    style={{
      position: "sticky",
      width: 0,
      height: 0,
      top,
      left,
      zIndex,
    }}
  >
    <div
      style={{
        position: "absolute",
        width,
        height,
        color: "#fff",
        backgroundColor: "#00f",
      }}
      children={`${top}:${left}`}
    />
  </div>
);

const DemoStickyTable = () => {
  const [colsCount, setColsCount] = React.useState(200);
  const [rowsCount, setRowsCount] = React.useState(200);

  const [resetScrollX, setResetScrollbarX] = React.useState(0);
  const [resetScrollY, setResetScrollbarY] = React.useState(0);
  const onResetScrollbarX = React.useCallback(() => {
    setResetScrollbarX(new Date().getTime());
  }, []);
  const onResetScrollbarY = React.useCallback(() => {
    setResetScrollbarY(new Date().getTime());
  }, []);

  const columns = React.useMemo(() => {
    const columnsId: string[] = [];
    for (let i = 0; i < colsCount; ++i) {
      columnsId.push(String(i));
    }
    return columnsId;
  }, [colsCount]);
  const rows = React.useMemo(() => {
    const dataRows: IStickTableRow[][] = [];
    for (let i = 0; i < rowsCount; ++i) {
      const dataRow: IStickTableRow[] = [];
      for (let i = 0; i < colsCount; ++i) {
        dataRow.push({ value: i });
      }
      dataRows.push(dataRow);
    }
    return dataRows;
  }, [colsCount, rowsCount]);
  const topData = React.useMemo(() => {
    const dataCols = [];
    for (let i = 0; i < colsCount; ++i) {
      dataCols.push([{ id: i }]);
    }
    return dataCols;
  }, [colsCount]);
  const leftData = React.useMemo(() => {
    const dataRows: IStickTableRow[] = [];
    for (let i = 0; i < rowsCount; ++i) {
      const dataRow: IStickTableRow = { value: i };
      dataRows.push(dataRow);
    }
    return dataRows;
  }, [rowsCount]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div style={{ border: "1px solid #f00" }}>
          <StickyTable
            topData={topData}
            bottomData={topData}
            leftData={leftData}
            rightData={leftData}
            rows={rows}
            rowsCount={rowsCount}
            width={400}
            height={400}
            columns={columns}
            columnWidth={50}
            rowHeight={50}
            topHeight={50}
            bottomHeight={50}
            leftWidth={50}
            rightWidth={50}
            CellRenderer={Cell}
            //
            TopRenderer={Header}
            BottomRenderer={Header}
            LeftRenderer={Header}
            RightRenderer={Header}
            //
            TopLeftRender={Corner}
            TopRightRender={Corner}
            BottomLeftRender={Corner}
            BottomRightRender={Corner}
            //
            resetScrollbarX={resetScrollX}
            resetScrollbarY={resetScrollY}
          />
        </div>
      </div>
      <CardDemo>
        <InputButton label="resetScrollbarX" onChange={onResetScrollbarX} />
        <InputButton label="resetScrollbarY" onChange={onResetScrollbarY} />
        <InputNumber
          label="rowsCount"
          value={rowsCount}
          onChange={setRowsCount}
        />
        <InputNumber
          label="colsCount"
          value={colsCount}
          onChange={setColsCount}
        />
      </CardDemo>
    </div>
  );
};

export default DemoStickyTable;
