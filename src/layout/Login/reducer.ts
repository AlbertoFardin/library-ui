import { FORM, FORM_TITLE, addPathCurrentUrl } from "./utils";
import { isStorybook } from "../../stories/utils";

export enum ACTION {
  WIDTH = "WIDTH",
  SHOW_FORM = "SHOW_FORM",
}

export interface IReducerState {
  width: number;
  form: FORM;
}

export const reducerInitState: IReducerState = {
  width: window.innerWidth,
  form: null,
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.WIDTH:
      newState.width = window.innerWidth;
      return newState;
    case ACTION.SHOW_FORM: {
      const form: FORM = action.value;
      newState.form = form;
      document.title = FORM_TITLE[form];
      if (!isStorybook()) addPathCurrentUrl(form);
      return newState;
    }
    default:
      return newState;
  }
};
