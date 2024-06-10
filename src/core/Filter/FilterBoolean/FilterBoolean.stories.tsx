import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterBoolean from ".";
import FilterBooleanDemo from "./Demo";

export default {
  title: "Core/Filter/FilterBoolean",
  component: FilterBoolean,
  args: {
    id: "_id",
    label: "FilterBoolean",
    onChange: action("onChange"),
    style: {
      border: "1px solid #f00",
      width: 250,
    },
    i18n: {
      clear: "clear",
      itemYesLabel: "Yes",
      itemYesCount: 123,
      itemNoLabel: "No",
      itemNoCount: 456,
    },
  },
};

const StoryDemo = () => <FilterBooleanDemo />;
export const Demo = StoryDemo.bind({});

const Story = (args) => <FilterBoolean {...args} />;

export const Default = Story.bind({});

export const Collased = Story.bind({});
Collased.args = {
  collapsed: true,
};

export const ValuedTrue = Story.bind({});
ValuedTrue.args = {
  value: true,
};

export const ValuedFalse = Story.bind({});
ValuedFalse.args = {
  value: false,
};
