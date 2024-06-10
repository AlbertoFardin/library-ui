import { Initialize } from "../../interfaces";

interface IPreviewRender {
  initialize: Initialize;
  onLoadSucc: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  onLoadFail: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  srcUrl: string;
  mousehover: boolean;
}

export default IPreviewRender;
