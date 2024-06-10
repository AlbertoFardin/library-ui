import * as React from "react";
import { action } from "@storybook/addon-actions";
import Btn from "../Btn";
import PopoverList from "./PopoverList";
import InputFile from "../InputFile";
import CircularProgress from "../CircularProgress";
import { IGetAdditionalChildren } from "../ListItem";
import { getTheme } from "../../theme";

const AdditionalChildren = ({ onClose }: IGetAdditionalChildren) => {
  const cbOnChangeInput = React.useCallback(
    (event) => {
      onClose(event);
      action("onChangeInput")(event);
      console.log("onChangeInput", event.target.files);
    },
    [onClose],
  );

  return (
    <>
      <InputFile acceptFiles={"*"} onChangeInput={cbOnChangeInput} multiple />
      <CircularProgress size={15} />
    </>
  );
};

const Demo = (args) => {
  const rootRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const onOpen = React.useCallback(() => setOpen(true), []);
  const onClose = React.useCallback(() => setOpen(false), []);

  return (
    <div
      style={{
        width: "inherit",
        height: 150,
        border: "1px solid red",
        boxSizing: "border-box",
      }}
    >
      <Btn label="OPEN" onClick={onOpen} />
      <div
        ref={rootRef}
        style={{
          width: 15,
          height: 15,
          margin: "0 200px",
          backgroundColor: "red",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      />
      {!open ? null : (
        <PopoverList
          {...args}
          open={open}
          onClose={onClose}
          anchorEl={rootRef.current}
        />
      )}
    </div>
  );
};

export default {
  title: "Core/PopoverList",
  component: PopoverList,
  args: {
    open: false,
    onClose: action("onClose"),
    actions: [
      {
        id: "font_download",
        label: "font_download",
        onClick: action("font_download"),
        icon: "font_download",
        disabled: true,
      },
      {
        id: "file_copy",
        label: "file_copy",
        onClick: action("file_copy"),
        icon: "file_copy",
      },
      {
        id: "send",
        label: "send",
        onClick: action("send"),
        icon: "send",
      },
      {
        divider: true,
        id: "edit",
        label: "edit",
        onClick: action("edit"),
        icon: "edit",
      },
      {
        divider: true,
        id: "Action_1",
        label: "Action_1",
        onClick: action("Action_1"),
        buttonsEverVisible: true,
        buttons: [
          {
            color: getTheme().colors.theme1,
            id: "delete",
            icon: "delete",
            variant: "bold",
            small: true,
          },
          {
            color: getTheme().colors.theme1,
            id: "get_app",
            icon: "get_app",
            variant: "bold",
            small: true,
          },
        ],
      },
      {
        id: "Action_2",
        label: "Action_2",
        onClick: action("Action_2"),
        buttons: [
          {
            id: "get_app",
            icon: "get_app",
          },
        ],
      },
      {
        divider: true,
        id: "upload",
        label: "upload22",
        onClick: action("Upload"),
        getAdditionalChildren: AdditionalChildren,
      },
    ],
  },
};

const Story = (args) => <Demo {...args} />;

export const Default = Story.bind({});
