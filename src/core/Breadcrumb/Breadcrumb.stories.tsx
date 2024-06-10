import * as React from "react";
import Breadcrumb, { IBreadcrumb } from ".";
import { action } from "@storybook/addon-actions";

const args: IBreadcrumb = {
  color: "#f00",
  maxItems: 5,
  items: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => ({
    id: String(p),
    name: "path_" + p,
  })),
  onClick: action("onClick"),
};

export default {
  title: "Core/Breadcrumb",
  component: Breadcrumb,
  args,
};

const ExampleStory = (args) => <Breadcrumb {...args} />;

export const Example = ExampleStory.bind({});

export const AllVisible = ExampleStory.bind({});
AllVisible.args = {
  maxItems: 50,
};
