import { Initialize, ISort, ShareType } from "../../interfaces";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";
import { getSetsResized } from "../StickyGrid/statics";

export enum ACTION {
  MODAL_SORTS_ERROR = "WINDOW_SORTS_ERROR",
  INIT_COLUMNS_LOADING = "INIT_COLUMNS_LOADING",
  INIT_COLUMNS_STOPPED = "INIT_COLUMNS_STOPPED",
  WINDOWMNGSETS_OPENED = "WINDOWMNGSETS_OPENED",
  GRID_ON_RESIZING = "GRID_ON_RESIZING",
  GRID_ON_RESIZE_END = "GRID_ON_RESIZE_END",
  GRID_ON_MOVE = "GRID_ON_MOVE",
  GRID_ON_SORT = "GRID_ON_SORT",
  GRID_ON_REMOVE = "GRID_ON_REMOVE",
}

export interface IReducerState {
  windowSortsError: boolean;
  mngOpen: boolean;
  resizeColumnIndex: number;
  resizeColumnWidth: number;
  draftSetInit: Initialize;
  draftSetData: {
    id: string;
    payload: IMngSetPayload;
    shareType: ShareType;
  };
}
export const reducerInit: IReducerState = {
  windowSortsError: false,
  mngOpen: false,
  resizeColumnIndex: null,
  resizeColumnWidth: null,
  draftSetInit: Initialize.NONE,
  draftSetData: undefined,
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.MODAL_SORTS_ERROR:
      newState.windowSortsError = !newState.windowSortsError;
      return newState;
    case ACTION.WINDOWMNGSETS_OPENED:
      newState.mngOpen = !newState.mngOpen;
      return newState;
    case ACTION.GRID_ON_RESIZING: {
      const columnWidth: number = action.columnWidth;
      const columnIndex: number = action.columnIndex;
      newState.resizeColumnIndex = columnIndex;
      newState.resizeColumnWidth = columnWidth;
      return newState;
    }
    case ACTION.GRID_ON_RESIZE_END: {
      const mngSets: IMngSet[] = action.mngSets;
      const mngSetsSlcId: string = action.mngSetsSlcId;
      const columnSize: number = action.columnSize;
      const columnIndex: number = action.columnIndex;
      const { setId, setPayload, setShareType } = getSetsResized({
        selectedId: mngSetsSlcId,
        sets: mngSets,
        columnSize,
        columnIndex,
      });
      newState.draftSetInit = Initialize.START;
      newState.draftSetData = {
        id: setId,
        payload: setPayload,
        shareType: setShareType,
      };
      return newState;
    }
    case ACTION.GRID_ON_SORT: {
      const mngSets: IMngSet[] = action.mngSets;
      const mngSetsSlcId: string = action.mngSetsSlcId;
      const newSort: ISort[] = action.sort;
      const set = mngSets.find((s) => s.id === mngSetsSlcId);
      const setPayload: IMngSetPayload = {
        ...set.payload,
        itemsSort: newSort,
      };
      newState.draftSetInit = Initialize.START;
      newState.draftSetData = {
        id: mngSetsSlcId,
        payload: setPayload,
        shareType: set.shareType,
      };
      return newState;
    }
    case ACTION.GRID_ON_MOVE: {
      const mngSets: IMngSet[] = action.mngSets;
      const mngSetsSlcId: string = action.mngSetsSlcId;
      const dragColId: string = action.dragColId;
      const dropColId: string = action.dropColId;
      const set = mngSets.find((s) => s.id === mngSetsSlcId);
      const setPayload: IMngSetPayload = {
        ...set.payload,
        items: set.payload.items.reduce((acc, curr) => {
          switch (curr.id) {
            case dragColId: {
              return acc;
            }
            case dropColId: {
              const dragCol = set.payload.items.find(
                (el) => el.id === dragColId,
              );
              acc.push(dragCol);
              acc.push(curr);
              return acc;
            }
            default: {
              acc.push(curr);
              return acc;
            }
          }
        }, []),
      };
      newState.draftSetInit = Initialize.START;
      newState.draftSetData = {
        id: mngSetsSlcId,
        payload: setPayload,
        shareType: set.shareType,
      };
      return newState;
    }
    case ACTION.GRID_ON_REMOVE: {
      const mngSets: IMngSet[] = action.mngSets;
      const mngSetsSlcId: string = action.mngSetsSlcId;
      const colId: string = action.colId;
      const set = mngSets.find((s) => s.id === mngSetsSlcId);
      const setPayload: IMngSetPayload = {
        ...set.payload,

        items: set.payload.items.filter((i) => i.id !== colId),
      };
      newState.draftSetInit = Initialize.START;
      newState.draftSetData = {
        id: mngSetsSlcId,
        payload: setPayload,
        shareType:
          set.shareType === ShareType.SHARE_UPD
            ? ShareType.SHARE_OBS
            : set.shareType,
      };
      return newState;
    }
    case ACTION.INIT_COLUMNS_LOADING:
      newState.draftSetInit = Initialize.WAIT;
      return newState;
    case ACTION.INIT_COLUMNS_STOPPED:
      newState.draftSetInit = reducerInit.draftSetInit;
      newState.draftSetData = reducerInit.draftSetData;
      newState.resizeColumnIndex = reducerInit.resizeColumnIndex;
      newState.resizeColumnWidth = reducerInit.resizeColumnWidth;
      return newState;
    default:
      throw new Error();
  }
};
