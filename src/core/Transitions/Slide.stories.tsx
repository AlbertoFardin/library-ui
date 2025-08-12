import * as React from "react";
import { action } from "@storybook/addon-actions";
import Btn from "../Btn";
import Slide from "./Slide";

export default {
  title: "core/Transitions/Slide",
  component: Slide,
  args: {
    onEnter: action("onEnter"),
    onEntered: action("onEntered"),
    onExit: action("onExit"),
    onExited: action("onExited"),
  },
};

const ExampleStory = (args) => {
  const [open, setOpen] = React.useState(false);
  const [direction, setDirection] = React.useState(
    "top" as "top" | "bottom" | "left" | "right",
  );
  const onClick = React.useCallback(() => setOpen(!open), [open]);
  const onDirection = React.useCallback((_, id) => setDirection(id), []);

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
      <Btn
        variant="bold"
        label={`DIRECTION: ${direction}`}
        menu={{
          icon: true,
          items: ["top", "bottom", "left", "right"].map((id) => ({
            id,
            label: id,
            onClick: onDirection,
          })),
        }}
      />
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          border: "1px solid blue",
          height: 300,
          width: 300,
        }}
      >
        <Slide {...args} open={open} direction={direction}>
          <div style={{ background: "#f00", width: "100%", height: "100%" }}>
            !!!ECCOMI!!!
          </div>
        </Slide>
      </div>
    </div>
  );
};
export const Example = ExampleStory.bind({});
