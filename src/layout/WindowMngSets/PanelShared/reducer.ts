import { Initialize } from "../../../interfaces";
import { IMngSet } from "../interfaces";

export enum InputType {
  LABEL = "LABEL",
  OWNER = "OWNER",
}
export enum ACTIONS {
  INIT_STARTED = "INIT_STARTED",
  INIT_LOADING = "INIT_LOADING",
  INIT_STOPPED = "INIT_STOPPED",
  INPUT_TYPE = "INPUT_TYPE",
  INPUT_VALUE = "INPUT_VALUE",
  INPUT_FOCUS = "INPUT_FOCUS",
}

interface IReducerState {
  init: Initialize;
  sets: IMngSet[];
  inputType: InputType;
  inputValue: string;
  inputFocus: boolean;
}

export const reducerInitState: IReducerState = {
  init: Initialize.NONE,
  sets: [],
  inputType: InputType.LABEL,
  inputValue: "",
  inputFocus: false,
};

const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.INIT_STARTED:
      newState.init = Initialize.START;
      return newState;
    case ACTIONS.INIT_LOADING:
      newState.init = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_STOPPED:
      newState.init = Initialize.NONE;
      newState.sets = action.sets;
      return newState;
    case ACTIONS.INPUT_TYPE:
      newState.inputType = action.value;
      return newState;
    case ACTIONS.INPUT_VALUE:
      newState.inputValue = action.value;
      return newState;
    case ACTIONS.INPUT_FOCUS:
      newState.inputFocus = action.value;
      return newState;
    default:
      return state;
  }
};

export default reducer;
