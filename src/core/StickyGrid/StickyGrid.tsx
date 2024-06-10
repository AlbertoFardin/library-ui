import * as React from "react";
import AutoSizer from "../Autosizer";
import without from "lodash-es/without";
import CellContent, { ICellContentData } from "./CellContent";
import StickyTable, { IRendererCorner, IStickTableRow } from "../StickyTable";
import classnames from "classnames";
import emptyFn from "../../utils/emptyFn";
import CellHeader, { ICellHeaderData } from "./CellHeader";
import { IColumn, IStickyGrid, IRendererLeft, ILeftData } from "./interfaces";
import GridSkeleton from "./GridSkeleton";
import GridCanton from "./GridCanton";
import Cell from "./Cell";
import GridPlaceholder from "./GridPlaceholder";
import useStyles from "./useStyles";
import {
  getCellValueDefault,
  getUserDefault,
  renderCellEmpty,
  emptyArray,
  rowHeightDefault,
  getIdsRef,
  getRowSelectedIndex,
  getSidebarValueDefault,
} from "./statics";

const StickyGrid = ({
  overscan = 1,
  renderCellSidebar = emptyFn,
  renderCellContent = emptyFn,
  renderCellPlaceholder = renderCellEmpty,
  renderCanton = emptyFn,
  columns: columnsProps,
  enabledColumnsResize = true,
  enabledColumnsMove = true,
  enabledColumnsMultiSort = false,
  enabledColumnsRemove = true,
  columnsSort = emptyArray,
  onColumnsChange = emptyFn,
  sidebarWidth = 60,
  headerHeight = 50,
  onHeaderClick = emptyFn,
  rows,
  rowsSelected = emptyArray,
  rowsDisabled = emptyArray,
  rowsHighligh = emptyArray,
  rootLoading = false,
  rootError = false,
  rootClassName,
  onRootClick: rootOnClick = emptyFn,
  rowContextmenu = emptyArray,
  rowHeight = rowHeightDefault,
  onRowClick = emptyFn,
  onRowContextMenu = emptyFn,
  onRowCopyToClipboard,
  rowThumbnailSize = 128,
  getCellValue = getCellValueDefault,
  overrideCellMap = {},
  overrideContent,
  getUser = getUserDefault,
  resetColumns,
  getSidebarValue = getSidebarValueDefault,
}: IStickyGrid) => {
  const classes = useStyles({});
  const [columns, setColumns] = React.useState(columnsProps as IColumn[]);

  const refIdsJoined = React.useRef("");
  const refResetTime = React.useRef(0);
  const resetScrollbarY = React.useMemo(() => {
    const newIdsJoined = getIdsRef(rows);
    if (!rootLoading && refIdsJoined.current !== newIdsJoined) {
      // when finish loading and rows is different no only refreshed
      refIdsJoined.current = newIdsJoined;
      refResetTime.current = new Date().getTime();
    }
    return refResetTime.current;
  }, [rootLoading, rows]);

  const sizes = React.useMemo(() => columns.map((col) => col.width), [columns]);
  const columnWidth = React.useCallback((index) => sizes[index], [sizes]);

  const onRemove = React.useCallback(
    (id: string) => {
      const columnRemoved = columns.find((col) => col.id === id);
      const newColumns: IColumn[] = without(columns, columnRemoved);
      setColumns(newColumns);
      onColumnsChange(columns);
    },
    [columns, onColumnsChange],
  );
  const onMove = React.useCallback(
    (dragColId: string, dropColId: string) => {
      const newColumns = columns.reduce((acc, curr) => {
        switch (curr.id) {
          case dragColId: {
            return acc;
          }
          case dropColId: {
            const dragCol = columns.find((el) => el.id === dragColId);
            acc.push(dragCol);
            acc.push(curr);
            return acc;
          }
          default: {
            acc.push(curr);
            return acc;
          }
        }
      }, [] as IColumn[]);
      setColumns(newColumns);
      onColumnsChange(newColumns);
    },
    [columns, onColumnsChange],
  );
  const onResizeEnd = React.useCallback(
    (size: number, index: number) => {
      const newColumns = columns.map((col, i) => {
        if (i === index) {
          col.width = size;
        }
        return col;
      });
      setColumns(newColumns);
      onColumnsChange(newColumns);
    },
    [columns, onColumnsChange],
  );
  const onResizing = React.useCallback(
    (size: number, index: number) => {
      const newColumns = columns.map((col, i) => {
        if (i === index) {
          col.width = size;
        }
        return col;
      });
      setColumns(newColumns);
      onColumnsChange(newColumns);
    },
    [columns, onColumnsChange],
  );

  const columnsId = columns.map((c) => c.id);
  const columnsCount = columnsId.length;
  const rowsCount = rows.length;

  const leftRenderer = React.useCallback(
    (p: IRendererLeft) => {
      const { rowIndex, style, className, data, selected, disabled, highligh } =
        p;
      const {
        rowData,
        contextmenu,
        onClick,
        onContextMenu,
        onCopyToClipboard,
      } = data;
      const columnIndex = -1;
      return (
        <Cell
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          className={className}
          contextmenu={contextmenu}
          onClick={onClick}
          onContextMenu={onContextMenu}
        >
          {renderCellSidebar({
            rowData,
            rowIndex,
            columnIndex,
            selected,
            disabled,
            highligh,
            style,
            contextmenu,
            onClick,
            onContextMenu,
            onCopyToClipboard,
          })}
        </Cell>
      );
    },
    [renderCellSidebar],
  );
  const data: IStickTableRow[][] = React.useMemo(
    () =>
      rows.map((item) => {
        const contentData: IStickTableRow[] = columns.map((column) => {
          const d: ICellContentData = {
            value: getCellValue(item.data, column),
            column,
            loading: rootLoading,
            rowOnClick: onRowClick,
            rowOnContextMenu: onRowContextMenu,
            rowOnCopyToClipboard: onRowCopyToClipboard,
            rowThumbnailSize,
            rowContextmenu,
            renderCell: renderCellContent,
            renderPlaceholder: renderCellPlaceholder,
            overrideCellMap,
            getUser,
          };
          return d;
        });
        return contentData;
      }),
    [
      columns,
      getCellValue,
      getUser,
      onRowClick,
      onRowContextMenu,
      onRowCopyToClipboard,
      overrideCellMap,
      renderCellContent,
      renderCellPlaceholder,
      rootLoading,
      rowContextmenu,
      rowThumbnailSize,
      rows,
    ],
  );
  const topData: IStickTableRow[] = React.useMemo(() => {
    const sortString = columnsSort.map((s) => s.id + s.order).join();
    return columns.map(({ id, label, sortable }) => {
      const contentData: ICellHeaderData = {
        value: id + "_" + sortString, // change "value" -> fire rerender topData
        id,
        label,
        sortable,
        enableResize: enabledColumnsResize,
        enableMove: enabledColumnsMove,
        enableMultiSort: enabledColumnsMultiSort,
        enableRemove: enabledColumnsRemove,
        sort: columnsSort,
        onClick: onHeaderClick,
        onMoveColumn: onMove,
        onRemove,
        onResizing,
        onResizeEnd,
      };
      return contentData;
    });
  }, [
    columns,
    columnsSort,
    enabledColumnsMove,
    enabledColumnsMultiSort,
    enabledColumnsRemove,
    enabledColumnsResize,
    onHeaderClick,
    onMove,
    onRemove,
    onResizeEnd,
    onResizing,
  ]);
  const leftData: IStickTableRow[] = React.useMemo(
    (): ILeftData[] =>
      rows.map((item, index) => {
        const contentData: ILeftData = {
          value: item.id + getSidebarValue(item.data),
          rowIndex: index,
          rowData: item.data,
          onClick: onRowClick,
          onContextMenu: onRowContextMenu,
          onCopyToClipboard: onRowCopyToClipboard,
          contextmenu: rowContextmenu,
        };
        return contentData;
      }),
    [
      getSidebarValue,
      onRowClick,
      onRowContextMenu,
      onRowCopyToClipboard,
      rowContextmenu,
      rows,
    ],
  );
  const TopLeftRender = React.useCallback(
    ({ width, height, top, left, zIndex }: IRendererCorner) => {
      return (
        <GridCanton
          cellRender={renderCanton}
          height={height}
          width={width}
          top={top}
          left={left}
          zIndex={zIndex}
        />
      );
    },
    [renderCanton],
  );

  React.useEffect(() => {
    if ((!columns.length && !!columnsProps.length) || resetColumns) {
      setColumns(columnsProps);
    }
  }, [columns.length, columnsProps, resetColumns]);

  return (
    <div
      role="presentation"
      className={classnames({
        [classes.gridContainer]: true,
        [rootClassName]: !!rootClassName,
      })}
      onClick={rootOnClick}
    >
      <AutoSizer>
        {({ width, height }) => {
          return (
            <StickyTable
              rows={data}
              rowsCount={!!overrideContent || rootError ? 0 : rowsCount}
              rowsIndexSelected={getRowSelectedIndex(rows, rowsSelected)}
              rowsIndexDisabled={getRowSelectedIndex(rows, rowsDisabled)}
              rowsIndexHighligh={getRowSelectedIndex(rows, rowsHighligh)}
              rowHeight={rowHeight}
              columns={columnsId}
              columnWidth={columnWidth}
              topData={topData}
              leftData={leftData}
              width={width}
              height={height}
              topHeight={headerHeight}
              leftWidth={sidebarWidth}
              overscan={overscan}
              CellRenderer={CellContent}
              TopRenderer={CellHeader}
              LeftRenderer={leftRenderer}
              TopLeftRender={TopLeftRender}
              resetScrollbarX={0}
              resetScrollbarY={resetScrollbarY}
              children={
                <GridSkeleton
                  rowsCount={rowsCount}
                  columns={columns}
                  sidebarWidth={sidebarWidth}
                  rowHeight={rowHeight}
                  headerHeight={headerHeight}
                />
              }
            />
          );
        }}
      </AutoSizer>
      <GridPlaceholder
        rootError={rootError}
        rootLoading={rootLoading}
        rowCount={rowsCount}
        columnCount={columnsCount}
        override={overrideContent}
      />
    </div>
  );
};

export default StickyGrid;
