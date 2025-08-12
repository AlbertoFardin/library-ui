import { createUseStyles } from "react-jss";
import hexToRgbA from "../../utils/hexToRgbA";
import { getTheme } from "../../theme";
import mixColors from "../../utils/mixColors";

const size = 30;
const borderradius = getTheme().borderRadius;

const getTextColor = (backgroundColor: string): string => {
  // Valore predefinito
  if (!backgroundColor) return "#fff";

  // Rimuove il simbolo # se presente
  backgroundColor = backgroundColor.replace("#", "");

  // Converte i colori in RGB
  let r, g, b;
  if (backgroundColor.length === 3) {
    r = parseInt(backgroundColor[0] + backgroundColor[0], 16);
    g = parseInt(backgroundColor[1] + backgroundColor[1], 16);
    b = parseInt(backgroundColor[2] + backgroundColor[2], 16);
  } else if (backgroundColor.length === 6) {
    r = parseInt(backgroundColor.substring(0, 2), 16);
    g = parseInt(backgroundColor.substring(2, 4), 16);
    b = parseInt(backgroundColor.substring(4, 6), 16);
  } else {
    return "#fff"; // Se il formato non è valido
  }

  // Calcola la luminanza percepita
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Restituisce il colore del testo basato sulla luminanza
  return luminance > 0.75 ? "#000" : "#fff";
};

const mapColorInside: Record<string, string> = {};

const getColorTypography = ({ variant, color, disabled }: IStyles) => {
  if (disabled || !color) return getTheme().colors.typography;
  switch (variant) {
    case "bold":
      return (mapColorInside[color] ||= getTextColor(color));
    default: {
      return getTheme().colors.typography;
    }
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
  const {
    colors: { isDark, theme1 },
  } = getTheme();
  const defaultColor = isDark ? "#333333" : "#eaeaea";
  switch (variant) {
    case "outlined": {
      const highlight =
        (hover && (onClick || menuProp)) || selected || menuOpen;
      if (disabled || !highlight) return getTheme().colors.background;
      return mixColors(
        isDark ? 0.4 : 0.2,
        getTheme().colors.background,
        color || theme1,
      );
    }
    case "light": {
      const highlight =
        (hover && (onClick || menuProp)) || selected || menuOpen;
      if (disabled || !highlight) return "transparent";
      return hexToRgbA(color || theme1, isDark ? 0.4 : 0.2);
    }
    case "bold": {
      if (disabled) return defaultColor;
      return color || defaultColor;
    }
    default:
      return "transparent";
  }
};
const getBorder = ({ variant, color }: IStyles) => {
  switch (variant) {
    case "outlined": {
      return `1px solid ${color || getTheme().colors.theme1}`;
    }
    default: {
      return 0;
    }
  }
};
const getSizeH = ({ small }: IStyles) => (small ? 22 : size);
const getSizeW = ({ small }: IStyles) => (small ? 22 : size);
const getSizeIcon = ({ small }: IStyles) => (small ? 12 : 18);

interface IStyles {
  variant: "light" | "bold" | "outlined";
  color: string;
  hover: boolean;
  selected: boolean;
  disabled: boolean;
  icon: string;
  label: string;
  onClick: (event: React.MouseEvent) => void;
  onCopyToClipboard: (text: string) => void;
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
    cursor: ({ disabled, onClick, onCopyToClipboard, menuProp }: IStyles) =>
      !disabled && (!!onClick || !!onCopyToClipboard || !!menuProp)
        ? "pointer"
        : "default",
    margin: "0 1px",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 350ms",
    borderRadius: borderradius,
    verticalAlign: "middle",
    backgroundColor: getBackground,
    opacity: ({ disabled }: IStyles) => (disabled ? 0.6 : 1),
    overflow: "hidden",
    padding: ({ label }: IStyles) => (!!label ? "0 7px" : 0),
    border: getBorder,
  },
  icon: {
    fontSize: getSizeIcon,
    color: getColorTypography,
    padding: ({ label }: IStyles) => (!!label ? "0 2px" : 0),
  },
  label: {
    margin: "0 5px",
    flex: 1,
    color: getColorTypography,
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
