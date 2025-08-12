import { createUseStyles } from "react-jss";
import classnames from "classnames";
import BtnBase from "../../../core/BtnBase";
import Text from "../../../core/Text";
import Icon from "../../../core/Icon";
import hexToRgbA from "../../../utils/hexToRgbA";
import { getTheme } from "../../../theme";

const size = 38;

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  button: {
    width: "100%",
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
    "& *": {
      opacity: 0.5,
    },
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
      <Icon style={{ margin: "0 13px" }} children={icon} />
      <Text ellipsis children={label} />
      <div style={{ flex: 1 }} />
    </BtnBase>
  );
};

export default ButtonAddSet;
