import * as React from "react";
import { action } from "@storybook/addon-actions";
import FieldPicker, { IFieldPickerCreateProp } from ".";
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
import DemoCmp from "./Demo";
import { IListItem } from "../../ListItem";

const items: IListItem[] = [];
for (let i = 0; i < 50; i++) {
  const id = `item_${i + 1}`;
  const obj: IListItem = { id, label: id };
  items.push(obj);
}

const createProps: IFieldPickerCreateProp[] = [
  { id: "a", text: "A_label", required: true },
  { id: "b", text: "B_label", required: false },
  { id: "c", text: "C_label", required: false },
  { id: "d", text: "D_label", required: false },
];

export default {
  title: "Core/Field/FieldPicker",
  component: FieldPicker,
  args: {
    color,
    label: "FieldPicker",
    onChange: action("onChange"),
    onCreate: action("onCreate"),
    style,
    value: ["apple", "orange", "banana"],
    items: ["apple", "orange", "banana"].map((id) => ({ id, label: id })),
    menu: menuItems,
    itemsSorting: true,
    createEnabled: true,
    createTitle: "Create Title",
    createTitleHelp: "help me!",
    createProps,
  },
};

const DemoStory = () => <DemoCmp />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    <FieldPicker {...args} />
  </CardDemo>
);
export const Default = Story.bind({});

export const Disabled = Story.bind({});
Disabled.args = {
  readOnly: true,
};

export const DisabledEmptyValue = Story.bind({});
DisabledEmptyValue.args = {
  value: undefined,
  readOnly: true,
};

export const EmptyValue = Story.bind({});
EmptyValue.args = {
  value: undefined,
};

export const EmptyItems = Story.bind({});
EmptyItems.args = {
  items: undefined,
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
  items,
  value: items.map((o) => o.id),
};
