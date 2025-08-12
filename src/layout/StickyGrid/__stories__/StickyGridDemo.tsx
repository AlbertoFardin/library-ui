import * as React from "react";
import { action } from "@storybook/addon-actions";
import Text from "../../../core/Text";
import Divider from "../../../core/Divider";
import Toolbar from "../../../core/Toolbar";
import { IPopoverListItem } from "../../../core/PopoverList";
import Btn from "../../../core/Btn";
import CellString from "../CellContent/CellString";
import StickyGrid, { ICellClick, ICellRenderer, IColumn, TypeCell } from "../";
import MockItems from "./List_Items";
import MockColumns from "./List_Columns";
import emptyFn from "../../../utils/emptyFn";
import { ISort, ISortOrder } from "../../../interfaces";

const idCustom = "idCustom";
const ColumnsIndex: IColumn[] = [
  {
    type: TypeCell.String,
    id: "index",
    label: "Index",
    width: 60,
    sortable: true,
  },
];
const ColumsCustom: IColumn[] = [
  {
    type: TypeCell.String,
    id: "idStringNoValue",
    label: "String NO_VALUE",
    width: 150,
  },
  {
    type: TypeCell.Bool,
    id: idCustom,
    label: "CUSTOM",
    width: 150,
  },
];
const Columns: IColumn[] = [].concat(ColumnsIndex, MockColumns, ColumsCustom);

const contextmenu: IPopoverListItem[] = [
  {
    id: "font_download",
    label: "font_download",
    onClick: action("font_download"),
    icon: "font_download",
    disabled: true,
  },
  {
    id: "file_copy",
    label: "file_copy",
    onClick: action("file_copy"),
    icon: "file_copy",
  },
  {
    id: "send",
    label: "send",
    onClick: action("send"),
    icon: "send",
  },
  {
    divider: true,
    id: "edit",
    label: "edit",
    onClick: action("edit"),
    icon: "edit",
  },
];
const initialItems = []
  .concat(MockItems, MockItems, MockItems, MockItems, MockItems, MockItems)
  .map((item, index) => ({
    data: { index, ...item },
    id: `_${index}`,
  }));
const defaultSortColumns = [
  {
    id: ColumnsIndex[0].id,
    order: ISortOrder.ASC,
  },
  {
    id: MockColumns[0].id,
    order: ISortOrder.ASC,
  },
  {
    id: MockColumns[1].id,
    order: ISortOrder.ASC,
  },
];

interface IBtnSelection {
  selected: boolean;
  label: string;
  onClick: () => void;
}

const BtnSelection = ({ selected, label, onClick }: IBtnSelection) => {
  return (
    <Btn
      icon={selected ? "check_box" : "check_box_outline_blank"}
      label={label}
      selected={selected}
      onClick={onClick}
    />
  );
};

interface IReducer {
  items: { id: string; data }[];
  itemsSelected: string[];
  itemsHighligh: string[];
  loading: boolean;
  sort: ISort[];
  columnsEnableMultiSort: boolean;
  columnsEnableResize: boolean;
  columnsEnableMove: boolean;
  columnsEnableSticky: boolean;
}
const reducerInit: IReducer = {
  items: initialItems,
  itemsSelected: [],
  itemsHighligh: [],
  loading: false,
  sort: [],
  columnsEnableMultiSort: false,
  columnsEnableResize: true,
  columnsEnableMove: true,
  columnsEnableSticky: true,
};
enum ACTION {
  SELECT = "SELECT",
  SET_LOADING = "SET_LOADING",
  SET_ON_SAVE = "SET_ON_SAVE",
  SET_SORT = "SET_SORT",
  ENABLE_COLUMNS_STICKY = "ENABLE_COLUMNS_STICKY",
  ENABLE_COLUMNS_MULTISORT = "ENABLE_COLUMNS_MULTISORT",
  ENABLE_COLUMNS_MOVE = "ENABLE_COLUMNS_MOVE",
  ENABLE_COLUMNS_RESIZE = "ENABLE_COLUMNS_RESIZE",
}
const reducer = (state: IReducer, action): IReducer => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.SELECT: {
      const { items, itemsSelected } = state;
      const rowIndex: number = action.rowIndex;
      const itemId = items[rowIndex].id;
      const selected = Array.from(itemsSelected);
      const indexToRemove = selected.findIndex((i) => i === itemId);
      if (indexToRemove === -1) {
        selected.push(itemId);
      } else {
        selected.splice(indexToRemove, 1);
      }
      newState.itemsSelected = selected;
      newState.itemsHighligh = [itemId];
      return newState;
    }
    case ACTION.SET_LOADING:
    case ACTION.SET_ON_SAVE:
    case ACTION.SET_SORT:
    case ACTION.ENABLE_COLUMNS_MULTISORT:
    case ACTION.ENABLE_COLUMNS_MOVE:
    case ACTION.ENABLE_COLUMNS_RESIZE:
      return { ...state, ...action };
    default:
      throw new Error();
  }
};

const DemoGrid = () => {
  const [state, dispatch] = React.useReducer(reducer, reducerInit);
  const {
    items,
    itemsHighligh,
    itemsSelected,
    sort,
    columnsEnableMultiSort,
    columnsEnableSticky,
    columnsEnableMove,
    columnsEnableResize,
  } = state;
  const cbOnChangeEnableSticky = React.useCallback(() => {
    dispatch({
      type: ACTION.ENABLE_COLUMNS_STICKY,
      columnsEnableSticky: !columnsEnableSticky,
    });
  }, [columnsEnableSticky]);
  const cbOnChangeEnableMove = React.useCallback(() => {
    dispatch({
      type: ACTION.ENABLE_COLUMNS_MOVE,
      columnsEnableMove: !columnsEnableMove,
    });
  }, [columnsEnableMove]);
  const cbOnChangeEnableResize = React.useCallback(() => {
    dispatch({
      type: ACTION.ENABLE_COLUMNS_RESIZE,
      columnsEnableResize: !columnsEnableResize,
    });
  }, [columnsEnableResize]);

  const cbOnChangeEnableMultiSort = React.useCallback(() => {
    dispatch({
      type: ACTION.ENABLE_COLUMNS_MULTISORT,
      sort: !columnsEnableMultiSort ? defaultSortColumns : [],
      columnsEnableMultiSort: !columnsEnableMultiSort,
    });
  }, [columnsEnableMultiSort]);
  const cbOnColumnsChange = React.useCallback((newStruct) => {
    action("columnsChange")(newStruct);
  }, []);
  const rowOnClickCb = React.useCallback((item) => {
    const { rowIndex, selected } = item;
    dispatch({ type: ACTION.SELECT, rowIndex, selected });
    action("rowOnClick")(item);
  }, []);
  const cbHeaderOnClick = React.useCallback((args) => {
    const applySort = args.length > 0 ? args : defaultSortColumns;
    dispatch({ type: ACTION.SET_SORT, sort: applySort });
    action("onHeaderClick")(args);
  }, []);
  const cbRowOnCopyToClipboard = React.useCallback((p: string) => {
    action("rowOnCopyToClipboard")(p);
  }, []);
  const cbRowOnContextMenu = React.useCallback((p: ICellClick) => {
    action("rowOnContextMenu")(p);
  }, []);
  const cbRenderCellPlaceholder = React.useCallback(
    ({
      style,
      rowIndex,
      columnIndex,
      selected,
      disabled,
      highligh,
    }: ICellRenderer) => {
      return (
        <CellString
          value="No value"
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={{ ...style, position: "absolute" }}
          onClick={rowOnClickCb}
          onContextMenu={cbRowOnContextMenu}
          contextmenu={contextmenu}
        />
      );
    },
    [rowOnClickCb, cbRowOnContextMenu],
  );
  const cbRenderCellContent = React.useCallback(
    ({
      style,
      rowIndex,
      columnIndex,
      selected,
      disabled,
      highligh,
    }: ICellRenderer) => {
      const column = Columns[columnIndex];
      if (column.id !== idCustom) return null;
      return (
        <CellString
          value="MY CUSTOM CELL"
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={{ ...style, position: "absolute" }}
          onClick={rowOnClickCb}
          onContextMenu={cbRowOnContextMenu}
          contextmenu={contextmenu}
        />
      );
    },
    [rowOnClickCb, cbRowOnContextMenu],
  );
  const cbRenderSidebar = React.useCallback(
    ({ rowIndex, selected }: ICellRenderer) => {
      return (
        <Text
          style={{ backgroundColor: selected ? "#fff" : "#f00" }}
          children={`row ${rowIndex}`}
        />
      );
    },
    [],
  );

  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Toolbar>
        <div style={{ flex: 1 }} />
        <BtnSelection
          label="columnsMove"
          selected={columnsEnableMove}
          onClick={cbOnChangeEnableMove}
        />
        <BtnSelection
          label="columnsResize"
          selected={columnsEnableResize}
          onClick={cbOnChangeEnableResize}
        />
        <BtnSelection
          label="columnsMultiSort"
          selected={columnsEnableMultiSort}
          onClick={cbOnChangeEnableMultiSort}
        />
        <BtnSelection
          label="columnsStickyRender"
          selected={columnsEnableSticky}
          onClick={cbOnChangeEnableSticky}
        />
      </Toolbar>
      <Divider />
      <StickyGrid
        renderCellSidebar={(columnsEnableSticky && cbRenderSidebar) || emptyFn}
        renderCellContent={cbRenderCellContent}
        renderCellPlaceholder={cbRenderCellPlaceholder}
        rows={items}
        rowsHighligh={itemsHighligh}
        rowsSelected={itemsSelected}
        columns={Columns}
        onRowClick={rowOnClickCb}
        enabledColumnsMove={columnsEnableMove}
        enabledColumnsResize={columnsEnableResize}
        enabledColumnsMultiSort={columnsEnableMultiSort}
        onColumnsChange={cbOnColumnsChange}
        rowContextmenu={contextmenu}
        onRowCopyToClipboard={cbRowOnCopyToClipboard}
        onHeaderClick={cbHeaderOnClick}
        columnsSort={sort}
        sidebarWidth={50}
      />
    </div>
  );
};
export default DemoGrid;
