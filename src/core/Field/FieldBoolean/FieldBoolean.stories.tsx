import { action } from "@storybook/addon-actions";
import DemoFieldBoolean from "./DemoFieldBoolean";
import FieldBoolean from ".";
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

const manyOptions = [];
for (let i = 0; i < 30; i++) {
  const id = `item_${i + 1}`;
  manyOptions.push({
    id,
    label: id,
  });
}

export default {
  title: "core/Field/FieldBoolean",
  component: FieldBoolean,
  args: {
    color,
    label: "FieldBoolean",
    onChange: action("onChange"),
    style,
    value: false,
    menu: menuItems,
  },
};

const DemoCmp = () => <DemoFieldBoolean />;
export const Demo = DemoCmp.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldBoolean {...args} />
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
