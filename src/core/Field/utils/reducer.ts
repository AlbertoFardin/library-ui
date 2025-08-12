export enum ACTIONS {
  MOUSE_HOVER = "MOUSE_HOVER",
  MOUSE_LEAVE = "MOUSE_LEAVE",
  MODAL_OPEN = "MODAL_OPEN",
  MODAL_CLOSE = "MODAL_CLOSE",
}

export interface IReducerState {
  inputHover: boolean;
  modalOpen: boolean;
}

export const initReducerState: IReducerState = {
  inputHover: false,
  modalOpen: false,
};

export const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.MOUSE_HOVER:
      newState.inputHover = true;
      return newState;
    case ACTIONS.MOUSE_LEAVE:
      newState.inputHover = false;
      return newState;
    case ACTIONS.MODAL_OPEN:
      newState.modalOpen = true;
      return newState;
    case ACTIONS.MODAL_CLOSE:
      newState.modalOpen = false;
      return newState;
    default:
      return newState;
  }
};
