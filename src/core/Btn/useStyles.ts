import { createUseStyles } from "react-jss";
import hexToRgbA from "../../utils/hexToRgbA";
import { getTheme } from "../../theme";

const size = 30;
const borderradius = getTheme().borderRadius;

const getColor = ({ variant, color, disabled }: IStyles) => {
  const colorText = getTheme().colors.typography;
  if (variant === "light") {
    return colorText;
  } else {
    if (disabled) return colorText;
    return color ? "#ffffff" : colorText;
  }
};
const getColorRipple = ({ variant, color }: IStyles) => {
  const colorBack = getTheme().colors.background;
  if (variant === "light") {
    return color || getTheme().colors.theme1;
  } else {
    return colorBack;
  }
};
const getBackground = ({
  variant,
  onClick,
  disabled,
  color,
  menuProp,
  menuOpen,
  selected,
  hover,
}: IStyles) => {
  const isDark = getTheme().colors.isDark;
  const colorVariant = isDark ? "#333333" : "#eaeaea";
  if (variant === "light") {
    const hoverCheck = hover && (!!onClick || !!menuProp);
    if (!disabled && (hoverCheck || selected || menuOpen)) {
      return hexToRgbA(color || getTheme().colors.theme1, isDark ? 0.4 : 0.2);
    }
    return "transparent";
  } else {
    if (disabled) return colorVariant;
    return color || colorVariant;
  }
};
const getSizeH = ({ small }: IStyles) => (small ? 22 : size);
const getSizeW = ({ small }: IStyles) => (small ? 22 : size + 2);
const getSizeIcon = ({ small }: IStyles) => (small ? 12 : 18);

interface IStyles {
  variant: "light" | "bold";
  color: string;
  hover: boolean;
  selected: boolean;
  disabled: boolean;
  icon: string;
  label: string;
  onClick: (event: React.MouseEvent) => void;
  menuProp: boolean;
  menuOpen: boolean;
  small: boolean;
  badgeColor: string;
}
const useStyles = createUseStyles({
  button: {
    position: "relative",
    maxWidth: 200,
    minWidth: getSizeW,
    maxHeight: getSizeH,
    minHeight: getSizeH,
    cursor: ({ disabled, onClick, menuProp }: IStyles) =>
      !disabled && (!!onClick || !!menuProp) ? "pointer" : "default",
    margin: "0 1px",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 350ms",
    borderRadius: borderradius,
    verticalAlign: "middle",
    color: getColorRipple,
    backgroundColor: getBackground,
    opacity: ({ disabled }: IStyles) => (disabled ? 0.6 : 1),
    overflow: "hidden",
    padding: ({ label }: IStyles) => (!!label ? "0 7px" : 0),
  },
  icon: {
    fontSize: getSizeIcon,
    color: getColor,
    padding: ({ label }: IStyles) => (!!label ? "0 2px" : 0),
  },
  label: {
    margin: "0 5px",
    flex: 1,
    color: getColor,
  },
  requiredSign: {
    color: "#ff0000",
    marginLeft: 2,
  },
  badge: {
    position: "absolute",
    top: 1,
    right: 1,
    padding: 5,
    borderRadius: 50,
    border: `2px solid ${getTheme().colors.background}`,
    backgroundColor: ({ badgeColor }: IStyles) => badgeColor,
  },
});

export default useStyles;
