import { Initialize } from "../../interfaces";
import { getSrcUrlBase } from "../../utils/getSrcUrlBase";

const RETRY_MAX = 12;

export const inLoaded = (s: IReducerState): boolean => {
  const inits = [s.zoomSourceInit, s.zoomRenderInit];
  const set = new Set([Initialize.START, Initialize.WAIT]);
  return inits.some((i) => set.has(i));
};
export const inFailed = (s: IReducerState): boolean => {
  const inits = [s.zoomSourceInit, s.zoomRenderInit];
  return inits.some((i) => i === Initialize.FAIL);
};

export enum ACTION {
  CHANGE = "CHANGE",
  NO_SRC = "NO_SRC",
  RESET = "RESET",
  FAILED = "FAILED",
  SOURCE_LOADING = "SOURCE_LOADING",
  SOURCE_SUCC = "SOURCE_SUCC",
  RENDER_LOADING = "RENDER_LOADING",
  RENDER_SUCC = "RENDER_SUCC",
}
export interface IReducerState {
  zoomSourceInit: Initialize;
  zoomRenderInit: Initialize;
  srcStored: string;
  retry: number;
  error: string;
  tiles: string;
}
export const reducerInitState: IReducerState = {
  zoomSourceInit: Initialize.NONE,
  zoomRenderInit: Initialize.NONE,
  srcStored: "",
  retry: 1,
  error: "",
  tiles: "",
};
export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.RESET:
      return reducerInitState;
    case ACTION.CHANGE:
      return {
        ...reducerInitState,
        srcStored: action.value,
        zoomSourceInit: Initialize.START,
      };
    case ACTION.SOURCE_SUCC:
      newState.zoomSourceInit = Initialize.SUCC;
      newState.tiles = action.value;
      newState.zoomRenderInit = Initialize.START;
      return newState;
    case ACTION.RENDER_SUCC:
      newState.zoomRenderInit = Initialize.SUCC;
      return newState;
    case ACTION.SOURCE_LOADING:
      newState.zoomSourceInit = Initialize.WAIT;
      return newState;
    case ACTION.SOURCE_LOADING:
      newState.zoomRenderInit = Initialize.WAIT;
      return newState;
    case ACTION.NO_SRC:
      return {
        ...reducerInitState,
        zoomSourceInit: Initialize.FAIL,
        zoomRenderInit: Initialize.FAIL,
        error: "No src found",
      };
    case ACTION.FAILED: {
      const key: string = action.key;
      const src: string = action.src;
      const error: string = action.error;

      const srcStored = getSrcUrlBase(newState.srcStored);
      const srcPassed = getSrcUrlBase(src);

      // questo evento può essere scatenato più da tiles differenti che falliscono il load
      if (inFailed(newState)) return state;

      // questo evento può essere scatenato da tiles ritardatarie della precedente img
      if (srcStored != srcPassed) return state;

      if (newState.retry < RETRY_MAX) {
        newState[key] = Initialize.START;
        newState.retry = newState.retry + 1;
      } else {
        newState.zoomSourceInit = Initialize.FAIL;
        newState.zoomRenderInit = Initialize.FAIL;
        newState.error = error;
      }
      return newState;
    }
    default:
      return state;
  }
};
