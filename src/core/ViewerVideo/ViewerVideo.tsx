import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  preview: {
    position: "relative",
    flex: 1,
    display: "flex",
    "align-items": "stretch",
    overflow: "hidden",
  },
  video: {
    height: "100%",
    "max-height": "100%",
    "max-width": "100%",
    "user-select": "none",
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
}

const ViewerVideo = ({ src }: IViewerVideo) => {
  const classes = useStyles({});
  const [loaded, setLoaded] = React.useState(false);
  const onLoaded = React.useCallback(() => setLoaded(true), []);

  React.useEffect(() => {
    if (src) setLoaded(false);
  }, [src]);

  return (
    <div className={classes.preview}>
      <video
        className={classes.video}
        src={src}
        muted
        loop
        controls={loaded}
        onLoadedData={onLoaded}
        onError={onLoaded}
      />
    </div>
  );
};

export default ViewerVideo;
