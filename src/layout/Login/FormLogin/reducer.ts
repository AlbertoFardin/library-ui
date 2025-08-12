import { Initialize } from "../../../interfaces";

export enum ACTION {
  INIT_START = "INIT_START",
  INIT_LOADING = "INIT_LOADING",
  INIT_FAIL = "INIT_FAIL",
  TENANT = "TENANT",
  USERNAME = "USERNAME",
  PASSWORD = "PASSWORD",
}

export interface IReducerState {
  errors: string[];
  init: Initialize;
  tenantId: string;
  username: string;
  password: string;
}

export const reducerInitState: IReducerState = {
  errors: [],
  init: Initialize.NONE,
  tenantId: "",
  username: "",
  password: "",
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.INIT_START:
      newState.init = Initialize.START;
      newState.errors = reducerInitState.errors;
      return newState;
    case ACTION.INIT_LOADING:
      newState.init = Initialize.WAIT;
      return newState;
    case ACTION.INIT_FAIL:
      newState.init = Initialize.FAIL;
      newState.errors = action.errors;
      return newState;
    case ACTION.TENANT:
      newState.tenantId = action.value;
      newState.init = Initialize.NONE;
      return newState;
    case ACTION.USERNAME:
      newState.username = action.value;
      newState.init = Initialize.NONE;
      return newState;
    case ACTION.PASSWORD:
      newState.password = action.value;
      newState.init = Initialize.NONE;
      return newState;
    default:
      return newState;
  }
};
