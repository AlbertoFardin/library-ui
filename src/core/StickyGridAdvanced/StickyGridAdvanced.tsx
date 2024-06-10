import * as React from "react";
import AutoSizer from "../Autosizer";
import CellContent, { ICellContentData } from "../StickyGrid/CellContent";
import StickyTable, { IRendererCorner, IStickTableRow } from "../StickyTable";
import classnames from "classnames";
import emptyFn from "../../utils/emptyFn";
import CellHeader, { ICellHeaderData } from "../StickyGrid/CellHeader";
import WindowMngSets, { IMngSet, IMngChipValue } from "../WindowMngSets";
import { IRendererLeft, ILeftData } from "../StickyGrid/interfaces";
import { IStickyGridAdvanced } from "./interfaces";
import { ISort, ISortOrder, Initialize } from "../../interfaces";
import GridSkeleton from "../StickyGrid/GridSkeleton";
import GridCanton from "../StickyGrid/GridCanton";
import Cell from "../StickyGrid/Cell";
import useStyles from "../StickyGrid/useStyles";
import GridPlaceholder from "../StickyGrid/GridPlaceholder";
import {
  getCellValueDefault,
  getUserDefault,
  renderCellEmpty,
  rowHeightDefault,
  emptyArray,
  getManagerPosition,
  getIdsRef,
  getRowSelectedIndex,
  getSidebarValueDefault,
} from "../StickyGrid/statics";
import { IChip } from "../Chip";
import BtnPulse from "../BtnPulse";
import {
  reducer,
  reducerInit,
  ACTION,
  IReducerState,
} from "../StickyGrid/reducerAdvanced";
import Text from "../Text";
import Link from "../Link";
import Modal from "../Modal";
import Btn from "../Btn";
import { getTheme } from "../../theme";

const StickyGridAdvanced = ({
  overscan = 1,
  columnsGroups = [],
  columnsChipsTooltip = emptyFn,
  columnsSets = [],
  columnsSetsOwnerId,
  columnsSetsContext,
  columnsSetsSelectedId,
  columnsSetsOnCreateSet,
  columnsSetsOnSharedSet,
  columnsSetsOnRemoveSet,
  columnsSetsOnUpdateSet,
  columnsSetsOnChanged,
  columnsSetsGetShared,
  columns,
  columnsSortMax,
  enabledColumnsResize = true,
  enabledColumnsMove = true,
  enabledColumnsMultiSort = false,
  enabledColumnsRemove = true,
  columnsSort = emptyArray,
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
  onRootClick = emptyFn,
  rowContextmenu = emptyArray,
  rowHeight = rowHeightDefault,
  onRowClick = emptyFn,
  onRowContextMenu = emptyFn,
  onRowCopyToClipboard = emptyFn,
  rowThumbnailSize = 128,
  renderCellSidebar = emptyFn,
  renderCellContent,
  renderCellPlaceholder = renderCellEmpty,
  getCellValue = getCellValueDefault,
  overrideCellMap = {},
  overrideContent,
  getUser = getUserDefault,
  onError = emptyFn,
  getSidebarValue = getSidebarValueDefault,
}: IStickyGridAdvanced) => {
  const classes = useStyles({});

  const reducerInitState: IReducerState = {
    ...reducerInit,
    mngSets: columnsSets,
  };
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    windowSortsError,
    mngOpen,
    mngSets,
    mngSetsSlcId,
    draftSetInit,
    draftSetId,
    draftSetPayload,
  } = state;
  const btnRefCanton = React.useRef(null);
  const [managPositionX, managPositionY] = getManagerPosition(btnRefCanton);

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

  const defaultColumnSizes = React.useMemo(
    () =>
      columns.reduce((acc, cur) => {
        acc[cur.id] = cur.width;
        return acc;
      }, {}),
    [columns],
  );

  const activeColumns = React.useMemo(() => {
    const slcSet = mngSets.find((s) => s.id === columnsSetsSelectedId);
    if (!slcSet) return [];
    return slcSet.payload.items.map(({ id, width: userWidth }) => ({
      ...columns.find((col) => col.id === id),
      width: userWidth || defaultColumnSizes[id],
    }));
  }, [columns, columnsSetsSelectedId, defaultColumnSizes, mngSets]);
  const columnsId = activeColumns.map((c) => c.id);
  const columnsCount = activeColumns.length;
  const rowsCount = rows.length;

  const sizes = React.useMemo(() => {
    return activeColumns.map((col) => col.width);
  }, [activeColumns]);
  const columnWidth = React.useCallback((index) => sizes[index], [sizes]);

  const onRemove = React.useCallback((colId: string) => {
    dispatch({
      type: ACTION.GRID_ON_REMOVE,
      colId,
    });
  }, []);
  const onMove = React.useCallback((dragColId: string, dropColId: string) => {
    dispatch({
      type: ACTION.GRID_ON_MOVE,
      dragColId,
      dropColId,
    });
  }, []);
  const onResizing = React.useCallback(
    (columnSize: number, columnIndex: number) => {
      dispatch({ type: ACTION.GRID_ON_RESIZING, columnSize, columnIndex });
    },
    [],
  );
  const onResizeEnd = React.useCallback(
    (columnSize: number, columnIndex: number) => {
      dispatch({
        type: ACTION.GRID_ON_RESIZE_END,
        columnSize,
        columnIndex,
      });
    },
    [],
  );

  const cbWindowSortsError = React.useCallback(() => {
    dispatch({ type: ACTION.MODAL_SORTS_ERROR });
  }, []);
  const cbHeaderClick = React.useCallback(
    (s: ISort[]) => {
      if (s.length > columnsSortMax) {
        dispatch({ type: ACTION.MODAL_SORTS_ERROR });
      } else {
        onHeaderClick(s);
      }
    },
    [columnsSortMax, onHeaderClick],
  );

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
        const contentData: ICellContentData[] = activeColumns.map((column) => {
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
      activeColumns,
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
  const leftData: IStickTableRow[] = React.useMemo(
    () =>
      rows.map((item, index) => {
        const contentData: ILeftData = {
          value: item.id + getSidebarValue(item.data),
          rowData: item.data,
          rowIndex: index,
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
  const topData: IStickTableRow[] = React.useMemo((): IStickTableRow[] => {
    const sortString = columnsSort.map((s) => s.id + s.order).join();
    return activeColumns.map(({ id, label, sortable }) => {
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
        onClick: cbHeaderClick,
        onMoveColumn: onMove,
        onRemove,
        onResizing,
        onResizeEnd,
      };
      return contentData;
    });
  }, [
    activeColumns,
    cbHeaderClick,
    columnsSort,
    enabledColumnsMove,
    enabledColumnsMultiSort,
    enabledColumnsRemove,
    enabledColumnsResize,
    onMove,
    onRemove,
    onResizeEnd,
    onResizing,
  ]);

  const onManagSetsOpen = React.useCallback(() => {
    dispatch({ type: ACTION.WINDOWMNGSETS_OPENED });
  }, []);

  const renderCanton = React.useCallback(() => {
    return (
      <BtnPulse
        cmpRef={btnRefCanton}
        pulse={!activeColumns.length}
        tooltip="Open your Columns Sets"
        icon="view_column"
        selected={mngOpen}
        onClick={onManagSetsOpen}
        disabled={rootLoading}
      />
    );
  }, [activeColumns.length, mngOpen, onManagSetsOpen, rootLoading]);

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

  const onMngSetsChange = React.useCallback(
    (context: string, selectedId: string, newSets: IMngSet[]) => {
      const sets = newSets.map((s) => ({
        ...s,
        payload: {
          ...s.payload,
          items: s.payload.items.map((c) => ({
            id: c.id,
            width: c.width || defaultColumnSizes[c.id],
          })),
        },
      }));
      dispatch({ type: ACTION.WINDOWMNGSETS_UPDATE, sets });
      columnsSetsOnChanged(context, selectedId, sets);
    },
    [columnsSetsOnChanged, defaultColumnSizes],
  );
  const getManagerChip = React.useCallback(
    (chip: IMngChipValue): IChip => {
      const c: IChip = {
        id: chip.id,
        label: chip.label,
        tooltip: chip.tooltip,
        mandatory: chip.mandatory,
        color: getTheme().colors.theme1,
      };

      const sort = columnsSort.find((s) => s.id === chip.id);
      const sortIndex = columnsSort.findIndex((s) => s.id === chip.id);
      if (!!sort) {
        c.iconRight =
          sort.order === ISortOrder.ASC ? "arrow_upward" : "arrow_downward";
        c.label = c.label + " - " + sortIndex;
      }
      return c;
    },
    [columnsSort],
  );

  React.useEffect(() => {
    (async () => {
      if (draftSetInit === Initialize.START) {
        try {
          dispatch({ type: ACTION.INIT_COLUMNS_LOADING });
          await columnsSetsOnUpdateSet(
            columnsSetsContext,
            draftSetId,
            draftSetPayload,
          );

          dispatch({ type: ACTION.INIT_COLUMNS_STOPPED });

          columnsSetsOnChanged(
            columnsSetsContext,
            columnsSetsSelectedId,
            mngSets,
          );
        } catch {
          onError("Unable update Set, please refresh and retry");
        }
      }
    })();
  }, [
    columnsSetsContext,
    columnsSetsOnChanged,
    columnsSetsOnUpdateSet,
    columnsSetsSelectedId,
    draftSetId,
    draftSetInit,
    draftSetPayload,
    mngSets,
    onError,
  ]);

  React.useEffect(() => {
    if (columnsSetsSelectedId !== mngSetsSlcId) {
      dispatch({ type: ACTION.MNG_SLC_ID, id: columnsSetsSelectedId });
    }
  }, [columnsSetsSelectedId, mngSetsSlcId]);

  return (
    <div
      role="presentation"
      className={classnames({
        [classes.gridContainer]: true,
        [rootClassName]: !!rootClassName,
      })}
      onClick={onRootClick}
    >
      <AutoSizer>
        {({ width, height }) => {
          return (
            <StickyTable
              topData={topData}
              leftData={leftData}
              width={width}
              height={height}
              columns={columnsId}
              columnWidth={columnWidth}
              rows={data}
              rowsCount={
                !!overrideContent || rootError || !activeColumns.length
                  ? 0
                  : rowsCount
              }
              rowsIndexSelected={getRowSelectedIndex(rows, rowsSelected)}
              rowsIndexDisabled={getRowSelectedIndex(rows, rowsDisabled)}
              rowsIndexHighligh={getRowSelectedIndex(rows, rowsHighligh)}
              rowHeight={rowHeight}
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
        override={
          !columnsCount ? (
            <div className={classes.placeholderTypo}>
              <Text
                className={classes.typo}
                children="There are no columns selected"
              />
              <Text
                style={{ margin: "0 50px" }}
                className={classes.typo}
                children="Select one or more columns from "
              />
              <Link onClick={onManagSetsOpen} children="Your Columns Sets" />
            </div>
          ) : (
            overrideContent
          )
        }
      />
      <WindowMngSets
        open={mngOpen}
        titleText="Your Columns Sets"
        titleInfo={[
          "Here you can customize what Columns you see in your grid.",
          "You can create different Sets of Columns for different use cases.",
        ]}
        chipMaxSlc={25}
        chipValues={columns.map((c) => ({
          ...c,
          tooltip: columnsChipsTooltip(c),
        }))}
        chipGroups={columnsGroups}
        sets={mngSets}
        selectedId={columnsSetsSelectedId}
        positionX={managPositionX}
        positionY={managPositionY}
        onClose={onManagSetsOpen}
        getChip={getManagerChip}
        loading={
          draftSetInit === Initialize.START ||
          draftSetInit === Initialize.LOADING
        }
        ownerId={columnsSetsOwnerId}
        context={columnsSetsContext}
        onCreateSet={columnsSetsOnCreateSet}
        onSharedSet={columnsSetsOnSharedSet}
        onRemoveSet={columnsSetsOnRemoveSet}
        onUpdateSet={columnsSetsOnUpdateSet}
        onSetsChanged={onMngSetsChange}
        getSharedSets={columnsSetsGetShared}
        getUser={getUser}
        onError={onError}
      />
      <Modal
        open={windowSortsError}
        onClose={cbWindowSortsError}
        title="Sorting"
        content={
          <>
            <Text children={`You can sort up to ${columnsSortMax} columns`} />
            <Text children="If you want to sort by this column please remove sorting from at least one column" />
          </>
        }
        actions={
          <>
            <div style={{ flex: 1 }} />
            <Btn
              variant="bold"
              color={getTheme().colors.msgSucc}
              label="I UNDERSTAND"
              onClick={cbWindowSortsError}
            />
          </>
        }
      />
    </div>
  );
};

export default StickyGridAdvanced;
