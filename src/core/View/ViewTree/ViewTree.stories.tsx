import * as React from "react";
import ViewTree from "./ViewTree";
import items from "./_mockItems.json";
import { action } from "@storybook/addon-actions";
import ViewTreeDemo from "./Demo";
import ViewTreeDemoLazyLoading from "./DemoLazyLoading";

export default {
  title: "Core/View/ViewTree",
  component: ViewTree,
};

const DemoStory1 = () => <ViewTreeDemo />;
export const Demo = DemoStory1.bind({});

const DemoStory2 = () => <ViewTreeDemoLazyLoading />;
export const DemoLazyLoading = DemoStory2.bind({});

const Story = (args) => <ViewTree {...args} />;

export const Default = Story.bind({});
Default.args = {
  expanded: items.map((c) => c.id),
  items,
  onClick: action("onClick"),
  onCheck: action("onCheck"),
  onToggle: action("onToggle"),
};
