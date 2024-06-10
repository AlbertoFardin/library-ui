import * as React from "react";
import { action } from "@storybook/addon-actions";
import LogoWarda from ".";

export default {
  title: "Core/LogoWarda",
  component: LogoWarda,
  argTypes: {
    color: { control: "color" },
  },
};

const Story = (args) => <LogoWarda {...args} />;

export const Default = Story.bind({});
Default.args = {
  onClick: action("onClick"),
};

export const SuperHeight = Story.bind({});
SuperHeight.args = {
  style: { border: "2px dotted red" },
  width: 50,
  height: 250,
};

export const SuperWidth = Story.bind({});
SuperWidth.args = {
  style: { border: "2px dotted red" },
  width: 400,
  height: 50,
};

export const Customized = Story.bind({});
Customized.args = {
  style: { padding: 20, backgroundColor: "blue" },
  color: "white",
  width: 200,
  height: 200,
};
