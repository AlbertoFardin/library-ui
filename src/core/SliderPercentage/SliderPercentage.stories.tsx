import * as React from "react";
import SliderPercentage from "./SliderPercentage";
import DemoStory from "./Demo";
import { action } from "@storybook/addon-actions";

export default {
  title: "Core/SliderPercentage",
  component: SliderPercentage,
  args: {
    range: [20, 30],
    onChange: action("onChange"),
    style: {
      width: "216px",
      height: "28px",
      padding: "13px",
      margin: "20px",
    },
  },
};

export const Demo = DemoStory.bind({});

const ExampleStory = (args) => <SliderPercentage {...args} />;
export const Example = ExampleStory.bind({});

export const Disabled = ExampleStory.bind({});
Disabled.args = {
  disabled: true,
};
