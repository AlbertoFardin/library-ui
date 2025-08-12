import { Initialize } from "../../../interfaces";
import { ISignUp, ITermsOfService } from "../utils";

export enum ACTION {
  CONFIRM_START = "CONFIRM_START",
  CONFIRM_WAIT = "CONFIRM_WAIT",
  CONFIRM_FAIL = "CONFIRM_FAIL",
  CONFIRM_SUCC = "CONFIRM_SUCC",
  TERMSSERVICE = "GET_TERMSSERVICE",
  SET_INPUT = "SET_INPUT",
  SET_BOOL_PRIVACY = "SET_BOOL_PRIVACY",
  SET_BOOL_ADTERMS = "SET_BOOL_ADTERMS",
}

export interface IReducerState {
  errors: string[];
  initConfirm: Initialize;
  initTermsservice: Initialize;
  termsservice: ITermsOfService;
  userdata: ISignUp;
}

export const reducerInitState: IReducerState = {
  errors: [],
  initConfirm: Initialize.NONE,
  initTermsservice: Initialize.START,
  termsservice: null,
  userdata: {
    email: "",
    firstName: "",
    lastName: "",
    acceptPrivacyTermsOfService: false,
    acceptAdditionalTermsOfService: {},
  },
};

export type ReducerAction =
  | { type: ACTION.CONFIRM_START }
  | { type: ACTION.CONFIRM_WAIT }
  | { type: ACTION.CONFIRM_SUCC }
  | { type: ACTION.CONFIRM_FAIL; errors: string[] }
  | { type: ACTION.TERMSSERVICE; value: ITermsOfService }
  | { type: ACTION.SET_INPUT; id: string; value: string }
  | { type: ACTION.SET_BOOL_ADTERMS; id: string; value: boolean }
  | { type: ACTION.SET_BOOL_PRIVACY; value: boolean };

export const reducer = (
  state: IReducerState,
  action: ReducerAction,
): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.CONFIRM_START:
      newState.initConfirm = Initialize.START;
      newState.errors = reducerInitState.errors;
      return newState;
    case ACTION.CONFIRM_WAIT:
      newState.initConfirm = Initialize.WAIT;
      return newState;
    case ACTION.CONFIRM_FAIL:
      newState.initConfirm = Initialize.FAIL;
      newState.errors = action.errors;
      return newState;
    case ACTION.CONFIRM_SUCC:
      newState.initConfirm = Initialize.SUCC;
      return newState;
    case ACTION.TERMSSERVICE: {
      const ts = action.value;
      newState.initTermsservice = Initialize.SUCC;
      if (ts) {
        newState.termsservice = ts;
        newState.userdata = {
          ...newState.userdata,
          acceptAdditionalTermsOfService: Object.keys(
            ts.additionalTermsOfService,
          ).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
        };
      } else {
        newState.termsservice = reducerInitState.termsservice;
      }
      return newState;
    }
    case ACTION.SET_INPUT:
      newState.userdata = {
        ...newState.userdata,
        [action.id]: action.value,
      };
      newState.initConfirm = Initialize.NONE;
      return newState;
    case ACTION.SET_BOOL_ADTERMS:
      newState.userdata = {
        ...newState.userdata,
        acceptAdditionalTermsOfService: {
          ...newState.userdata.acceptAdditionalTermsOfService,
          [action.id]: action.value,
        },
      };
      newState.initConfirm = Initialize.NONE;
      return newState;
    case ACTION.SET_BOOL_PRIVACY:
      newState.userdata = {
        ...newState.userdata,
        acceptPrivacyTermsOfService: action.value,
      };
      newState.initConfirm = Initialize.NONE;
      return newState;
    default:
      return newState;
  }
};
