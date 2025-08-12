import { action } from "@storybook/addon-actions";
import FilterDate from ".";
import FilterDateDemo from "./Demo";

export default {
  title: "core/Filter/FilterDate",
  component: FilterDate,
  args: {
    id: "_id",
    label: "FilterDate",
    onChange: action("onChange"),
    style: {
      border: "1px solid #f00",
      width: 250,
    },
    dateFormat: "DD/MM/YYYY",
  },
};

const StoryDemo = () => <FilterDateDemo />;
export const Demo = StoryDemo.bind({});

const Story = (args) => <FilterDate {...args} />;

export const Default = Story.bind({});

export const Collased = Story.bind({});
Collased.args = {
  collapsed: true,
};

export const Valued = Story.bind({});
Valued.args = {
  value: {
    startDate: new Date("2017-01-31").getTime(),
    endDate: new Date("2017-03-31").getTime(),
  },
};
