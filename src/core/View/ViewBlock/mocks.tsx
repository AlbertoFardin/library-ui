import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewBlockAsset from "../ViewBlockAsset";
import { IItemRender, IViewBlockItem } from ".";
import { IPopoverListItem } from "../../PopoverList";

export const urlImage = "./images/width_128/test_image1.jpeg";
export const urlImage2 = "./images/width_128/test_image2.jpeg";

export enum TYPE {
  FOLDER = "FOLDER",
  MEDIA = "MEDIA",
  TOUCHPOINT = "TOUCHPOINT",
  ANIMAL = "ANIMAL",
}

export const contextmenuView: IPopoverListItem[] = [
  {
    id: "1",
    label: "view_1",
    onClick: action("onClick menu view_0"),
  },
  {
    id: "2",
    label: "view_2",
    onClick: action("onClick menu view_1"),
  },
  {
    id: "3",
    label: "view_3",
    onClick: action("onClick menu view_2"),
  },
];
export const contextmenuItem: IPopoverListItem[] = [
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
export const itemRender = ({
  id,
  type,
  size,
  data: { label, placeholderIcon, srcUrl },
  color,
  selected,
  contextmenuOriginAnchor,
  contextmenuOriginTransf,
  contextmenuPosizionZone,
  onContextMenu,
}: IItemRender) => {
  switch (type) {
    case TYPE.MEDIA:
      return (
        <ViewBlockAsset
          key={id}
          width={size[0] - 10}
          preview={{
            placeholderIcon,
            srcUrl,
            mimeType: "image/jpeg",
            previewWidth: 100,
            previewHeight: 50,
          }}
          selected={selected}
          color={color}
          contextmenu={contextmenuItem}
          label={label}
          icon="insert_drive_file"
          onClick={action("onClick_" + id)}
          onDoubleClick={action("onDoubleClick_" + id)}
          onContextMenu={onContextMenu}
          contextmenuOriginAnchor={contextmenuOriginAnchor}
          contextmenuOriginTransf={contextmenuOriginTransf}
          contextmenuPosizionZone={contextmenuPosizionZone}
        />
      );
    case TYPE.TOUCHPOINT:
    case TYPE.FOLDER:
      return (
        <ViewBlockAsset
          key={id}
          width={size[0] - 10}
          selected={selected}
          color={color}
          contextmenu={contextmenuItem}
          label={label}
          icon="folder"
          onClick={action("onClick_" + id)}
          onDoubleClick={action("onDoubleClick_" + id)}
          onContextMenu={onContextMenu}
          contextmenuOriginAnchor={contextmenuOriginAnchor}
          contextmenuOriginTransf={contextmenuOriginTransf}
          contextmenuPosizionZone={contextmenuPosizionZone}
        />
      );
    default:
      return <div children="- NO_TYPE -" />;
  }
};
export const itemHeight = (rowType) => {
  switch (rowType) {
    case TYPE.MEDIA: {
      return 120;
    }
    case TYPE.FOLDER: {
      return 50;
    }
    default: {
      return 50;
    }
  }
};
export const items: IViewBlockItem[] = [
  {
    type: TYPE.MEDIA,
    id: "image_1",
    data: { label: "image_1", placeholderIcon: "photo", srcUrl: urlImage },
  },
  {
    type: TYPE.FOLDER,
    id: "folder_1",
    data: { label: "folder_1" },
  },
  {
    type: TYPE.FOLDER,
    id: "folder_2",
    data: { label: "folder_2" },
  },
  {
    type: TYPE.TOUCHPOINT,
    id: "touchpoint_2",
    data: { label: "touchpoint_1" },
  },
  {
    type: TYPE.ANIMAL,
    id: "cat_2",
    data: { label: "cat_1" },
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
  {
    type: TYPE.MEDIA,
    id: "image_4",
    data: { label: "image_4", placeholderIcon: "photo", srcUrl: urlImage },
  },
  {
    type: TYPE.MEDIA,
    id: "image_5",
    data: { label: "image_5", placeholderIcon: "photo", srcUrl: urlImage },
  },
  {
    type: TYPE.MEDIA,
    id: "love_1",
    data: { label: "love_1", placeholderIcon: "photo", srcUrl: urlImage2 },
  },
  {
    type: TYPE.MEDIA,
    id: "love_2",
    data: { label: "love_2", placeholderIcon: "photo", srcUrl: urlImage2 },
  },
];
