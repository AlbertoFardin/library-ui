import * as React from "react";
import DemoStory from "./Demo";
import CardFold from ".";

export default {
  title: "Core/CardFold",
  component: CardFold,
  args: {
    size: 15,
    open: true,
    anchorY: "top",
    anchorX: "left",
  },
};

export const Demo = DemoStory.bind({});

const ExampleStory = (args) => <CardFold {...args} />;
export const Example = ExampleStory.bind({});
