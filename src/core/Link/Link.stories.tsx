import { action } from "@storybook/addon-actions";
import Link from ".";

export default {
  title: "core/Link",
  component: Link,
  args: {
    style: { margin: 25 },
    children: "This is a link",
    onClick: action("onClick"),
  },
};

const ExampleStory = (p) => <Link {...p} />;
export const Example = ExampleStory.bind({});
