import * as React from "react";
import TextLoading from ".";
import { getTheme } from "../../theme";

export default {
  title: "Core/TextLoading",
  component: TextLoading,
  args: {
    color: getTheme().colors.theme1,
    style: { margin: 25, border: "1px solid #f00" },
  },
};

const ExampleStory = (args) => <TextLoading {...args} />;
export const Example = ExampleStory.bind({});

export const CustomText = ExampleStory.bind({});
CustomText.args = {
  text: "The quick brown fox jumps over the lazy dog",
};
