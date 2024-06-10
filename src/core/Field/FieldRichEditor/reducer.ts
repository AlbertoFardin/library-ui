import { RICHEDITOR_EMPTY_TAG } from "../../EditorWysiwyg";

export enum ACTIONS {
  RESET = "RESET",
  MOUSE_HOVER = "MOUSE_HOVER",
  MOUSE_LEAVE = "MOUSE_LEAVE",
  MODAL_OPEN = "MODAL_OPEN",
  MODAL_CLOSE = "MODAL_CLOSE",
  DRAFT_CHANGE = "DRAFT_CHANGE",
}

export interface IReducerState {
  inputHover: boolean;
  modalOpen: boolean;
  modalDraft: string;
}

export const reducerInitState: IReducerState = {
  inputHover: false,
  modalOpen: false,
  modalDraft: RICHEDITOR_EMPTY_TAG,
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
      newState.modalDraft = action.value;
      return newState;
    case ACTIONS.MODAL_CLOSE:
      newState.modalOpen = reducerInitState.modalOpen;
      newState.modalDraft = reducerInitState.modalDraft;
      return newState;
    case ACTIONS.DRAFT_CHANGE:
      newState.modalDraft = action.value;
      return newState;
    case ACTIONS.RESET:
      return reducerInitState;
    default:
      return newState;
  }
};
