import { action } from "@storybook/addon-actions";
import Switch from ".";
import DemoSwitch from "./Demo";

export default {
  title: "core/Switch",
  component: Switch,
  args: {
    style: { margin: 20 },
    onChange: action("onChange"),
    checked: false,
    color: "#f00",
  },
};

const DemoStory = () => <DemoSwitch />;
export const Demo = DemoStory.bind({});

const Story = (p) => <Switch {...p} />;

export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  disabled: true,
};

export const Checked = Story.bind({});
Checked.args = {
  checked: true,
};

export const WithIcon = Story.bind({});
WithIcon.args = {
  icon: "account_box",
};
