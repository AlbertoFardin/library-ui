import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";
import hexToRgbA from "../../utils/hexToRgbA";

interface IStyles {
  color: string;
  thickness: number;
}
const useStyles = createUseStyles({
  "@keyframes infiniteRotation": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  indeterminate: {
    animation: "$infiniteRotation 700ms linear infinite",
  },
  svg: {
    display: "inline-flex",
    "vertical-align": "middle",
  },
  circle: {
    stroke: ({ color }: IStyles) => hexToRgbA(color, 0.25),
    "stroke-width": ({ thickness }: IStyles) => thickness,
    "stroke-dasharray": 0,
    fill: "none",
  },
  meter: {
    "stroke-width": ({ thickness }: IStyles) => thickness,
    stroke: ({ color }: IStyles) => color,
    fill: "none",
    transition: "stroke-dashoffset 1s cubic-bezier(0.43, 0.41, 0.22, 0.91)",
    "transform-origin": "center center",
    transform: "rotate(-90deg) scaleX(-1)",
  },
});

const getPathStyle = (
  pathRef,
  value: number,
  variant: "determinate" | "indeterminate",
): React.CSSProperties => {
  if (!pathRef || !pathRef.current) return {};
  const v = variant === "indeterminate" ? 25 : value;
  const length = pathRef.current.getTotalLength();
  const to = length * ((100 - v) / 100);
  return { strokeDashoffset: Math.max(0, to) };
};

export interface ICircularProgress {
  style?: React.CSSProperties;
  className?: string;
  variant?: "determinate" | "indeterminate";
  size?: number;
  color?: string;
  value?: number;
  thickness?: number;
}
const CircularProgress = ({
  style,
  className,
  variant = "indeterminate",
  size = 50,
  color = getTheme().colors.theme1,
  value = 0,
  thickness = 6,
}: ICircularProgress) => {
  const classes = useStyles({ color, thickness });
  const pathRef = React.useRef(null);
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    if (!render) setRender(true);
  }, [render]);

  return (
    <svg
      className={classnames({
        [classes.svg]: true,
        [classes.indeterminate]: variant === "indeterminate",
        [className]: !!className,
      })}
      style={{
        ...style,
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <circle className={classes.circle} r="45" cx="50" cy="50" />
      <path
        ref={pathRef}
        className={classes.meter}
        d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDashoffset="282.78302001953125"
        strokeDasharray="282.78302001953125"
        style={getPathStyle(pathRef, value, variant)}
      />
    </svg>
  );
};

export default CircularProgress;
