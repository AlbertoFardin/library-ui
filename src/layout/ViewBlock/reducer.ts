export enum ACTIONS {
  RESET = "RESET",
  RESIZE = "RESIZE",
  SCROLL = "SCROLL",
  KEYRENDER = "KEYRENDER",
  CONTEXTMENU_CLOSE = "CONTEXTMENU_CLOSE",
  CONTEXTMENU_OPEN_VIEW = "CONTEXTMENU_OPEN_VIEW",
  CONTEXTMENU_OPEN_ITEM = "CONTEXTMENU_OPEN_ITEM",
}

export interface IReducerState {
  keyRender: string;
  resizing: boolean;
  scrolled: boolean;
  columnCount: number;
  contextmenuOpen: boolean;
  contextmenuCoor: number[];
}

export const reducerInitState: IReducerState = {
  keyRender: "",
  resizing: false,
  scrolled: false,
  columnCount: 0,
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
      newState.scrolled = !!action.scrollTop;
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
    case ACTIONS.RESIZE:
      newState.columnCount = action.columnCount;
      return newState;
    case ACTIONS.RESET:
      return reducerInitState;
    default:
      return newState;
  }
};
