interface IPreviewRender {
  src: string;
  srcLoaded: boolean;
  onLoadSucc: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  onLoadFail: (
    event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>,
  ) => void;
  mousehover: boolean;
  size: number;
  objectFit: "contain" | "cover" | "fill";
}

export default IPreviewRender;
