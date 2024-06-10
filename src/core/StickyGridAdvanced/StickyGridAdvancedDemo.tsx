import * as React from "react";
import Text from "../Text";
import Divider from "../Divider";
import Toolbar from "../Toolbar";
import { action } from "@storybook/addon-actions";
import { IPopoverListItem } from "../PopoverList";
import Btn from "../Btn";
import CellString from "../StickyGrid/CellContent/CellString";
import StickyGridAdvanced from "./StickyGridAdvanced";
import MockItems from "../StickyGrid/__stories__/List_Items";
import MockColumns from "../StickyGrid/__stories__/List_Columns";
import isEmpty from "lodash-es/isEmpty";
import emptyFn from "../../utils/emptyFn";
import { ICellClick, ICellRenderer, IColumn, TypeCell } from "../StickyGrid";
import { ISort, ISortOrder } from "../../interfaces";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";
import Placeholder from "../Placeholder";
import { v4 as uuidv4 } from "uuid";

const onError = (msg: string) => {
  console.log("onErrors: ", msg);
};
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

const dColumnsSets: IMngSet[] = [
  {
    id: "1",
    ownerId: "updatedBy",
    updated: 0,
    created: 0,
    payload: {
      label: "Default Set",
      items: Columns.map(({ id, width }) => ({ id, width })),
    },
  },
  {
    id: "2",
    ownerId: "updatedBy",
    updated: 0,
    created: 0,
    payload: {
      label: "Onle column",
      items: [{ id: Columns[0].id }],
    },
  },
  {
    id: "3",
    ownerId: "updatedBy",
    updated: 0,
    created: 0,
    payload: {
      label: "EMPTY SET",
      items: [],
    },
  },
];

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

const itemsDataMock = [].concat(
  MockItems,
  MockItems,
  MockItems,
  MockItems,
  MockItems,
  MockItems,
);

const initialItems = itemsDataMock.map((item, index) => ({
  data: { ...item, index },
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

const onSharedSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onSharedSet")(c);
  console.log("onSharedSet", c);
};
const onRemoveSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onRemoveSet")(c);
  console.log("onRemoveSet", c);
};
const onUpdateSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onUpdateSet")(c);
  console.log("onUpdateSet", c);
};
const onCreateSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<IMngSet> => {
  const c = { context, setId, setPayload };
  action("onCreateSet")(c);
  console.log("onCreateSet", c);
  return {
    id: uuidv4(),
    payload: setPayload,
    ownerId: "user_id1",
    updated: new Date().getTime(),
    created: 1688714709199,
  };
};
const columnsSetsGetShared = async (context: string): Promise<IMngSet[]> => {
  action("columnsSetsGetShared")({ context });
  return [
    {
      id: "shared_1",
      ownerId: "sh",
      updated: 0,
      created: 0,
      payload: {
        label: "miooo",
        items: [{ id: Columns[0].id }],
      },
    },
  ];
};

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
  columnsSets: IMngSet[];
  columnsSetsTemp: IMngSet[];
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
  loading: true,
  columnsSets: dColumnsSets,
  columnsSetsTemp: dColumnsSets,
  sort: [],
  columnsEnableMultiSort: false,
  columnsEnableResize: true,
  columnsEnableMove: true,
  columnsEnableSticky: true,
};
enum ACTION {
  SELECT = "SELECT",
  SET_LOADING = "SET_LOADING",
  SET_CONF_OPEN = "SET_CONF_OPEN",
  SET_ON_SAVE = "SET_ON_SAVE",
  SET_SORT = "SET_SORT",
  ENABLE_COLUMNS_MULTISORT = "SET_ENABLE_COLUMNS_MULTISORT",
  ENABLE_COLUMNS_MOVE = "SET_ENABLE_COLUMNS_MOVE",
  ENABLE_COLUMNS_RESIZE = "SET_ENABLE_COLUMNS_RESIZE",
  ADD_ITEMS = "ADD_ITEMS",
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
    case ACTION.ADD_ITEMS: {
      const { items } = state;
      const lengthItems = items.length;
      newState.items = items.concat(
        itemsDataMock.map((item, index) => ({
          data: { ...item },
          id: `_${index + lengthItems}`,
          index: index + lengthItems,
        })),
      );
      return newState;
    }
    case ACTION.SET_LOADING:
    case ACTION.SET_CONF_OPEN:
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

interface IDemoAdvancedGrid {
  demoContentEmpty?: boolean;
  demoContentOverride?: boolean;
  demoContentLoading?: boolean;
  demoContentError?: boolean;
}
const DemoAdvancedGrid = ({
  demoContentEmpty,
  demoContentOverride,
  demoContentLoading,
  demoContentError,
}: IDemoAdvancedGrid) => {
  const [state, dispatch] = React.useReducer(reducer, reducerInit);
  const {
    items,
    itemsSelected,
    itemsHighligh,
    loading,
    columnsSets,
    columnsSetsTemp,
    sort,
    columnsEnableMultiSort,
    columnsEnableSticky,
    columnsEnableMove,
    columnsEnableResize,
  } = state;

  const cbOnChangeEnableSticky = React.useCallback(() => {
    dispatch({
      type: ACTION.ENABLE_COLUMNS_MULTISORT,
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
  const columnsSetsOnChanged = React.useCallback(
    (context: string, selectedId: string, sets: IMngSet[]) => {
      const c = {
        context,
        selectedId,
        sets,
      };
      action("columnsSetsOnChanged")(c);
      console.log("columnsSetsOnChanged", c);
    },
    [],
  );

  const rowOnClickCb = React.useCallback((item) => {
    const { rowIndex } = item;
    dispatch({ type: ACTION.SELECT, rowIndex });
    action("rowOnClick")(item);
  }, []);
  const cbHeaderOnClick = React.useCallback((sort) => {
    dispatch({ type: ACTION.SET_SORT, sort });
    action("onHeaderClick")(sort);
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
          style={style}
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
          style={style}
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
          style={selected ? { color: "#fff" } : { backgroundColor: "#f00" }}
          children={`row ${rowIndex}`}
        />
      );
    },
    [],
  );
  const onClickLoad12Row = React.useCallback(() => {
    dispatch({ type: ACTION.ADD_ITEMS });
  }, []);

  React.useEffect(() => {
    if (!isEmpty(columnsSetsTemp)) {
      dispatch({ type: ACTION.SET_LOADING, loading: true });
      setTimeout(() => {
        // simulate BE fetch
        dispatch({
          type: ACTION.SET_ON_SAVE,
          columnsSetsTemp: [],
          columnsSets: columnsSetsTemp,
          loading: false,
        });
      }, 1000);
    }
  }, [columnsSetsTemp]);

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
        <Btn
          label={"load12Row"}
          selected={false}
          color={"red"}
          variant={"bold"}
          onClick={onClickLoad12Row}
        />
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
      <StickyGridAdvanced
        rootLoading={demoContentLoading || (!demoContentEmpty && loading)}
        rootError={demoContentError}
        rows={demoContentEmpty ? [] : items}
        rowsSelected={itemsSelected}
        rowsDisabled={["_0", "_1"]}
        rowsHighligh={itemsHighligh}
        columns={Columns}
        onRowClick={rowOnClickCb}
        onHeaderClick={cbHeaderOnClick}
        columnsSort={sort}
        columnsSortMax={5}
        enabledColumnsMove={columnsEnableMove}
        enabledColumnsResize={columnsEnableResize}
        enabledColumnsMultiSort={columnsEnableMultiSort}
        columnsSets={columnsSets}
        columnsSetsOwnerId="user_id1"
        columnsSetsContext="contextsets"
        columnsSetsSelectedId={dColumnsSets[0].id}
        columnsSetsOnSharedSet={onSharedSet}
        columnsSetsOnRemoveSet={onRemoveSet}
        columnsSetsOnCreateSet={onCreateSet}
        columnsSetsOnUpdateSet={onUpdateSet}
        columnsSetsOnChanged={columnsSetsOnChanged}
        columnsSetsGetShared={columnsSetsGetShared}
        onRowCopyToClipboard={cbRowOnCopyToClipboard}
        rowContextmenu={contextmenu}
        onRowContextMenu={cbRowOnContextMenu}
        renderCellSidebar={(columnsEnableSticky && cbRenderSidebar) || emptyFn}
        renderCellContent={cbRenderCellContent}
        renderCellPlaceholder={cbRenderCellPlaceholder}
        overrideCellMap={{
          "1Lorem": { tooltip: "see prop mapError", label: "love🥰" },
        }}
        overrideContent={
          !demoContentOverride ? undefined : (
            <Placeholder
              icon="directions_bike"
              iconStyle={{ color: "#00f" }}
              label="overrideContent"
              labelStyle={{ color: "#00f" }}
              background
            />
          )
        }
        onError={onError}
      />
    </div>
  );
};
export default DemoAdvancedGrid;
