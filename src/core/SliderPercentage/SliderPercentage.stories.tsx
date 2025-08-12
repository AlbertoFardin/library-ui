import { action } from "@storybook/addon-actions";
import SliderPercentage from "./SliderPercentage";
import DemoStory from "./Demo";

export default {
  title: "core/SliderPercentage",
  component: SliderPercentage,
  args: {
    range: [20, 30],
    onChange: action("onChange"),
    style: {
      width: "216px",
      height: "28px",
      padding: "13px",
      margin: "20px",
    },
  },
};

export const Demo = DemoStory.bind({});

const ExampleStory = (args) => <SliderPercentage {...args} />;
export const Example = ExampleStory.bind({});

export const Disabled = ExampleStory.bind({});
Disabled.args = {
  disabled: true,
};
