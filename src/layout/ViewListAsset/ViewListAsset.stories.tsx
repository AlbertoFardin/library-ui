import { action } from "@storybook/addon-actions";
import ViewListAsset, { IViewListAsset } from ".";
import { IPopoverListItem } from "../../core/PopoverList";
import { IPreview } from "../../core/Preview";
import DemoAsset from "./Demo";
import Card from "../../core/Card";

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
  width: 500,
  height: 50,
  color: "#00f",
  contextmenu,
  label: "label",
  icon: "image",
};

export default {
  title: "layout/ViewListAsset",
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
    <Card style={{ overflow: "hidden", width: "fit-content", margin: 25 }}>
      <ViewListAsset {...args} />
    </Card>
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
