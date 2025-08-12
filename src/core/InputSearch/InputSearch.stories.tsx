import { action } from "@storybook/addon-actions";
import InputSearch, { IInputSearch } from "./";
import DemoCmp from "./Demo";

const args: IInputSearch = {
  style: { margin: 20 },
  onChange: action("onChange"),
  onFocus: action("onFocus"),
  onBlur: action("onBlur"),
  buttonInput: {
    icon: "tune",
    disabled: false,
    onClick: action("onClick"),
  },
};

export default {
  title: "core/InputSearch",
  component: InputSearch,
  args,
};

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

const Story = (args) => <InputSearch {...args} />;
export const Default = Story.bind({});

export const Loading = Story.bind({});
Loading.args = {
  loading: true,
};
