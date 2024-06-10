import * as React from "react";
import Icon from "./Icon";

export default {
  title: "Core/Icon",
  component: Icon,
  args: {
    style: { margin: "10px 25px" },
    children: "Icon",
  },
};

const ExampleStory = (args) => (
  <>
    <Icon {...args}>account_circle</Icon>
    <Icon {...args}>extension</Icon>
    <Icon {...args}>directions_boat</Icon>
    <Icon {...args}>event</Icon>
  </>
);
export const Example = ExampleStory.bind({});
