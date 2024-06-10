import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";

interface IStyles {
  size: number;
  radius: number;
  color: string;
}
const useStyles = createUseStyles({
  paperfold: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: getTheme().colors.background,
    transition: "border-width 250ms",
    borderWidth: 0,
    borderStyle: "solid",
  },
  anchorTopLeft: {
    top: 0,
    left: 0,
    borderTopColor: "transparent",
    borderRightColor: ({ color }: IStyles) => color,
    borderBottomColor: ({ color }: IStyles) => color,
    borderLeftColor: "transparent",
    borderTopLeftRadius: ({ radius }: IStyles) => radius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: ({ radius }: IStyles) => radius,
    borderBottomLeftRadius: 0,
    boxShadow: "4px 4px 5px 0 rgba(0, 0, 0, 0.2)",
  },
  anchorTopRight: {
    top: 0,
    right: 0,
    borderRopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: ({ color }: IStyles) => color,
    borderLeftColor: ({ color }: IStyles) => color,
    borderTopLeftRadius: 0,
    borderTopRightRadius: ({ radius }: IStyles) => radius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: ({ radius }: IStyles) => radius,
    boxShadow: "-4px 4px 5px 0 rgba(0, 0, 0, 0.2)",
  },
  anchorBotLeft: {
    bottom: 0,
    left: 0,
    borderTopColor: ({ color }: IStyles) => color,
    borderRightColor: ({ color }: IStyles) => color,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderTopLeftRadius: 0,
    borderTopRightRadius: ({ radius }: IStyles) => radius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: ({ radius }: IStyles) => radius,
    boxShadow: "4px -4px 5px 0 rgba(0, 0, 0, 0.2)",
  },
  anchorBotRight: {
    bottom: 0,
    right: 0,
    borderTopColor: ({ color }: IStyles) => color,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: ({ color }: IStyles) => color,
    borderTopLeftRadius: ({ radius }: IStyles) => radius,
    "borderBop-rightRadius": 0,
    borderBottomRightRadius: ({ radius }: IStyles) => radius,
    borderBottomLeftRadius: 0,
    boxShadow: "-4px -4px 5px 0 rgba(0, 0, 0, 0.2)",
  },
  open: {
    borderWidth: ({ size }: IStyles) => size,
  },
});

export interface ICardFold {
  style?: React.CSSProperties;
  className?: string;
  anchorY?: "top" | "bottom";
  anchorX?: "left" | "right";
  color?: string;
  open?: boolean;
  size: number;
  radius?: number;
}
const CardFold = ({
  className,
  style,
  anchorY = "top",
  anchorX = "left",
  color = getTheme().colors.grayBorder,
  open,
  size,
  radius,
}: ICardFold) => {
  const classes = useStyles({
    size,
    radius: radius || size - 3,
    color,
  });
  return (
    <div
      style={style}
      className={classnames({
        [className]: !!className,
        [classes.paperfold]: true,
        [classes.open]: open,
        [classes.anchorTopLeft]: anchorY === "top" && anchorX === "left",
        [classes.anchorTopRight]: anchorY === "top" && anchorX === "right",
        [classes.anchorBotLeft]: anchorY === "bottom" && anchorX === "left",
        [classes.anchorBotRight]: anchorY === "bottom" && anchorX === "right",
      })}
    />
  );
};

export default CardFold;
