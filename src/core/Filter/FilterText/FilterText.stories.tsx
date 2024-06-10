import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterText from ".";
import FilterTextDemo from "./Demo";

export default {
  title: "Core/Filter/FilterText",
  component: FilterText,
  args: {
    id: "_id",
    label: "FilterText",
    onChange: action("onChange"),
    style: {
      border: "1px solid #f00",
      width: 250,
    },
  },
};

const StoryDemo = () => <FilterTextDemo />;
export const Demo = StoryDemo.bind({});

const Story = (args) => <FilterText {...args} />;

export const Default = Story.bind({});

export const LabelSub = Story.bind({});
LabelSub.args = {
  labelSub: "labelSub",
};

export const Collased = Story.bind({});
Collased.args = {
  collapsed: true,
  collapsedHelp: "collapsedHelp",
};

export const Valued = Story.bind({});
Valued.args = {
  value: "Hi Mom! Look at me!",
};

export const WithSwitch = Story.bind({});
WithSwitch.args = {
  switchCaseSensitive: true,
  switchExactValue: true,
  switchNoValue: false,
};
