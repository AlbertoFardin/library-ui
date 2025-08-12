import { action } from "@storybook/addon-actions";
import BtnBase from ".";
import Text from "../Text";

const color = "#f00";
const style = { padding: 25, margin: 25, border: `1px solid ${color}` };

export default {
  title: "core/BtnBase",
  component: BtnBase,
};

const ExampleStory = () => (
  <BtnBase
    color={color}
    style={style}
    onClick={action("onClick")}
    onDoubleClick={action("onDoubleClick")}
    onContextMenu={action("onContextMenu")}
    onMouseEnter={action("onMouseEnter")}
    onMouseLeave={action("onMouseLeave")}
  >
    <Text children="THIS IS A BUTTON" />
  </BtnBase>
);
export const Example = ExampleStory.bind({});

const TooltipStory = () => (
  <BtnBase color={color} style={style} tooltip="__tooltip__">
    <Text children="THIS IS A BUTTON" />
  </BtnBase>
);
export const Tooltip = TooltipStory.bind({});

const DisabledStory = () => (
  <BtnBase color={color} style={style}>
    <Text children="THIS IS A BUTTON" />
  </BtnBase>
);
export const Disabled = DisabledStory.bind({});
