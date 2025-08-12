import { createUseStyles } from "react-jss";
import classnames from "classnames";
import IPreviewRender from "./IPreviewRender";

interface IStyles {
  objectFit: "contain" | "cover" | "fill";
}
const useStyles = createUseStyles({
  src: {
    transition: "none", // di default <img> ha la transizione
    objectFit: ({ objectFit }: IStyles) => objectFit,
    width: "100%",
    height: "auto",
  },
  mousehover: {
    transform: "scale(1.10)",
  },
});

const PreviewRenderImage = ({
  src,
  onLoadSucc,
  onLoadFail,
  mousehover,
  objectFit,
}: IPreviewRender) => {
  const classes = useStyles({ objectFit });
  return (
    <img
      src={src}
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
