import * as React from "react";
import { action } from "@storybook/addon-actions";
import DemoFieldSearch from "../FieldSelect/DemoFieldSearch";
import DemoFieldSelect from "../FieldSelect/DemoFieldSelect";
import FieldSelect from "../FieldSelect";
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
  title: "Core/Field/FieldSelect",
  component: FieldSelect,
  args: {
    color,
    label: "FieldSelect",
    onChange: action("onChange"),
    style,
    value: ["apple"],
    options: [
      {
        id: "apple",
        label: "apple",
      },
    ],
    menu: menuItems,
  },
};

const DemoStorySearch = () => <DemoFieldSearch />;
export const DemoSearch = DemoStorySearch.bind({});

const DemoStorySelect = () => <DemoFieldSelect />;
export const DemoSelect = DemoStorySelect.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldSelect {...args} />
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

export const ManyItems = Story.bind({});
ManyItems.args = {
  options: manyOptions,
  value: manyOptions.map((o) => o.id),
};
