import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewBlock, { IViewBlock, IViewBlockItem } from ".";
import DemoCmp from "./Demo";
import {
  TYPE,
  itemRender,
  itemHeight,
  contextmenuView,
  urlImage,
} from "./mocks";

const items1: IViewBlockItem[] = [
  {
    type: TYPE.MEDIA,
    id: "image_1",
    data: { label: "image_1", placeholderIcon: "photo", srcUrl: urlImage },
  },
  {
    type: TYPE.MEDIA,
    id: "image_2",
    data: { label: "image_2", placeholderIcon: "photo", srcUrl: urlImage },
  },
  {
    type: TYPE.MEDIA,
    id: "image_3",
    data: { label: "image_3", placeholderIcon: "photo", srcUrl: urlImage },
  },
];

const args: IViewBlock = {
  color: "#00f",
  itemRender,
  itemWidth: 180,
  itemHeight,
  items: items1,
  contextmenu: contextmenuView,
  onClick: action("onClick"),
  placeholderIcon: "help_center",
  placeholderLabel: "View is Empty",
  itemsTypeSort: [TYPE.FOLDER, TYPE.MEDIA, TYPE.TOUCHPOINT],
};

export default {
  title: "Core/View/ViewBlock",
  component: ViewBlock,
  args,
};

const Story = (args) => (
  <div
    style={{
      height: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "row",
      position: "relative",
    }}
  >
    <ViewBlock {...args} />
  </div>
);

export const Demo = DemoCmp.bind({});

export const Default = Story.bind({});

export const Selected = Story.bind({});
Selected.args = {
  itemsIdSelected: ["image_1", "image_2"],
};

export const Loading = Story.bind({});
Loading.args = {
  loading: true,
};

export const Placeholder = Story.bind({});
Placeholder.args = {
  items: [],
};
