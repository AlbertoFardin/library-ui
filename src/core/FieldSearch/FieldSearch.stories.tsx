import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldSearch from ".";

export default {
  title: "Core/FieldSearch",
  component: FieldSearch,
  args: {
    style: { margin: 20 },
    onChange: action("onChange"),
    onFocus: action("onFocus"),
    onBlur: action("onBlur"),
  },
};

const Story = (args) => <FieldSearch {...args} />;
export const Default = Story.bind({});

export const Loading = Story.bind({});
Loading.args = {
  loading: true,
};
