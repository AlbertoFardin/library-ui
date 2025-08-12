import { createUseStyles } from "react-jss";
import Btn from "../../core/Btn";
import { getTheme } from "../../theme";
import { WIDTH_INPUT } from "./utils";

const useStyles = createUseStyles({
  button: {
    width: WIDTH_INPUT,
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    maxWidth: "inherit",
    marginTop: 15,
    padding: 0,
    textAlign: "center",
  },
});

interface IButton {
  color?: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  color = getTheme().colors.theme1,
  label,
  disabled,
  onClick,
}: IButton) => {
  const classes = useStyles();
  return (
    <Btn
      className={classes.button}
      variant="bold"
      color={color}
      label={label}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default Button;
