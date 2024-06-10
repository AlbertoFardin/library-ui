import * as React from "react";
import { createUseStyles } from "react-jss";
import hexToRgbA from "../../utils/hexToRgbA";
import { getTheme } from "../../theme";
import classnames from "classnames";

interface IStyles {
  color1: string;
  color2: string;
}
const useStyles = createUseStyles({
  background: {
    flex: 1,
    margin: 0,
    padding: 0,
    height: "inherit",
    width: "inherit",
    position: "relative",
    background: ({ color1, color2 }: IStyles) =>
      `linear-gradient(to right, ` +
      `${hexToRgbA(color1)} 0%, ${hexToRgbA(color2)} 100%)`,
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  },
});

export interface IBackground {
  color1?: string;
  color2?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | React.ReactNode;
}
const Background = React.forwardRef(
  (props: IBackground, ref: React.Ref<HTMLDivElement>) => {
    const { style, className, color1, color2, children } = props;
    const theme = getTheme();
    const classes = useStyles({
      color1: color1 || theme.colors.theme1,
      color2: color2 || theme.colors.theme2,
    });

    return (
      <div
        ref={ref}
        style={style}
        className={classnames({
          [classes.background]: true,
          [className]: !!className,
        })}
        children={children}
      />
    );
  },
);

Background.displayName = "Background";
export default Background;
