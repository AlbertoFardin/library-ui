import { Initialize } from "../../../interfaces";
import { IPwdPolicy } from "../utils/validatePassword";

const initPwdPolicy: IPwdPolicy = {
  minimumLength: 0,
  maximumLength: null,
  requireLowercase: false,
  requireUppercase: false,
  requireNumbers: false,
  requireSymbols: false,
};

export enum ACTION {
  INIT_CONFIRM_START = "INIT_CONFIRM_START",
  INIT_CONFIRM_LOADING = "INIT_CONFIRM_LOADING",
  INIT_CONFIRM_FAIL = "INIT_CONFIRM_FAIL",
  INIT_CONFIRM_SUCC = "INIT_CONFIRM_SUCC",
  INIT_REQUIRE_LOADING = "INIT_REQUIRE_LOADING",
  INIT_REQUIRE_FAIL = "INIT_REQUIRE_FAIL",
  INIT_REQUIRE_SUCC = "INIT_REQUIRE_SUCC",
  EDITING_PWD = "EDITING_PWD",
  EDITING_CONFIRM_PWD = "EDITING_CONFIRM_PWD",
}

export interface IReducerState {
  errors: string[];
  initConfirm: Initialize;
  initRequire: Initialize;
  passwordOne: string;
  passwordTwo: string;
  pwdPolicy: IPwdPolicy;
  validPasswordOne: boolean;
}

export const reducerInitState: IReducerState = {
  errors: [],
  initConfirm: Initialize.NONE,
  initRequire: Initialize.START,
  passwordOne: "",
  passwordTwo: "",
  pwdPolicy: initPwdPolicy,
  validPasswordOne: false,
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.INIT_CONFIRM_START:
      newState.initConfirm = Initialize.START;
      newState.errors = reducerInitState.errors;
      return newState;
    case ACTION.INIT_CONFIRM_LOADING:
      newState.initConfirm = Initialize.WAIT;
      return newState;
    case ACTION.INIT_CONFIRM_FAIL:
      newState.initConfirm = Initialize.FAIL;
      newState.errors = action.errors;
      return newState;
    case ACTION.INIT_CONFIRM_SUCC:
      newState.initConfirm = Initialize.SUCC;
      return newState;
    case ACTION.INIT_REQUIRE_LOADING:
      newState.initRequire = Initialize.WAIT;
      return newState;
    case ACTION.INIT_REQUIRE_FAIL:
      newState.initRequire = Initialize.FAIL;
      newState.errors = action.errors;
      return newState;
    case ACTION.INIT_REQUIRE_SUCC:
      newState.initRequire = Initialize.SUCC;
      newState.pwdPolicy = action.pwdPolicy;
      return newState;
    case ACTION.EDITING_PWD:
      newState.passwordOne = action.value;
      newState.validPasswordOne = action.valid;
      return newState;
    case ACTION.EDITING_CONFIRM_PWD:
      newState.passwordTwo = action.value;
      return newState;
    default:
      return newState;
  }
};
