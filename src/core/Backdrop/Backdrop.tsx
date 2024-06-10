import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Portal from "../Portal";
import hexToRgbA from "../../utils/hexToRgbA";

const useStyle = createUseStyles({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    userSelect: "none",
    backgroundColor: hexToRgbA("#000000", 0.6),
  },
  backdropInvisible: {
    backgroundColor: "transparent",
  },
});

export interface IBackdrop {
  className?: string;
  style?: React.CSSProperties;
  open?: boolean;
  invisible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const Backdrop = ({
  className,
  style,
  open,
  invisible,
  onClick,
}: IBackdrop) => {
  const classes = useStyle({});
  const cbClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
    },
    [onClick],
  );

  if (!open) return null;

  return (
    <Portal>
      <div
        role="presentation"
        style={style}
        className={classnames({
          [classes.backdrop]: true,
          [classes.backdropInvisible]: invisible,
          [className]: !!className,
        })}
        onClick={cbClick}
        onContextMenu={cbClick}
      />
    </Portal>
  );
};
export default Backdrop;
