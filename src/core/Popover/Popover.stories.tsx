import * as React from "react";
import Popover from ".";
import DemoCmp from "./Demo";

export default {
  title: "Core/Popover",
  component: Popover,
};

export const Demo = DemoCmp.bind({});

const ExampleStory = (args) => {
  const btnRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const onOpen = React.useCallback(() => setOpen(true), []);
  const onClose = React.useCallback(() => setOpen(false), []);

  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        border: "1px solid #f00",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button ref={btnRef} onClick={onOpen} children="CLICK ME" />
      <Popover
        {...args}
        open={open}
        onClose={onClose}
        anchorEl={btnRef.current}
        anchorReference="anchorEl"
        originAnchor={{
          vertical: "bottom",
          horizontal: "left",
        }}
        originTransf={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div style={{ padding: 20 }}> The content of the Popover</div>
      </Popover>
    </div>
  );
};
export const Example = ExampleStory.bind({});

export const Custom = ExampleStory.bind({});
Custom.args = {
  style: { backgroundColor: "#f00", padding: 50 },
};
