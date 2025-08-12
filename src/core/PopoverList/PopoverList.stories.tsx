import * as React from "react";
import { action } from "@storybook/addon-actions";
import PopoverList from "./PopoverList";
import InputFile from "../InputFile";
import CircularProgress from "../CircularProgress";
import { IGetAdditionalChildren } from "../ListItem";
import { getTheme } from "../../theme";
import { IPopoverListItem } from "./PopoverListItem";

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

export default {
  title: "core/PopoverList",
  component: PopoverList,
  args: {
    open: true,
    onClose: action("onClose"),
    actions: [
      {
        id: "font_download",
        label: "font_download",
        onClick: action("font_download"),
        icon: "font_download",
      },
    ],
  },
};

const Story = (args) => <PopoverList {...args} />;

export const Example = Story.bind({});

const actionsListCustom: IPopoverListItem[] = [
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
      },
      {
        color: getTheme().colors.theme1,
        id: "get_app",
        icon: "get_app",
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
];
export const ListCustom = Story.bind({});
ListCustom.args = {
  actions: actionsListCustom,
};

const actionsListVeryLong: IPopoverListItem[] = [];
for (let i = 0; i < 100; i++) {
  const id = `listitem with id: ${i}`;
  actionsListVeryLong.push({ id, label: id });
}
export const ListVeryLong = Story.bind({});
ListVeryLong.args = {
  actions: actionsListVeryLong,
};
