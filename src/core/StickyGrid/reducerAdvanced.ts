import { Initialize } from "../../interfaces";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";
import { getSetsResized } from "./statics";

export enum ACTION {
  MODAL_SORTS_ERROR = "WINDOW_SORTS_ERROR",
  INIT_COLUMNS_LOADING = "INIT_COLUMNS_LOADING",
  INIT_COLUMNS_STOPPED = "INIT_COLUMNS_STOPPED",
  WINDOWMNGSETS_UPDATE = "WINDOWMNGSETS_UPDATE",
  WINDOWMNGSETS_OPENED = "WINDOWMNGSETS_OPENED",
  MNG_SLC_ID = "MNG_SLC_ID",
  GRID_ON_RESIZING = "GRID_ON_RESIZING",
  GRID_ON_RESIZE_END = "GRID_ON_RESIZE_END",
  GRID_ON_MOVE = "GRID_ON_MOVE",
  GRID_ON_REMOVE = "GRID_ON_REMOVE",
}

export interface IReducerState {
  windowSortsError: boolean;
  mngOpen: boolean;
  mngSets: IMngSet[];
  mngSetsSlcId: string;
  draftSetInit: Initialize;
  draftSetId: string;
  draftSetPayload: IMngSetPayload;
}
export const reducerInit: IReducerState = {
  windowSortsError: false,
  mngOpen: false,
  mngSets: [],
  mngSetsSlcId: "",
  draftSetInit: Initialize.NONE,
  draftSetId: undefined,
  draftSetPayload: undefined,
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.MODAL_SORTS_ERROR:
      newState.mngOpen = !newState.windowSortsError;
      return newState;
    case ACTION.WINDOWMNGSETS_OPENED:
      newState.mngOpen = !newState.mngOpen;
      return newState;
    case ACTION.WINDOWMNGSETS_UPDATE:
      newState.mngSets = action.sets;
      return newState;
    case ACTION.MNG_SLC_ID:
      newState.mngSetsSlcId = action.id;
      return newState;
    case ACTION.GRID_ON_RESIZING: {
      const columnSize: number = action.columnSize;
      const columnIndex: number = action.columnIndex;
      const { sets } = getSetsResized({
        selectedId: newState.mngSetsSlcId,
        sets: newState.mngSets,
        columnSize,
        columnIndex,
      });
      newState.mngSets = sets;
      return newState;
    }
    case ACTION.GRID_ON_RESIZE_END: {
      const columnSize: number = action.columnSize;
      const columnIndex: number = action.columnIndex;
      const { sets, setId, setPayload } = getSetsResized({
        selectedId: newState.mngSetsSlcId,
        sets: newState.mngSets,
        columnSize,
        columnIndex,
      });
      newState.mngSets = sets;
      newState.draftSetInit = Initialize.START;
      newState.draftSetId = setId;
      newState.draftSetPayload = setPayload;
      return newState;
    }
    case ACTION.GRID_ON_MOVE: {
      const dragColId: string = action.dragColId;
      const dropColId: string = action.dropColId;
      const setId: string = newState.mngSetsSlcId;
      let setPayload: IMngSetPayload = undefined;
      const sets = newState.mngSets.map((s) => {
        if (s.id !== setId) return s;

        setPayload = {
          ...s.payload,
          items: s.payload.items.reduce((acc, curr) => {
            switch (curr.id) {
              case dragColId: {
                return acc;
              }
              case dropColId: {
                const dragCol = s.payload.items.find(
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
        return {
          ...s,
          payload: setPayload,
        };
      });
      newState.mngSets = sets;
      newState.draftSetInit = Initialize.START;
      newState.draftSetId = setId;
      newState.draftSetPayload = setPayload;
      return newState;
    }
    case ACTION.GRID_ON_REMOVE: {
      const colId: string = action.colId;
      const setId: string = newState.mngSetsSlcId;
      let setPayload: IMngSetPayload = undefined;
      const sets: IMngSet[] = newState.mngSets.map((s) => {
        if (s.id !== setId) return s;

        setPayload = {
          ...s.payload,
          items: s.payload.items.filter((i) => i.id !== colId),
        };

        return {
          ...s,
          payload: setPayload,
        };
      });
      newState.mngSets = sets;
      newState.draftSetInit = Initialize.START;
      newState.draftSetId = setId;
      newState.draftSetPayload = setPayload;
      return newState;
    }
    case ACTION.INIT_COLUMNS_LOADING:
      newState.draftSetInit = Initialize.LOADING;
      return newState;
    case ACTION.INIT_COLUMNS_STOPPED:
      newState.draftSetInit = reducerInit.draftSetInit;
      newState.draftSetId = reducerInit.draftSetId;
      newState.draftSetPayload = reducerInit.draftSetPayload;
      return newState;
    default:
      throw new Error();
  }
};
