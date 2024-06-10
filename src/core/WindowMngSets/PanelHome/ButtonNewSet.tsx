import * as React from "react";
import BtnBase from "../../BtnBase";
import Text from "../../Text";
import Icon from "../../Icon";
import { createUseStyles } from "react-jss";
import hexToRgbA from "../../../utils/hexToRgbA";
import classnames from "classnames";
import { getTheme } from "../../../theme";

const size = 40;

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  button: {
    width: "-webkit-fill-available",
    height: size,
    minHeight: size,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: ({ color }: IStyles) => `1px dashed ${color}`,
    color: ({ color }: IStyles) => color,
    borderRadius: 5,
    transition: "all 250ms",
    backgroundColor: getTheme().colors.background,
  },
  buttonDisabled: {
    borderColor: getTheme().colors.grayBorder + " !important",
  },
  buttonEnabled: {
    "&:hover": {
      backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.15),
      borderColor: ({ color }: IStyles) => color,
    },
  },
});

interface IButtonAddSet {
  color: string;
  icon: string;
  label: string;
  disabled?: boolean;
  tooltip?: string | string[];
  onClick: () => void;
}
const ButtonAddSet = ({
  color,
  icon,
  label,
  disabled,
  tooltip,
  onClick,
}: IButtonAddSet) => {
  const classes = useStyles({ color });
  return (
    <BtnBase
      tooltip={tooltip}
      color={color}
      className={classnames({
        [classes.button]: true,
        [classes.buttonEnabled]: !disabled,
        [classes.buttonDisabled]: disabled,
      })}
      onClick={disabled ? undefined : onClick}
    >
      <Icon style={{ margin: "0 14px" }} children={icon} />
      <Text ellipsis weight="bolder" children={label} />
      <div style={{ flex: 1 }} />
    </BtnBase>
  );
};

export default ButtonAddSet;
