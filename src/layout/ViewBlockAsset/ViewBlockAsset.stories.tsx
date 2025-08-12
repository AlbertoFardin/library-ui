import { action } from "@storybook/addon-actions";
import ViewBlockAsset, { IViewBlockAsset } from ".";
import AssetExtension from "../../core/AssetExtension";
import { IPreview } from "../../core/Preview";
import { IPopoverListItem } from "../../core/PopoverList";
import DemoAsset from "./Demo";
import DemoAssetFolderCover from "./DemoFolderCover";

const previewWidth = 230;
const previewHeight = 160;
const contextmenu: IPopoverListItem[] = [
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
    buttons: [
      {
        id: "delete",
        icon: "delete",
      },
      {
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
];

const args: IViewBlockAsset = {
  style: { margin: 25 },
  icon: "image",
  label: "image_label.png",
  onCheck: action("onCheck"),
  onClick: action("onClick"),
  onContextMenu: action("onContextMenu"),
  onDoubleClick: action("onDoubleClick"),
  contextmenu,
  color: "#f00",
  width: 250,
};
export default {
  title: "layout/ViewBlockAsset",
  component: ViewBlockAsset,
  args,
};

const DemoStory = () => <DemoAsset />;
export const Demo = DemoStory.bind({});

const DemoStoryFolderCover = () => <DemoAssetFolderCover />;
export const DemoFolderCover = DemoStoryFolderCover.bind({});

const Story = (args) => <ViewBlockAsset {...args} />;

export const Default = Story.bind({});

export const Selected = Story.bind({});
Selected.args = {
  selected: true,
};

export const Disabled = Story.bind({});
Disabled.args = {
  disabled: true,
};

export const Ellipsised = Story.bind({});
Ellipsised.args = {
  label: "abcdefghilmnopqrstuvz1234567890_abcdefghilmnopqrstuvz1234567890",
};

export const PreviewImage = Story.bind({});
const previewImage: IPreview = {
  srcUrl: "./images/width_128/test_image1.jpeg",
  mimeType: "image/jpeg",
  previewWidth,
  previewHeight,
};
PreviewImage.args = {
  preview: previewImage,
  children: (
    <AssetExtension
      mimeType="image/png"
      style={{ position: "absolute", bottom: 10, right: 10 }}
    />
  ),
};

export const PreviewVideo = Story.bind({});
const previewVideo: IPreview = {
  srcUrl: "./video/width_128/test_video.mp4",
  mimeType: "video/mp4",
  previewWidth,
  previewHeight,
};
PreviewVideo.args = {
  preview: previewVideo,
  children: (
    <AssetExtension
      mimeType="video/mp4"
      style={{ position: "absolute", bottom: 10, right: 10 }}
    />
  ),
};
