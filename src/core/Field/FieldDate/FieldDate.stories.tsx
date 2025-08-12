import { action } from "@storybook/addon-actions";
import DemoFieldDate from "./Demo";
import FieldDate from ".";
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
import { DATE_FORMAT } from "../../../constants";

export default {
  title: "core/Field/FieldDate",
  component: FieldDate,
  args: {
    color,
    label: "FieldDate",
    dateFormat: DATE_FORMAT,
    onChange: action("onChange"),
    style,
    value: new Date("2019-05-02T22:00:00.000Z").getTime(),
    menuItems,
  },
};

const DemoStory = () => <DemoFieldDate />;
export const Demo = DemoStory.bind({});

const Story = (args) => (
  <CardDemo>
    {" "}
    <FieldDate {...args} />
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
