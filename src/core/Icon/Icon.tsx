import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  "@font-face": {
    "font-family": "LibraryUiIcons",
    "font-weight": "normal",
    "font-style": "normal",
    src: "url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('truetype')",
  },
  icon: {
    color: ({ color }: IStyles) => color,
    "font-family": '"LibraryUiIcons"',
    "font-weight": "normal",
    "font-style": "normal",
    "font-size": "18px",
    "line-height": 1,
    "letter-spacing": "normal",
    "text-transform": "none",
    display: "inline-block",
    "white-space": "nowrap",
    "word-wrap": "normal",
    direction: "ltr",
    "-webkit-font-feature-settings": "liga",
    "-webkit-font-smoothing": "antialiased",
    margin: 0,
  },
});

export interface IIcon {
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

const Icon = React.forwardRef(
  (props: IIcon, ref: React.Ref<HTMLDivElement>) => {
    const { className, style, children } = props;
    const color = getTheme().colors.typography;
    const classes = useStyles({ color });
    return (
      <span
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
