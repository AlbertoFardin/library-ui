import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";

const getPosition = (p: "right" | "left" | "top" | "bottom") => {
  switch (p) {
    case "right":
      return { top: 0, right: 0 };
    case "left":
      return { top: 0, left: 0 };
    case "top":
      return { top: 0, left: 0 };
    case "bottom":
      return { bottom: 0, left: 0 };
    default:
      return { top: 0, left: 0 };
  }
};

const GRADIENT = {
  right: "left",
  left: "right",
  top: "bottom",
  bottom: "top",
};

interface IStyles {
  position: "right" | "left" | "top" | "bottom";
  shadow: boolean;
  border: boolean;
}
const useStyles = createUseStyles({
  borderShadow: {
    zIndex: 1,
    position: "absolute",
    height: ({ position }: IStyles) =>
      new Set(["top", "bottom"]).has(position) ? 10 : "100%",
    width: ({ position }: IStyles) =>
      new Set(["right", "left"]).has(position) ? 10 : "100%",
    background: ({ position, shadow, border }: IStyles) => {
      const b = border ? 1 : 0;
      const base = `linear-gradient(to ${GRADIENT[position]},`;
      const isDark = getTheme().colors.isDark;
      const c = isDark ? "250,250,250" : "0,0,0";
      if (!shadow) {
        return (
          base +
          `${getTheme().colors.grayBorder} ${b}px, rgba(0, 0, 0, 0) ${b}px)`
        );
      }
      return (
        base +
        `rgba(${c}, 0.1) 0px, rgba(${c}, 0.1) ${b}px, rgba(${c}, 0.05) ${b}px, rgba(${c}, 0) 100%)`
      );
    },
  },
});

export interface IBorderShadow {
  className?: string;
  style?: React.CSSProperties;
  position: "right" | "left" | "top" | "bottom";
  shadow?: boolean;
  border?: boolean;
  open?: boolean;
}

const BorderShadow = ({
  className,
  style,
  position,
  shadow = true,
  border = true,
  open = true,
}: IBorderShadow) => {
  const classes = useStyles({ position, shadow, border });
  if (!open) return null;
  return (
    <div
      style={{ ...getPosition(position), ...style }}
      className={classnames({
        [classes.borderShadow]: true,
        [className]: !!className,
      })}
    />
  );
};

export default BorderShadow;
