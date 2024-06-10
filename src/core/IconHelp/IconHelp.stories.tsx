import * as React from "react";
import IconHelp from "./IconHelp";

export default {
  title: "Core/IconHelp",
  component: IconHelp,
  args: {
    open: true,
    tooltip: "_tooltip_",
  },
};

const ExampleStory = (args) => <IconHelp {...args} />;
export const Example = ExampleStory.bind({});
