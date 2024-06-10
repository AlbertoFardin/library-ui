import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { getTheme, getFonts, getFontWeight } from "../../theme";
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
  ellipsis: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export interface IText {
  cmpRef?;
  className?: string;
  style?: React.CSSProperties;
  children: string | JSX.Element;
  font?: number;
  size?: 0 | 1 | 2 | 3 | 4 | 5;
  weight?: "regular" | "lighter" | "bolder";
  tooltip?: boolean;
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
    ellipsis,
    onClick,
  } = props;
  const fontFamily = getFonts()[font];
  const fontWeight = getFontWeight(fontFamily, weight);
  const classes = useStyles({
    color: getTheme().colors.typography,
    fontFamily,
    fontWeight,
  });
  const refDefault = React.useRef(null);
  const ref = cmpRef || refDefault;
  const [tooltipNeed, setTooltipNeed] = React.useState(false);

  React.useEffect(() => {
    if (!!ref && !!ref.current && children) {
      setTooltipNeed(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, [children, ref]);

  return (
    <Tooltip title={tooltip && tooltipNeed ? children : ""}>
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
