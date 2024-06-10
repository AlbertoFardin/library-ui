import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterSelect from "./FilterSelect";
import FilterSelectDemo from "./Demo";
import { IFilterSelectItem } from "./IFilterSelect";

const value: string[] = ["filter2"];
const options: IFilterSelectItem[] = [
  {
    label: "filter1",
    id: "filter1",
  },
  {
    label: "filter2",
    id: "filter2",
  },
  {
    label: "filter3",
    id: "filter3",
  },
  {
    label: "filter4",
    id: "filter4",
  },
  {
    label: "filter5",
    id: "filter5",
  },
];

export default {
  title: "Core/Filter/FilterSelect",
  component: FilterSelect,
  args: {
    id: "_id",
    label: "FilterSelect",
    onChange: action("onChange"),
    onSearch: action("onSearch"),
    style: {
      border: "1px solid #f00",
      width: 250,
    },
    value,
    options,
  },
};

const StoryDemo = () => <FilterSelectDemo />;
export const Demo = StoryDemo.bind({});

const Story = (args) => <FilterSelect {...args} />;
export const Default = Story.bind({});

export const SingleSelection = Story.bind({});
SingleSelection.args = {
  maxItems: 1,
};
