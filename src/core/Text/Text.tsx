import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getTheme, getFontsFamily, getFontWeight } from "../../theme";
import Tooltip from "../Tooltip";

interface IStyles {
  color: string;
  fontFamily: string;
  fontWeight: number;
}
const useStyles = createUseStyles({
  text: {
    color: ({ color }: IStyles) => color,
    fontFamily: ({ fontFamily }: IStyles) =>
      [fontFamily, "Helvetica", "Arial", "sans-serif"]
        .filter((f) => !!f)
        .join(", "),
    fontWeight: ({ fontWeight }: IStyles) => fontWeight,
    lineHeight: 1.5,
    margin: 0,
    "-webkit-font-smoothing": "antialiased",
    textRendering: "optimizeLegibility",
  },
  weightRegular: {
    letterSpacing: "0.015em",
  },
  weightLighter: {
    letterSpacing: "0.025em",
  },
  weightBolder: {
    letterSpacing: "0.012em",
  },
  size0: {
    fontSize: "10px",
  },
  size1: {
    fontSize: "12px",
  },
  size2: {
    fontSize: "14px",
  },
  size3: {
    fontSize: "16px",
  },
  size4: {
    fontSize: "18px",
  },
  size5: {
    fontSize: "20px",
  },
  size6: {
    fontSize: "22px",
  },
  size7: {
    fontSize: "24px",
  },
  size8: {
    fontSize: "26px",
  },
  size9: {
    fontSize: "28px",
  },
  size10: {
    fontSize: "30px",
  },
  ellipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export type TextSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IText {
  cmpRef?;
  className?: string;
  style?: React.CSSProperties;
  children: string | JSX.Element;
  font?: number;
  size?: TextSize;
  weight?: "regular" | "lighter" | "bolder";
  tooltip?: boolean;
  tooltipValue?: string | string[] | JSX.Element;
  ellipsis?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const Text = (props: IText) => {
  const {
    cmpRef,
    className,
    style,
    children,
    font = 0,
    size = 1,
    weight = "regular",
    tooltip = true,
    tooltipValue,
    ellipsis,
    onClick,
  } = props;
  const fontFamily = getFontsFamily()[font] || getFontsFamily()[0];
  const fontWeight = getFontWeight(fontFamily, weight);
  const classes = useStyles({
    color: getTheme().colors.typography,
    fontFamily,
    fontWeight,
  });
  const [mounted, setMounted] = React.useState(false);
  const refDefault = React.useRef(null);
  const ref = cmpRef || refDefault;
  const tooltipNeed =
    tooltip &&
    mounted &&
    ref?.current &&
    ref?.current?.scrollWidth > ref?.current?.clientWidth;

  React.useEffect(() => {
    // al primo render, il ref non è ancora collegato al DOM
    setMounted(true);
  }, []);

  return (
    <Tooltip title={tooltipNeed ? tooltipValue ?? children : ""}>
      <p
        role="presentation"
        ref={ref}
        style={style}
        className={classnames({
          [classes.text]: true,
          [classes.weightRegular]: weight === "regular",
          [classes.weightLighter]: weight === "lighter",
          [classes.weightBolder]: weight === "bolder",
          [classes.size0]: size === 0,
          [classes.size1]: size === 1,
          [classes.size2]: size === 2,
          [classes.size3]: size === 3,
          [classes.size4]: size === 4,
          [classes.size5]: size === 5,
          [classes.size6]: size === 6,
          [classes.size7]: size === 7,
          [classes.size8]: size === 8,
          [classes.size9]: size === 9,
          [classes.size10]: size === 10,
          [classes.ellipsis]: ellipsis,
          [className]: !!className,
        })}
        children={children}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default Text;
