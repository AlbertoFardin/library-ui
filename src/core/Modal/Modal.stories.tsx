import * as React from "react";
import Modal, { IModal } from "./";
import emptyFn from "../../utils/emptyFn";
import DemoCmp from "./Demo";
import TextLoading from "../TextLoading";

const args: IModal = {
  open: true,
  onClose: emptyFn,
  title: "ModalTitle",
  titleHelp: "_titleHelp_",
  titleChildren: <div style={{ background: "#afa" }}>TITLE</div>,
  content: <div style={{ background: "#faa" }}>CONTENT</div>,
  actions: (
    <>
      <TextLoading />
      <div style={{ flex: 1 }} />
      <div style={{ background: "#aaf" }}>ACTIONS</div>
    </>
  ),
};

export default {
  title: "Core/Modal",
  component: Modal,
  args,
};

export const Demo = DemoCmp.bind({});

const ExampleStory = (args) => <Modal {...args} />;
export const Example = ExampleStory.bind({});

export const MaxDimensions = ExampleStory.bind({});
MaxDimensions.args = {
  style: {
    width: 90000,
    height: 90000,
  },
};

export const Loading = ExampleStory.bind({});
Loading.args = {
  loading: true,
};

const OnClickStory = () => {
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
      }}
    >
      <button onClick={onOpen}>CLICK ME</button>
      <Modal open={open} onClose={onClose} />
    </div>
  );
};
export const OnClick = OnClickStory.bind({});
