import { action } from "@storybook/addon-actions";
import DemoFieldText from "./Demo";
import FieldText from ".";
import {
  color,
  style,
  multiLabels,
  adornmentElement,
  adornmentIcon,
  adornmentAvatar,
  menuItems,
} from "../utils/story";
import CardDemo from "../../../stories/CardDemo";

export default {
  title: "core/Field/FieldText",
  component: FieldText,
  args: {
    color,
    label: "FieldText",
    onKeyPress: action("onKeyPress"),
    onChange: action("onChange"),
    onBlur: action("onBlur"),
    onFocus: action("onFocus"),
    style,
    value: "Once Upon a Time, \nthere are a little girl called Red Hood",
    menu: menuItems,
  },
};

const DemoStory = () => <DemoFieldText />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldText {...args} />
  </CardDemo>
);
export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  readOnly: true,
};

export const Placeholder = Story.bind({});
Placeholder.args = {
  value: undefined,
};

export const MultiLabels = Story.bind({});
MultiLabels.args = {
  label: multiLabels,
};

export const AdornmentElement = Story.bind({});
AdornmentElement.args = {
  multiline: true,
  adornmentElement,
};

export const AdornmentAvatar = Story.bind({});
AdornmentAvatar.args = {
  multiline: true,
  adornmentAvatar,
};

export const AdornmentIcon = Story.bind({});
AdornmentIcon.args = {
  multiline: true,
  adornmentIcon,
};

const valueMultiline = [];
for (let i = 0; i < 100; i++) {
  valueMultiline.push("multiline_" + i + "\n");
}
export const MultiLine = Story.bind({});
MultiLine.args = {
  multiline: true,
  value: valueMultiline.join(""),
};
export const MultiLineVariable = Story.bind({});
MultiLineVariable.args = {
  multiline: true,
  autosize: true,
  value: valueMultiline.join(""),
};

export const EmptyMultiLineVariable = Story.bind({});
EmptyMultiLineVariable.args = {
  multiline: true,
  autosize: true,
  value: "",
};
