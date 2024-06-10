import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterPercentage from ".";
import DemoFilterPercentage from "./Demo";

export default {
  title: "Core/Filter/FilterPercentage",
  component: FilterPercentage,
  args: {
    id: "_id",
    label: "FilterPercentage",
    onChange: action("onChange"),
    style: {
      border: "1px solid #f00",
      width: 250,
    },
    i18n: {
      clear: "clear",
    },
  },
};

const StoryDemo = () => <DemoFilterPercentage />;
export const Demo = StoryDemo.bind({});

const Story = (args) => <FilterPercentage {...args} />;

export const Default = Story.bind({});

export const Collased = Story.bind({});
Collased.args = {
  collapsed: true,
};
