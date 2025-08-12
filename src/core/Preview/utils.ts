import { getTheme } from "../../theme";

export const getPreviewBackgroundColor = (): string => {
  return getTheme().colors.isDark ? "#a7a7a7" : "#faf9f8";
};
