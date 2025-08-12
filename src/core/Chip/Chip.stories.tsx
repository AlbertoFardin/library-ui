import { action } from "@storybook/addon-actions";
import Chip from ".";
import { getTheme } from "../../theme";

const urlImage = "./images/width_128/test_image1.jpeg";

export default {
  title: "core/Chip",
  component: Chip,
  args: {
    color: getTheme().colors.theme1,
    label: "label",
    style: { margin: 20, maxWidth: 200 },
  },
};

const Story = (args) => <Chip {...args} />;

export const Example = Story.bind({});

export const Selected = Story.bind({});
Selected.args = {
  selected: true,
};

export const Tooltip = Story.bind({});
Tooltip.args = {
  tooltip: "tooltip",
};

export const OnClick = Story.bind({});
OnClick.args = {
  onClick: action("onClick"),
};

export const Avatar = Story.bind({});
Avatar.args = {
  avatar: urlImage,
};

export const Icon = Story.bind({});
Icon.args = {
  icon: "check",
};

export const Ellipsised = Story.bind({});
Ellipsised.args = {
  label:
    "long label long label long label long label long label long label long label ",
};
