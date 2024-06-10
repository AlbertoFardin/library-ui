import * as React from "react";
import Badge from "./Badge";
import { getTheme } from "../../theme";
import { action } from "@storybook/addon-actions";
import mixColors from "../../utils/mixColors";

const urlImage2 = "./images/width_128/test_image2.jpeg";

export default {
  title: "Core/Badge",
  component: Badge,
  args: {
    style: { margin: 20 },
    onClick: action("onClick"),
    tooltip: "_tooltip_",
  },
};

const Story = (p) => <Badge {...p} />;

export const Icon = Story.bind({});
Icon.args = {
  color: getTheme().colors.msgWarn,
  icon: "feedback",
};

export const Label = Story.bind({});
Label.args = {
  color: getTheme().colors.msgInfo,
  label: "TEST",
};

export const Avatar = Story.bind({});
Avatar.args = {
  color: getTheme().colors.msgFail,
  avatar: urlImage2,
};

export const Mix = Story.bind({});
Mix.args = {
  color: getTheme().colors.msgSucc,
  icon: "public",
  label: "2/6",
  labelPosition: "left",
  style: { backgroundColor: mixColors(0.7, getTheme().colors.msgSucc, "#fff") },
};
