import { action } from "@storybook/addon-actions";
import Breadcrumb, { IBreadcrumb } from ".";

const args: IBreadcrumb = {
  style: { border: "1px solid #f00", margin: 10 },
  color: "#f00",
  maxItems: 5,
  items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => ({
    id: String(p),
    name: "path_" + p,
  })),
  onClick: action("onClick"),
};

export default {
  title: "core/Breadcrumb",
  component: Breadcrumb,
  args,
};

const ExampleStory = (args) => <Breadcrumb {...args} />;

export const Example = ExampleStory.bind({});

export const AllVisible = ExampleStory.bind({});
AllVisible.args = {
  maxItems: 50,
};
