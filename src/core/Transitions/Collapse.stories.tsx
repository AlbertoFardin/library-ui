import * as React from "react";
import Collapse from "./Collapse";
import { action } from "@storybook/addon-actions";

export default {
  title: "Core/Transitions/Collapse",
  component: Collapse,
};

const ExampleStory = () => {
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
      <Collapse
        open={open}
        onEnter={action("onEnter")}
        onEntered={action("onEntered")}
        onExit={action("onExit")}
        onExited={action("onExited")}
      >
        <div style={{ background: "#f00", width: 200, height: 200 }}>
          !!!ECCOMI!!!
        </div>
      </Collapse>
    </div>
  );
};
export const Example = ExampleStory.bind({});
