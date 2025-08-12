import * as React from "react";
import { action } from "@storybook/addon-actions";
import isEmpty from "lodash-es/isEmpty";
import { v4 as uuidv4 } from "uuid";
import Text from "../../core/Text";
import Divider from "../../core/Divider";
import Toolbar from "../../core/Toolbar";
import { IPopoverListItem } from "../../core/PopoverList";
import Btn from "../../core/Btn";
import CellString from "../StickyGrid/CellContent/CellString";
import StickyGridAdvanced from "./StickyGridAdvanced";
import MockItems from "../StickyGrid/__stories__/List_Items";
import MockColumns from "../StickyGrid/__stories__/List_Columns";
import { ICellClick, ICellRenderer, IColumn, TypeCell } from "../StickyGrid";
import { ISort, ISortOrder } from "../../interfaces";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";
import Placeholder from "../../core/Placeholder";

const DELAY = 1000;
const onError = (msg: string) => {
  console.log("onErrors: ", msg);
};
const onSharedDelete = async (...c): Promise<void> => {
  action("SHARE_delete")(c);
  console.log("SHARE_delete", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
const onSharedUpsert = async (...c): Promise<void> => {
  action("SHARE_upsert")(c);
  console.log("SHARE_upsert", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
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
    version: 0,
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
    version: 0,
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
    version: 0,
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

const itemsDataMock = [].concat(MockItems);

const initialItems = itemsDataMock.map((item, index) => ({
  data: { ...item, index },
  id: `_${index}`,
}));

const columnsSetsOnCreateSet = async (
  context: string,
  setPayload: IMngSetPayload,
): Promise<IMngSet> => {
  const c = { context, setPayload };
  action("onCreateSet")(c);
  console.log("onCreateSet", c);
  return {
    id: uuidv4(),
    payload: setPayload,
    ownerId: "user_id1",
    version: 0,
    updated: new Date().getTime(),
    created: new Date().getTime(),
  };
};
const columnsSetsOnRemoveSet = async (
  context: string,
  setId: string,
): Promise<void> => {
  const c = { context, setId };
  action("onRemoveSet")(c);
  console.log("onRemoveSet", c);
};
const columnsSetsOnUpdateSet = async (
  context: string,
  set: IMngSet,
): Promise<IMngSet> => {
  const c = { context, set };
  action("onUpdateSet")(c);
  console.log("onUpdateSet", c);
  const newSet: IMngSet = {
    ...set,
    updated: new Date().getTime(),
  };
  return newSet;
};
const columnsSetsEnableShared = true;
const columnsSetsGetItemsShared = async (
  context: string,
): Promise<IMngSet[]> => {
  action("columnsSetsGetShared")({ context });
  return [
    {
      id: "shared_1",
      ownerId: "sh",
      version: 0,
      updated: 0,
      created: 0,
      payload: {
        label: "miooo",
        items: [{ id: Columns[0].id }],
      },
    },
  ];
};

interface IReducer {
  items: { id: string; data }[];
  itemsSelected: string[];
  itemsHighligh: string[];
  loading: boolean;
  columnsSetSlcId: string;
  columnsSets: IMngSet[];
  columnsSetsTemp: IMngSet[];
  resetScrollbar: number;
}
const reducerInit: IReducer = {
  items: initialItems,
  itemsSelected: [],
  itemsHighligh: [],
  loading: true,
  columnsSetSlcId: "",
  columnsSets: dColumnsSets,
  columnsSetsTemp: dColumnsSets,
  resetScrollbar: new Date().getTime(),
};
enum ACTION {
  SELECT = "SELECT",
  SET_LOADING = "SET_LOADING",
  SET_CONF_OPEN = "SET_CONF_OPEN",
  SET_ON_SAVE = "SET_ON_SAVE",
  ADD_ITEMS = "ADD_ITEMS",
  SETS_CHANGE = "SETS_CHANGE",
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
      newState.resetScrollbar = new Date().getTime();
      return newState;
    }
    case ACTION.SETS_CHANGE:
      newState.columnsSetSlcId = action.slcId;
      newState.columnsSets = action.sets;
      return newState;
    case ACTION.SET_LOADING:
    case ACTION.SET_CONF_OPEN:
    case ACTION.SET_ON_SAVE:
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
    columnsSetSlcId,
    columnsSets,
    columnsSetsTemp,
    resetScrollbar,
  } = state;

  const setItemsSort: { id: string; order: ISortOrder }[] =
    columnsSets?.find((s) => s.id === columnsSetSlcId)?.payload?.itemsSort ||
    [];
  const sort: ISort[] = setItemsSort.map(({ id, order }) => {
    const column = Columns.find((c) => c.id === id);
    const s: ISort = {
      id,
      order,
      label: column.label,
    };
    return s;
  });
  const columnsSetsOnChanged = React.useCallback(
    (context: string, slcId: string, sets: IMngSet[]) => {
      const c = {
        context,
        slcId,
        sets,
      };
      action("columnsSetsOnChanged")(c);
      console.log("columnsSetsOnChanged", c);
      dispatch({
        type: ACTION.SETS_CHANGE,
        slcId,
        sets,
      });
    },
    [],
  );

  const rowOnClickCb = React.useCallback((item) => {
    const { rowIndex } = item;
    dispatch({ type: ACTION.SELECT, rowIndex });
    action("rowOnClick")(item);
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
          style={{ backgroundColor: selected ? "#fff" : "#f00" }}
          children={`row ${rowIndex}`}
        />
      );
    },
    [],
  );
  const onAddRows = React.useCallback(async () => {
    // si qui lancio 3 dispatch solo perché sono pigro e non voglio sistemare la demo
    dispatch({ type: ACTION.SET_LOADING, loading: true });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({ type: ACTION.ADD_ITEMS });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch({ type: ACTION.SET_LOADING, loading: false });
  }, []);

  React.useEffect(() => {
    if (!isEmpty(columnsSetsTemp)) {
      dispatch({ type: ACTION.SET_LOADING, loading: true });
      setTimeout(() => {
        // simulate BE fetch
        dispatch({
          type: ACTION.SET_ON_SAVE,
          columnsSetSlcId: columnsSetsTemp[0].id,
          columnsSetsTemp: [],
          columnsSets: columnsSetsTemp,
          loading: false,
        });
      }, DELAY);
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
          icon="add"
          label="Add Silent Rows"
          color="#f00"
          variant="outlined"
          onClick={onAddRows}
        />
      </Toolbar>
      <Divider />
      <StickyGridAdvanced
        rootLoading={demoContentLoading || (!demoContentEmpty && loading)}
        rootError={demoContentError}
        rows={demoContentEmpty ? [] : items}
        rowsSelected={itemsSelected}
        rowsHighligh={itemsHighligh}
        columns={Columns}
        onRowClick={rowOnClickCb}
        columnsSort={sort}
        columnsSortMax={5}
        enabledColumnsMove={true}
        enabledColumnsResize={true}
        enabledColumnsMultiSort={true}
        enabledColumnsRemove={true}
        columnsSets={columnsSets}
        columnsSetsOwnerId="user_id1"
        columnsSetsContext="contextsets"
        columnsSetsSelectedId={columnsSetSlcId}
        columnsSetsOnRemoveSet={columnsSetsOnRemoveSet}
        columnsSetsOnCreateSet={columnsSetsOnCreateSet}
        columnsSetsOnUpdateSet={columnsSetsOnUpdateSet}
        columnsSetsOnChanged={columnsSetsOnChanged}
        columnsSetsOnSharedUpsert={onSharedUpsert}
        columnsSetsOnSharedDelete={onSharedDelete}
        columnsSetsGetItemsShared={columnsSetsGetItemsShared}
        columnsSetsEnableShared={columnsSetsEnableShared}
        onRowCopyToClipboard={cbRowOnCopyToClipboard}
        rowContextmenu={contextmenu}
        onRowContextMenu={cbRowOnContextMenu}
        renderCellSidebar={cbRenderSidebar}
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
        resetScrollbar={resetScrollbar}
      />
    </div>
  );
};
export default DemoAdvancedGrid;
