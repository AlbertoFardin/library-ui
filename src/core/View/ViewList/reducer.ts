import { getColumnsShow } from "./utils";

export enum ACTIONS {
  "RESET" = "RESET",
  "RESIZE" = "RESIZE",
  "SCROLL" = "SCROLL",
  "KEYRENDER" = "KEYRENDER",
  "CONTEXTMENU_CLOSE" = "CONTEXTMENU_CLOSE",
  "CONTEXTMENU_OPEN_VIEW" = "CONTEXTMENU_OPEN_VIEW",
  "CONTEXTMENU_OPEN_ITEM" = "CONTEXTMENU_OPEN_ITEM",
}

export interface IReducerState {
  keyRender: string;
  resizing: boolean;
  scrolled: boolean;
  columnsShow: boolean[];
  contextmenuOpen: boolean;
  contextmenuCoor: number[];
}

export const reducerInitState: IReducerState = {
  keyRender: "",
  resizing: false,
  scrolled: false,
  columnsShow: [],
  contextmenuOpen: false,
  contextmenuCoor: [0, 0],
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.KEYRENDER:
      newState.keyRender = action.value;
      newState.scrolled = reducerInitState.scrolled;
      return newState;
    case ACTIONS.SCROLL:
      newState.scrolled = action.value;
      return newState;
    case ACTIONS.CONTEXTMENU_OPEN_VIEW:
      newState.contextmenuOpen = true;
      newState.contextmenuCoor = [action.clientX, action.clientY];
      return newState;
    case ACTIONS.CONTEXTMENU_OPEN_ITEM:
      newState.contextmenuCoor = [action.clientX, action.clientY];
      return newState;
    case ACTIONS.CONTEXTMENU_CLOSE:
      newState.contextmenuOpen = reducerInitState.contextmenuOpen;
      newState.contextmenuCoor = reducerInitState.contextmenuCoor;
      return newState;
    case ACTIONS.RESIZE: {
      const { height, width, columns } = action;
      newState.resizing = true;
      if (!!height && !!width) {
        newState.columnsShow = getColumnsShow(columns, width);
        newState.resizing = false;
      }
      return newState;
    }
    case ACTIONS.RESET:
      return reducerInitState;
    default:
      return newState;
  }
};
