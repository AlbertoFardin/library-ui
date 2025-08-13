import * as React from "react";
import { AppMediaTypeProvider } from "../src/contexts/AppMediaTypeContext";
import { THEME_DEFAULT, setTheme, loadFonts } from "../src/theme";

export const decorators = [
  (Story) => {
    setTheme(THEME_DEFAULT);
    loadFonts();
    return (
      <AppMediaTypeProvider>
        <Story />
      </AppMediaTypeProvider>
    );
  },
];
export const parameters = {
  options: {
    storySort: {
      order: ["Welcome", "Layout", "Core", "Utils"],
      method: "alphabetical",
    },
  },
};
