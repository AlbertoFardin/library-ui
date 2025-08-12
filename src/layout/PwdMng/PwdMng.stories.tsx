import { action } from "@storybook/addon-actions";
import PwdMng, { IPwdMng } from ".";
import DemoPwdMng from "./Demo";

const args: IPwdMng = {
  style: { margin: 15, border: "1px solid #f00" },
  value: null,
  onChange: action("onChange"),
  onCopyToClipboard: action("onCopyToClipboard"),
};

export default {
  title: "layout/PwdMng",
  component: PwdMng,
  args,
};

const DemoStory = () => <DemoPwdMng />;
export const Demo = DemoStory.bind({});

const Story = (args: IPwdMng) => <PwdMng {...args} />;

export const Default = Story.bind({});

export const Valued = Story.bind({});
Valued.args = {
  value: "VFR$5tgb",
};

export const Loading = Story.bind({});
Loading.args = {
  value: "xVFR$5tgb",
  loading: true,
};

export const ReadOnly = Story.bind({});
ReadOnly.args = {
  value: "xVFR$5tgb",
  readOnly: true,
};
