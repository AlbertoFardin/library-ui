import { IAnnotation } from "./interfaces";

export const draftId = undefined;

export enum ACTION {
  IMAGE_INIT = "IMAGE_INIT",
  IMAGE_SIZE = "IMAGE_SIZE",
  MOUSEHOVER = "MOUSEHOVER",
  ANNOTATION_CLOSE = "ANNOTATION_CLOSE",
  ANNOTATION_DEFAULT = "ANNOTATION_DEFAULT",
  ANNOTATION = "ANNOTATION",
}

interface IReducer {
  annotationOpen: boolean;
  annotationValue: IAnnotation | null;
  annotationDefault: IAnnotation | null;
  mousehoverId: string;
  writing: boolean;
  imageWidth: number;
  imageHeight: number;
  imageLoading: boolean;
}

export const reducerInitState: IReducer = {
  annotationOpen: false,
  annotationValue: null,
  annotationDefault: null,
  mousehoverId: "",
  writing: false,
  imageWidth: 0,
  imageHeight: 0,
  imageLoading: true,
};

export const reducer = (state: IReducer, action): IReducer => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION.IMAGE_INIT:
      return reducerInitState;
    case ACTION.IMAGE_SIZE:
      newState.imageLoading = false;
      newState.imageWidth = action.w;
      newState.imageHeight = action.h;
      return newState;
    case ACTION.MOUSEHOVER:
      newState.mousehoverId = action.id;
      return newState;
    case ACTION.ANNOTATION_CLOSE:
      newState.annotationOpen = false;
      newState.writing = reducerInitState.writing;
      newState.annotationValue = reducerInitState.annotationDefault;
      return newState;
    case ACTION.ANNOTATION_DEFAULT:
      newState.annotationDefault = action.value;
      return newState;
    case ACTION.ANNOTATION:
      newState.annotationValue = action.value || newState.annotationDefault;
      newState.writing = !!action.writing;
      if (action.open) {
        newState.annotationOpen = true;
      }
      return newState;
    default:
      return newState;
  }
};
