import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewListAsset, { IViewListAsset } from ".";
import { IPopoverListItem } from "../../PopoverList";
import { IPreview } from "../../Preview";
import DemoAsset from "./Demo";

const contextmenu: IPopoverListItem[] = [
  {
    id: "1",
    label: "item_1",
    onClick: action("onClick menu item_0"),
  },
  {
    id: "2",
    label: "item_2",
    onClick: action("onClick menu item_1"),
  },
  {
    id: "3",
    label: "item_3",
    onClick: action("onClick menu item_2"),
  },
];
const args: IViewListAsset = {
  style: { margin: 25 },
  width: 500,
  height: 50,
  color: "#00f",
  contextmenu,
  label: "label",
  icon: "image",
};

export default {
  title: "Core/View/ViewListAsset",
  component: ViewListAsset,
  args,
};

const Story = (args) => (
  <div
    style={{
      height: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflowX: "hidden",
      overflowY: "hidden",
    }}
  >
    <ViewListAsset {...args} />
  </div>
);

const DemoStory = () => <DemoAsset />;
export const Demo = DemoStory.bind({});

export const Default = Story.bind({});

export const Selected = Story.bind({});
Selected.args = {
  selected: true,
};

export const PreviewImage = Story.bind({});
const previewImage: IPreview = {
  srcUrl: "./images/width_128/test_image1.jpeg",
  mimeType: "image/jpeg",
  previewWidth: 40,
  previewHeight: 40,
  style: { background: "#fff", marginRight: 10 },
};
PreviewImage.args = {
  preview: previewImage,
  selected: true,
};
