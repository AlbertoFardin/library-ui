import * as React from "react";
import { action } from "@storybook/addon-actions";
import Zoom from "./Zoom";

export default {
  title: "core/Transitions/Zoom",
  component: Zoom,
  args: {
    onEnter: action("onEnter"),
    onEntered: action("onEntered"),
    onExit: action("onExit"),
    onExited: action("onExited"),
  },
};

const ExampleStory = (args) => {
  const [open, setOpen] = React.useState(true);
  const onClick = React.useCallback(() => setOpen(!open), [open]);
  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #f00",
      }}
    >
      <button onClick={onClick}>CLICK ME</button>
      <Zoom {...args} open={open}>
        <div style={{ background: "#f00", width: 200, height: 200 }}>
          !!!ECCOMI!!!
        </div>
      </Zoom>
    </div>
  );
};
export const Example = ExampleStory.bind({});
