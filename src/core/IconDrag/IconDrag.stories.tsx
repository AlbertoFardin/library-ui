import * as React from "react";
import IconDrag from "./IconDrag";

export default {
  title: "Core/IconDrag",
  component: IconDrag,
  args: {
    open: true,
  },
};

const ExampleStory = (args) => <IconDrag {...args} />;
export const Example = ExampleStory.bind({});
