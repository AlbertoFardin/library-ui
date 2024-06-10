import { Initialize } from "../../interfaces";
import { IMngSet, IMngSetPayload, WINDOW_PANELS } from "./interfaces";
import { DRAFT_PAYLOAD } from "./constants";

export enum ACTIONS {
  PANEL_TO_HOME = "PANEL_TO_HOME",
  PANEL_TO_EDITOR = "PANEL_TO_EDITOR",
  PANEL_TO_PUBLIC = "PANEL_TO_PUBLIC",
  EDITOR_DRAFT = "EDITOR_DRAFT",
  INIT_SHARED_LIST_STARTED = "INIT_SHARED_LIST_STARTED",
  INIT_SHARED_LIST_LOADING = "INIT_SHARED_LIST_LOADING",
  INIT_SHARED_LIST_STOPPED = "INIT_SHARED_LIST_STOPPED",
  INIT_SHARED_LIST_BLOCK = "INIT_SHARED_LIST_BLOCK",
  INIT_CREATE_STARTED = "INIT_CREATE_STARTED",
  INIT_CREATE_LOADING = "INIT_CREATE_LOADING",
  INIT_CREATE_STOPPED = "INIT_CREATE_STOPPED",
  INIT_REMOVE_STARTED = "INIT_REMOVE_STARTED",
  INIT_REMOVE_LOADING = "INIT_REMOVE_LOADING",
  INIT_REMOVE_STOPPED = "INIT_REMOVE_STOPPED",
  INIT_UPDATE_LOADING = "INIT_UPDATE_LOADING",
  INIT_UPDATE_STOPPED = "INIT_UPDATE_STOPPED",
  INIT_SHARED_STARTED = "INIT_SHARED_STARTED",
  INIT_SHARED_LOADING = "INIT_SHARED_LOADING",
  INIT_SHARED_STOPPED = "INIT_SHARED_STOPPED",
  INIT_CLONED_STARTED = "INIT_CLONED_STARTED",
  INIT_CLONED_LOADING = "INIT_CLONED_LOADING",
  INIT_CLONED_STOPPED = "INIT_CLONED_STOPPED",
}

interface IReducerState {
  initCreate: Initialize;
  initRemove: Initialize;
  initUpdate: Initialize;
  initShared: Initialize;
  initCloned: Initialize;
  panel: WINDOW_PANELS;
  sharedListInit: Initialize;
  sharedListSets: IMngSet[];
  draftSetId: string;
  draftSetPayload: IMngSetPayload;
  draftNewPayload: boolean;
}

export const reducerInitState: IReducerState = {
  initCreate: Initialize.NONE,
  initRemove: Initialize.NONE,
  initUpdate: Initialize.NONE,
  initShared: Initialize.NONE,
  initCloned: Initialize.NONE,
  panel: WINDOW_PANELS.HOME,
  sharedListInit: Initialize.NONE,
  sharedListSets: [],
  draftSetId: "",
  draftSetPayload: DRAFT_PAYLOAD,
  draftNewPayload: false,
};

const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.PANEL_TO_HOME:
      newState.panel = WINDOW_PANELS.HOME;
      if (newState.draftNewPayload) {
        newState.initUpdate = Initialize.START;
      }
      return newState;
    case ACTIONS.PANEL_TO_EDITOR:
      newState.panel = WINDOW_PANELS.EDITOR;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.PANEL_TO_PUBLIC:
      newState.panel = WINDOW_PANELS.SHARED;
      return newState;
    case ACTIONS.EDITOR_DRAFT:
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      newState.draftNewPayload = true;
      return newState;
    case ACTIONS.INIT_SHARED_LIST_STARTED:
      newState.sharedListInit = Initialize.START;
      return newState;
    case ACTIONS.INIT_SHARED_LIST_LOADING:
      newState.sharedListInit = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_SHARED_LIST_STOPPED:
      newState.sharedListInit = Initialize.SUCC;
      newState.sharedListSets = action.items || reducerInitState.sharedListSets;
      return newState;
    case ACTIONS.INIT_SHARED_LIST_BLOCK:
      newState.sharedListInit = Initialize.FAIL;
      return newState;
    case ACTIONS.INIT_CREATE_STARTED:
      newState.initCreate = Initialize.START;
      newState.draftSetPayload = action.setPayload;
      newState.panel = WINDOW_PANELS.HOME;
      return newState;
    case ACTIONS.INIT_CREATE_LOADING:
      newState.initCreate = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_CREATE_STOPPED: {
      newState.initCreate = Initialize.NONE;
      if (!action.setPayload.label.includes("(import) ")) {
        newState.draftSetId = action.setId;
        newState.draftSetPayload = action.setPayload;
        newState.panel = WINDOW_PANELS.EDITOR;
      } else {
        newState.draftSetId = reducerInitState.draftSetId;
        newState.draftSetPayload = reducerInitState.draftSetPayload;
      }
      return newState;
    }
    case ACTIONS.INIT_REMOVE_STARTED:
      newState.initRemove = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_REMOVE_LOADING:
      newState.initRemove = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_REMOVE_STOPPED:
      newState.initRemove = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    case ACTIONS.INIT_UPDATE_LOADING:
      newState.initUpdate = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_UPDATE_STOPPED:
      newState.initUpdate = Initialize.NONE;
      return newState;
    case ACTIONS.INIT_SHARED_STARTED:
      newState.initShared = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_SHARED_LOADING:
      newState.initShared = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_SHARED_STOPPED: {
      newState.initShared = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;

      const set: IMngSet = action.set;
      const newSharedSets: IMngSet[] = Array.from(newState.sharedListSets);
      const indexToRemove = newSharedSets.findIndex((i) => i.id === set.id);
      if (indexToRemove === -1) {
        newSharedSets.push(set);
      } else {
        newSharedSets.splice(indexToRemove, 1);
      }
      newState.sharedListSets = newSharedSets;

      return newState;
    }
    case ACTIONS.INIT_CLONED_STARTED:
      newState.initCloned = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_CLONED_LOADING:
      newState.initCloned = Initialize.LOADING;
      return newState;
    case ACTIONS.INIT_CLONED_STOPPED:
      newState.initCloned = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
