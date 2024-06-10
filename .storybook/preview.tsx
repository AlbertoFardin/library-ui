import * as React from "react";
import { getTheme } from "../src/theme";
import WebFont from "webfontloader";

export const decorators = [
  (Story) => {
    const theme = getTheme();
    React.useEffect(() => {
      WebFont.load(theme.fonts);
    }, [theme.fonts]);
    return <Story />;
  },
];
export const parameters = {
  options: {
    storySort: {
      order: ["Intro", "Core", "Utils", "Portal"],
      method: "alphabetical",
    },
  },
};
