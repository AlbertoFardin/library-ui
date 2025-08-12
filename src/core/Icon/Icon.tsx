import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";
import wardaIconsFont from "./WardaDesignIcons.woff2";
interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  "@font-face": {
    fontFamily: "WardaDesignIcons",
    fontWeight: "normal",
    fontStyle: "normal",
    src: `url(${wardaIconsFont}) format('woff2')`,
  },
  icon: {
    color: ({ color }: IStyles) => color,
    fontFamily: "WardaDesignIcons !important",
    fontWeight: "normal",
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: 1,
    letterSpacing: "normal",
    textTransform: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    direction: "ltr",
    margin: 0,
    "-webkit-font-feature-settings": "liga",
    "-webkit-font-smoothing": "antialiased",
  },
});

export interface IIcon extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
}

const Icon = React.forwardRef(
  (props: IIcon, ref: React.Ref<HTMLDivElement>) => {
    const { className, style, children } = props;
    const color = getTheme().colors.typography;
    const classes = useStyles({ color });
    return (
      <span
        {...props}
        ref={ref}
        className={classnames({
          [classes.icon]: true,
          [className]: !!className,
        })}
        style={style}
        children={children}
      />
    );
  },
);

Icon.displayName = "Icon";
export default Icon;
