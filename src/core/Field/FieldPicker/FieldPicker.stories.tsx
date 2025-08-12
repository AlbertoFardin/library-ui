import { action } from "@storybook/addon-actions";
import FieldPicker, { IFieldPicker, IFieldPickerDialogField } from ".";
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

const dialogFields: IFieldPickerDialogField[] = [
  { id: "a", text: "A_label", mandatory: true },
  { id: "b", text: "B_label", mandatory: false },
  { id: "c", text: "C_label", mandatory: false },
  { id: "d", text: "D_label", mandatory: false },
];

const args: IFieldPicker = {
  color,
  label: "FieldPicker",
  onChange: action("onChange"),
  style,
  value: ["apple", "orange", "banana"],
  items: ["apple", "orange", "banana"].map((id) => ({ id, label: id })),
  menu: menuItems,
  itemsSortable: true,
  dialogToCreate: {
    enable: true,
    fields: dialogFields,
    title: "Create Title",
    titleHelp: "help me!",
    onChange: action("onCreate"),
  },
  dialogToModify: {
    enable: true,
    fields: dialogFields,
    title: "Modify Title",
    titleHelp: "help me!",
    onChange: action("oModify"),
  },
};

export default {
  title: "core/Field/FieldPicker",
  component: FieldPicker,
  args,
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
