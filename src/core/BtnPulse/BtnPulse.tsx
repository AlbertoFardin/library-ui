import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";
import Btn from "../Btn";
import hexToRgbA from "../../utils/hexToRgbA";

const COLOR = "#C07CF1";
const SIZE = 30;
const RGBA = (n: number) => hexToRgbA(COLOR, n);
const SHADOW_BASE = "0 0 5px 0px rgb(0, 0, 0, 0.15)";

const useStyles = createUseStyles({
  btnPulse: {
    zIndex: 1,
    borderRadius: getTheme().borderRadius,
    height: SIZE,
    width: SIZE,
  },
  enable: {
    backgroundColor: getTheme().colors.background,
    boxShadow: SHADOW_BASE,
  },
  pulseAnimation: {
    animation: "$pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%": {
      boxShadow: `${SHADOW_BASE}, 0 0 0 0px ${RGBA(0.7)}`,
    },
    "70%": {
      boxShadow: `${SHADOW_BASE}, 0 0 0 12px ${RGBA(0)}`,
    },
    "100%": {
      boxShadow: `${SHADOW_BASE}, 0 0 0 0 ${RGBA(0)}`,
    },
  },
  btn: {
    margin: 0,
    maxWidth: SIZE,
    minWidth: SIZE,
    width: SIZE,
    "&>div": {
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  btnIcon: {
    color: COLOR,
  },
});

export interface IBtnPulse {
  className?: string;
  style?: React.CSSProperties;
  pulse: boolean;
  cmpRef?;
  icon: string;
  tooltip?: string;
  tooltipPlace?: "top" | "bottom" | "left" | "right";
  tooltipOpen?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent) => void;
}

const BtnPulse = ({
  className,
  style,
  pulse,
  cmpRef,
  icon,
  tooltip,
  tooltipPlace,
  tooltipOpen,
  selected,
  disabled,
  onClick,
}: IBtnPulse) => {
  const classes = useStyles({});
  const pulseAnimation = pulse && !selected && !disabled;
  return (
    <div
      style={style}
      className={classnames({
        [classes.btnPulse]: true,
        [classes.enable]: !disabled,
        [classes.pulseAnimation]: pulseAnimation,
        [className]: !!className,
      })}
    >
      <Btn
        color={COLOR}
        className={classes.btn}
        cmpRef={cmpRef}
        icon={icon}
        iconClassName={pulseAnimation || selected ? classes.btnIcon : undefined}
        tooltip={tooltip}
        tooltipPlace={tooltipPlace}
        tooltipOpen={tooltipOpen}
        selected={selected}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
};

export default BtnPulse;
