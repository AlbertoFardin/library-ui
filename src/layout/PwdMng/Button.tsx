import { createUseStyles } from "react-jss";
import Btn from "../../core/Btn";
import { getTheme } from "../../theme";

interface IStyles {
  span: 1 | 2;
}
const useStyles = createUseStyles({
  button: {
    height: 40,
    minHeight: 40,
    maxHeight: 40,
    marginLeft: 3,
    padding: 0,
    textAlign: "center",
    flex: ({ span }: IStyles) => span,
  },
});

interface IButton {
  color?: string;
  label: string;
  span?: 1 | 2;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  color = getTheme().colors.theme1,
  label,
  disabled,
  span = 1,
  onClick,
}: IButton) => {
  const classes = useStyles({ span });
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
