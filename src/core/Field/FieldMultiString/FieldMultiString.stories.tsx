import { action } from "@storybook/addon-actions";
import DemoFieldMultiString from "./Demo";
import FieldMultiString from ".";
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

const maxItem = 5;
const value = [];
for (let i = 0; i < maxItem; i++) {
  const id = `item_${i}`;
  value.push({ id, label: id });
}

export default {
  title: "core/Field/FieldMultiString",
  component: FieldMultiString,
  args: {
    color,
    label: "FieldMultiString",
    onChange: action("onChange"),
    onClick: action("onClick"),
    style,
    value,
    menu: menuItems,
  },
};

const DemoStory = () => <DemoFieldMultiString />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldMultiString {...args} />
  </CardDemo>
);
export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  ReadOnly: true,
};
export const DisabledInput = Story.bind({});
DisabledInput.args = {
  readOnlyInput: true,
  value: [],
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
  adornmentElement,
};

export const AdornmentAvatar = Story.bind({});
AdornmentAvatar.args = {
  adornmentAvatar,
};

export const AdornmentIcon = Story.bind({});
AdornmentIcon.args = {
  adornmentIcon,
};

export const MaxItems = Story.bind({});
MaxItems.args = {
  itemsSelectedMaxLength: maxItem,
};
