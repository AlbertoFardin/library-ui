import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import useMediaLoader from "../../utils/useMediaLoader";
import { Initialize } from "../../interfaces";
import Placeholder from "../Placeholder";
import { getTheme } from "../../theme";
import { getPreviewBackgroundColor } from "../Preview";

const useStyles = createUseStyles({
  preview: {
    position: "relative",
    flex: 1,
    display: "flex",
    alignItems: "stretch",
    alignSelf: "normal",
    overflow: "hidden",
  },
  video: {
    height: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    userSelect: "none",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  },
});

export interface IViewerVideo {
  src: string;
  previewClassName?: string;
  videoClassName?: string;
}

const ViewerVideo = ({
  src: srcUrl,
  previewClassName,
  videoClassName,
}: IViewerVideo) => {
  const classes = useStyles({});
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const { src, initialize, handleLoadSucc, handleLoadFail } = useMediaLoader({
    srcUrl,
  });

  React.useEffect(() => {
    const video = videoRef.current;
    if (video && src) {
      // fix per dispositivi iOS Mobile che non caricano il primo frame del video
      // play&stop per forzare il download e visualizzazione del frame.

      // LINK https://developer.chrome.com/blog/play-request-was-interrupted?hl=it
      // Show loading animation.
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            // Auto-play was prevented
            // Show paused UI.
            // console.log("video error", error);
          });
      }
    }
  }, [src]);

  return (
    <div
      className={classnames({
        [classes.preview]: true,
        [previewClassName]: !!previewClassName,
      })}
    >
      <Placeholder
        open={
          initialize === Initialize.NONE ||
          initialize === Initialize.START ||
          initialize === Initialize.WAIT
        }
        spinnerColor={getTheme().colors.typography}
        spinner
        background
        backgroundColor={getPreviewBackgroundColor()}
      />
      <video
        ref={videoRef}
        className={classnames({
          [classes.video]: true,
          [videoClassName]: !!videoClassName,
        })}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        controls={
          initialize === Initialize.FAIL || initialize === Initialize.SUCC
        }
        onLoadedData={handleLoadSucc}
        onError={handleLoadFail}
      />
    </div>
  );
};

export default ViewerVideo;
