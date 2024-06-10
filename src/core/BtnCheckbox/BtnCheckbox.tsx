import * as React from "react";
import { createUseStyles } from "react-jss";
import Text from "../Text";
import BtnBase from "../BtnBase";
import mixColors from "../../utils/mixColors";
import classnames from "classnames";
import { getTheme } from "../../theme";
import Checkbox, { SelectType } from "../Checkbox";
import emptyFn from "../../utils/emptyFn";

interface IStyles {
  selected: boolean;
  color: string;
}
const useStyles = createUseStyles({
  checkbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    padding: "5px 8px 5px 5px",
    borderRadius: getTheme().borderRadius,
    color: ({ color }: IStyles) => color,
    backgroundColor: ({ color, selected }: IStyles) =>
      selected
        ? mixColors(0.85, color, getTheme().colors.background)
        : "transparent",
  },
  checkboxHover: {
    "&:hover": {
      backgroundColor: ({ color }: IStyles) =>
        mixColors(0.85, color, getTheme().colors.background),
    },
  },
  icon: {
    margin: "0 5px 0 2px",
  },
});

export interface IBtnCheckbox {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: JSX.Element | React.ReactNode;
  label: string | JSX.Element;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  tooltip?: string | string[];
  onClick?: (newCheck: boolean) => void;
}

const BtnCheckbox = ({
  className,
  style,
  color = getTheme().colors.theme1,
  disabled,
  selected,
  children,
  label,
  labelStyle,
  labelClassName,
  tooltip,
  onClick = emptyFn,
}: IBtnCheckbox) => {
  const classes = useStyles({ color, selected });
  const cbOnClick = React.useCallback(() => {
    onClick(!selected);
  }, [selected, onClick]);

  return (
    <BtnBase
      color={color}
      className={classnames({
        [classes.checkbox]: true,
        [classes.checkboxHover]: !disabled,
        [className]: !!className,
      })}
      style={style}
      disabled={disabled}
      onClick={cbOnClick}
      tooltip={tooltip}
    >
      <Checkbox
        color={color}
        type={SelectType.CHECK}
        disabled={disabled}
        selected={selected}
        className={classes.icon}
      />
      <Text style={labelStyle} className={labelClassName} children={label} />
      {selected === true && children}
    </BtnBase>
  );
};

export default BtnCheckbox;
