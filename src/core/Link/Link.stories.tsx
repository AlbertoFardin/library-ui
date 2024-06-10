import * as React from "react";
import Link from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "Core/Link",
  component: Link,
  args: {
    style: { margin: 25 },
    children: "This is a link",
    onClick: action("onClick"),
  },
};

const ExampleStory = (p) => <Link {...p} />;
export const Example = ExampleStory.bind({});
