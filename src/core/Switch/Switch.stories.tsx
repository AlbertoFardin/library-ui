import * as React from "react";
import Switch from ".";
import { action } from "@storybook/addon-actions";
import DemoSwitch from "./Demo";

export default {
  title: "Core/Switch",
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

export const WithLabel = Story.bind({});
WithLabel.args = {
  label: "Switch label",
};

export const WithIcon = Story.bind({});
WithIcon.args = {
  icon: "account_box",
};
