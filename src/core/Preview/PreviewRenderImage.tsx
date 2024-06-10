import * as React from "react";
import { createUseStyles } from "react-jss";
import IPreviewRender from "./IPreviewRender";
import classnames from "classnames";

const useStyles = createUseStyles({
  src: {
    objectFit: "contain",
    width: "100%",
    height: "auto",
  },
  mousehover: {
    transform: "scale(1.10)",
  },
});

const PreviewRenderImage = ({
  onLoadSucc,
  onLoadFail,
  srcUrl,
  mousehover,
}: IPreviewRender) => {
  const classes = useStyles({});
  return (
    <img
      src={srcUrl}
      alt=""
      className={classnames({
        [classes.src]: true,
        [classes.mousehover]: mousehover,
      })}
      onLoad={onLoadSucc}
      onError={onLoadFail}
    />
  );
};

export default PreviewRenderImage;
