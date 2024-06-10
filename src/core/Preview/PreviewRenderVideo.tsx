import * as React from "react";
import { createUseStyles } from "react-jss";
import IPreviewRender from "./IPreviewRender";
import { Initialize } from "../../interfaces";
import Icon from "../Icon";
import classnames from "classnames";

const useStyles = createUseStyles({
  src: {
    "object-fit": "contain",
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
    "border-radius": 1000,
    "z-index": 1,
    "background-color": "rgba(0,0,0,0.5)",
    height: "fit-content",
    width: "fit-content",
    "text-align": "center",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "& > *": {
      color: "#fff",
      "font-size": "200%",
      padding: "10px",
    },
  },
});

const PreviewRenderVideo = ({
  initialize,
  onLoadSucc,
  onLoadFail,
  srcUrl,
  mousehover,
}: IPreviewRender) => {
  const classes = useStyles({});
  const videoRef = React.useRef(null);
  const srcLoaded = initialize === Initialize.SUCC;

  React.useEffect(() => {
    if (!!videoRef && !!videoRef.current) {
      if (mousehover && srcLoaded) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
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
        src={srcUrl}
        muted
        loop
        controls={false}
        onLoadedData={onLoadSucc}
        onError={onLoadFail}
      />
      {srcLoaded && !mousehover ? (
        <div
          className={classes.videoplayer}
          children={<Icon children="play_arrow" />}
        />
      ) : null}
    </>
  );
};

export default PreviewRenderVideo;
