import { Initialize } from "../../interfaces";
import { IMngLevel, IMngSetPayload, WINDOW_PANELS } from "./interfaces";
import { DRAFT_PAYLOAD } from "./constants";

export enum ACTIONS {
  RESET = "RESET",
  PANEL_TO_HOME = "PANEL_TO_HOME",
  PANEL_TO_EDITOR = "PANEL_TO_EDITOR",
  PANEL_TO_SHARED = "PANEL_TO_SHARED",
  PANEL_TO_LEVELS = "PANEL_TO_LEVELS",
  DRAFT_EDITOR = "DRAFT_EDITOR",
  DRAFT_LEVELS = "DRAFT_LEVELS",
  INITIALIZE = "INITIALIZE",
  INIT_CREATE_STARTED = "INIT_CREATE_STARTED",
  INIT_CREATE_LOADING = "INIT_CREATE_LOADING",
  INIT_CREATE_STOPPED = "INIT_CREATE_STOPPED",
  INIT_REMOVE_STARTED = "INIT_REMOVE_STARTED",
  INIT_REMOVE_LOADING = "INIT_REMOVE_LOADING",
  INIT_REMOVE_STOPPED = "INIT_REMOVE_STOPPED",
  INIT_UPDATE_STARTED = "INIT_UPDATE_STARTED",
  INIT_UPDATE_LOADING = "INIT_UPDATE_LOADING",
  INIT_UPDATE_STOPPED = "INIT_UPDATE_STOPPED",
  INIT_SHARED_UPSERT_STARTED = "INIT_SHARED_UPSERT_STARTED",
  INIT_SHARED_UPSERT_LOADING = "INIT_SHARED_UPSERT_LOADING",
  INIT_SHARED_UPSERT_STOPPED = "INIT_SHARED_UPSERT_STOPPED",
  INIT_SHARED_DELETE_STARTED = "INIT_SHARED_DELETE_STARTED",
  INIT_SHARED_DELETE_LOADING = "INIT_SHARED_DELETE_LOADING",
  INIT_SHARED_DELETE_STOPPED = "INIT_SHARED_DELETE_STOPPED",
  INIT_LEVELS_STARTED = "INIT_LEVELS_STARTED",
  INIT_LEVELS_LOADING = "INIT_LEVELS_LOADING",
  INIT_LEVELS_STOPPED = "INIT_LEVELS_STOPPED",
}

interface IReducerState {
  initialize: Initialize;
  initCreate: Initialize;
  initRemove: Initialize;
  initUpdate: Initialize;
  initSharedUpsert: Initialize;
  initSharedDelete: Initialize;
  initLevels: Initialize;
  panel: WINDOW_PANELS;
  levelsListItems: IMngLevel[];
  draftSetId: string;
  draftSetPayload: IMngSetPayload;
  needSaveEditor: boolean;
  needSaveLevels: boolean;
}

export const reducerInitState: IReducerState = {
  initialize: Initialize.WAIT,
  initCreate: Initialize.NONE,
  initRemove: Initialize.NONE,
  initUpdate: Initialize.NONE,
  initSharedUpsert: Initialize.NONE,
  initSharedDelete: Initialize.NONE,
  initLevels: Initialize.NONE,
  panel: WINDOW_PANELS.HOME,
  levelsListItems: [],
  draftSetId: "",
  draftSetPayload: DRAFT_PAYLOAD,
  needSaveEditor: false,
  needSaveLevels: false,
};

const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.RESET:
      return reducerInitState;
    case ACTIONS.PANEL_TO_HOME:
      newState.panel = WINDOW_PANELS.HOME;
      return newState;
    case ACTIONS.PANEL_TO_EDITOR:
      newState.panel = WINDOW_PANELS.EDITOR;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.PANEL_TO_SHARED:
      newState.panel = WINDOW_PANELS.SHARED;
      return newState;
    case ACTIONS.PANEL_TO_LEVELS:
      newState.panel = WINDOW_PANELS.LEVELS;
      return newState;
    case ACTIONS.DRAFT_EDITOR:
      newState.needSaveEditor = true;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.DRAFT_LEVELS:
      newState.needSaveLevels = true;
      newState.levelsListItems = action.levels;
      if (action.fetchs) {
        newState.needSaveLevels = false;
        newState.initLevels = Initialize.START;
      }
      return newState;
    case ACTIONS.INITIALIZE:
      newState.levelsListItems = action.levelsListItems;
      newState.initialize = Initialize.SUCC;
      return newState;
    case ACTIONS.INIT_CREATE_STARTED:
      newState.initCreate = Initialize.START;
      newState.draftSetPayload = action.setPayload;
      newState.panel = WINDOW_PANELS.HOME;
      return newState;
    case ACTIONS.INIT_CREATE_LOADING:
      newState.initCreate = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_CREATE_STOPPED: {
      const setId: string = action.setId;
      const setPayload: IMngSetPayload = action.setPayload;
      newState.initCreate = Initialize.NONE;
      if (setPayload.items.length === 0) {
        newState.draftSetId = setId;
        newState.draftSetPayload = setPayload;
        newState.panel = WINDOW_PANELS.EDITOR;
      }
      return newState;
    }
    case ACTIONS.INIT_REMOVE_STARTED:
      newState.initRemove = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_REMOVE_LOADING:
      newState.initRemove = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_REMOVE_STOPPED:
      newState.initRemove = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    case ACTIONS.INIT_UPDATE_STARTED:
      newState.needSaveEditor = false;
      newState.initUpdate = Initialize.START;
      return newState;
    case ACTIONS.INIT_UPDATE_LOADING:
      newState.initUpdate = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_UPDATE_STOPPED:
      newState.initUpdate = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    case ACTIONS.INIT_LEVELS_STARTED:
      newState.needSaveLevels = false;
      newState.initLevels = Initialize.START;
      return newState;
    case ACTIONS.INIT_LEVELS_LOADING:
      newState.initLevels = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_LEVELS_STOPPED:
      newState.initLevels = Initialize.NONE;
      return newState;
    case ACTIONS.INIT_SHARED_UPSERT_STARTED:
      newState.initSharedUpsert = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_SHARED_UPSERT_LOADING:
      newState.initSharedUpsert = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_SHARED_UPSERT_STOPPED:
      newState.initSharedUpsert = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    case ACTIONS.INIT_SHARED_DELETE_STARTED:
      newState.initSharedDelete = Initialize.START;
      newState.draftSetId = action.setId;
      newState.draftSetPayload = action.setPayload;
      return newState;
    case ACTIONS.INIT_SHARED_DELETE_LOADING:
      newState.initSharedDelete = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_SHARED_DELETE_STOPPED:
      newState.initSharedDelete = Initialize.NONE;
      newState.draftSetId = reducerInitState.draftSetId;
      newState.draftSetPayload = reducerInitState.draftSetPayload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
