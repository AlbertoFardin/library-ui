import * as React from "react";
import { getTheme } from "../../theme";
import Icon from "../Icon";
import BtnBase from "../BtnBase";
import { createUseStyles } from "react-jss";
import classnames from "classnames";

interface IStyles {
  checked: boolean;
  color: string;
}
const colorIcon = ({ checked }: IStyles) =>
  checked ? getTheme().colors.background : getTheme().colors.typography;
const useStyles = createUseStyles({
  switch: {
    transition: "all 250ms",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderRadius: 20,
    color: ({ color }: IStyles) => color,
    "&:hover $switchTrack": {
      borderColor: ({ color }: IStyles) => color,
    },
  },
  switchTrack: {
    zIndex: 1,
    transition: "all 250ms",
    width: 38,
    height: 16,
    position: "relative",
    borderRadius: 10,
    backgroundColor: ({ checked, color }: IStyles) =>
      checked ? color : getTheme().colors.background,
    border: `1px solid ${getTheme().colors.background}`,
    borderColor: ({ checked, color }: IStyles) =>
      checked ? color : getTheme().colors.grayBorder,
  },
  switchThumb: {
    position: "absolute",
    zIndex: 2,
    transition: "all 250ms",
    margin: "auto",
    top: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: ({ checked }: IStyles) =>
      checked ? getTheme().colors.background : getTheme().colors.grayBorder,
    left: ({ checked }: IStyles) => (checked ? 23 : 2),
  },
  switchIcon: {
    position: "absolute",
    zIndex: 1,
    transition: "all 250ms",
    margin: "auto",
    top: 0,
    bottom: 0,
    left: ({ checked }: IStyles) => (checked ? 3 : 19),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& * ": {
      fontSize: 15,
      color: colorIcon,
    },
  },
});

export interface ISwitch {
  className?: string;
  style?: React.CSSProperties;
  color: string;
  disabled?: boolean;
  icon?: string | JSX.Element;
  tooltip?: string | string[];
  checked: boolean;
  onChange: (newCheck: boolean) => void;
  children?: JSX.Element | React.ReactNode;
}
const Switch = ({
  className,
  style,
  color,
  disabled,
  checked,
  icon,
  tooltip,
  onChange,
  children,
}: ISwitch) => {
  const classes = useStyles({ color, checked });
  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(!checked);
    },
    [checked, onChange],
  );

  return (
    <BtnBase
      className={classnames({
        [classes.switch]: true,
        [className]: !!className,
      })}
      style={style}
      onClick={disabled ? undefined : onClick}
      tooltip={tooltip}
    >
      <div className={classes.switchTrack}>
        <div className={classes.switchThumb} />
        <div className={classes.switchIcon}>
          {!icon ? null : typeof icon === "string" ? (
            <Icon children={icon} />
          ) : (
            icon
          )}
        </div>
      </div>
      {children}
    </BtnBase>
  );
};

export default Switch;
