import { Initialize } from "../../interfaces";
import { getSrcUrlBase } from "../getSrcUrlBase";

export enum ACTION {
  CHANGE_SRC = "CHANGE_SRC",
  SIGNED_SRC = "SIGNED_SRC",
  ERROR_MISSING_SRC = "ERROR_MISSING_SRC",
  ERROR_INVALID_TYPE = "ERROR_INVALID_TYPE",
  LOAD_SUCC = "LOAD_SUCC",
  LOAD_FAIL = "LOAD_FAIL",
  LOAD_RETRY = "LOAD_RETRY",
}

export interface IReducerState {
  initialize: Initialize;
  srcInit: string; // initial src url used to compare "sameSrc" in ACTION.CHANGE_SRC
  src: string; // firmed src url used to components
  retry: number;
}

type IReducerAction =
  | { type: ACTION.CHANGE_SRC; src: string }
  | { type: ACTION.SIGNED_SRC; src: string }
  | { type: ACTION.ERROR_MISSING_SRC }
  | { type: ACTION.ERROR_INVALID_TYPE }
  | { type: ACTION.LOAD_FAIL; retryMax: number }
  | { type: ACTION.LOAD_SUCC };

export const reducerInitState: IReducerState = {
  initialize: Initialize.NONE,
  srcInit: "",
  src: "",
  retry: 1,
};

export const reducer = (
  state: IReducerState,
  action: IReducerAction,
): IReducerState => {
  switch (action.type) {
    case ACTION.ERROR_INVALID_TYPE:
    case ACTION.ERROR_MISSING_SRC:
      return {
        ...reducerInitState,
        initialize: Initialize.FAIL,
      };
    case ACTION.CHANGE_SRC: {
      const baseSrcOld = getSrcUrlBase(state.srcInit);
      const baseSrcNew = getSrcUrlBase(action.src);
      const sameSrc = baseSrcOld === baseSrcNew;
      // src can change for some properties of the query string
      // in that case signed src is the same
      // so if the media is visible (Initialize.SUCC) is useless re-signed src
      if (state.initialize === Initialize.SUCC && sameSrc) {
        return state;
      }
      return {
        ...state,
        initialize: Initialize.WAIT,
        retry: reducerInitState.retry,
        srcInit: action.src,
      };
    }
    case ACTION.SIGNED_SRC:
      return {
        ...state,
        src: action.src,
      };
    case ACTION.LOAD_FAIL:
      if (state.retry < action.retryMax) {
        return {
          ...state,
          initialize: Initialize.WAIT,
          retry: state.retry + 1,
        };
      }
      return {
        ...state,
        initialize: Initialize.FAIL,
      };
    case ACTION.LOAD_SUCC:
      return {
        ...state,
        initialize: Initialize.SUCC,
      };
    default:
      return state;
  }
};
