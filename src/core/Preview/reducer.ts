import { Initialize } from "../../interfaces";

export enum ACTION {
  RESET = "RESET",
  INIT_START = "INIT_START",
  INIT_SUCC = "INIT_SUCC",
  INIT_FAIL = "INIT_FAIL",
}
export interface IReducerState {
  initialize: Initialize;
  loadRetry: boolean;
  loadCount: number;
}
export const reducerInitState: IReducerState = {
  initialize: Initialize.NONE,
  loadRetry: false,
  loadCount: 1,
};
export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.RESET:
      return reducerInitState;
    case ACTION.INIT_START:
      newState.initialize = Initialize.START;
      return newState;
    case ACTION.INIT_FAIL:
      newState.initialize = Initialize.FAIL;
      if (action.retry) {
        newState.loadCount = newState.loadCount + 1;
        newState.loadRetry = action.retry;
      }
      return newState;
    case ACTION.INIT_SUCC:
      newState.initialize = Initialize.SUCC;
      return newState;
    default:
      return state;
  }
};
