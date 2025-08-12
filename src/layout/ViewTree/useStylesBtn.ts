import { createUseStyles } from "react-jss";
import { getTheme } from "../../theme";
import hexToRgbA from "../../utils/hexToRgbA";

interface IStyles {
  size: number;
  color: string;
}
const useStyles = createUseStyles({
  placeholder: {
    height: ({ size }: IStyles) => size,
    width: ({ size }: IStyles) => size,
  },
  button: {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "border-radius": getTheme().borderRadius,
    height: ({ size }: IStyles) => size,
    width: ({ size }: IStyles) => size,
    cursor: "pointer",
    transition: "all 250ms",
    "background-color": ({ color }: IStyles) => hexToRgbA(color, 0),
    "&:hover": {
      "background-color": ({ color }: IStyles) => hexToRgbA(color, 0.2),
    },
  },
  icon: {
    transition: "all 250ms",
  },
  iconCollapsed: {
    transform: "rotate(-90deg)",
  },
});

export default useStyles;
