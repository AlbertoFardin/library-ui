import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import IPreviewRender from "./IPreviewRender";
import Icon from "../Icon";

const useStyles = createUseStyles({
  src: {
    objectFit: "contain",
    width: "100%",
    height: "auto",
  },
  mousehover: {
    transform: "scale(1.10)",
  },
  videoplayer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    borderRadius: 1000,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "fit-content",
    width: "fit-content",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const PreviewRenderVideo = ({
  src,
  srcLoaded,
  onLoadSucc,
  onLoadFail,
  mousehover,
  size,
}: IPreviewRender) => {
  const classes = useStyles({});
  const videoRef = React.useRef(null);
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

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (mousehover && srcLoaded) {
        // al mousehover parte il video
        video.play();
      } else {
        // al mouseleave il video si resetta
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [mousehover, srcLoaded]);

  return (
    <>
      <video
        ref={videoRef}
        className={classnames({
          [classes.src]: true,
          [classes.mousehover]: mousehover,
        })}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        onLoadedData={onLoadSucc}
        onError={onLoadFail}
      />
      {srcLoaded && !mousehover ? (
        <div
          className={classes.videoplayer}
          children={
            <Icon
              style={{
                fontSize: Math.min(50, size / 4),
                color: "#fff",
                padding: 5,
              }}
              children="play_arrow"
            />
          }
        />
      ) : null}
    </>
  );
};

export default PreviewRenderVideo;
