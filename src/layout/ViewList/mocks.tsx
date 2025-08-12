import { action } from "@storybook/addon-actions";
import Text from "../../core/Text";
import ViewListAsset from "../ViewListAsset";
import { IItemRender, IViewListItem, IViewListColumn } from ".";
import { IPopoverListItem } from "../../core/PopoverList";

export enum TYPE {
  FOLDER = "FOLDER",
  MEDIA = "MEDIA",
  PORTAL = "PORTAL",
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
const getIcon = (type: string) => {
  switch (type) {
    case TYPE.MEDIA:
      return "image";
    case TYPE.FOLDER:
      return "folder";
    case TYPE.PORTAL:
      return "cast";
    default:
      return "help";
  }
};
export const itemRender = ({
  id,
  type,
  size,
  data,
  color,
  selected,
  columns,
  columnsShow,
  onContextMenu,
  contextmenuOriginAnchor,
  contextmenuOriginTransf,
  contextmenuPosizionZone,
}: IItemRender) => (
  <ViewListAsset
    width={size[0]}
    height={size[1]}
    selected={selected}
    color={color}
    label={data.label}
    icon={getIcon(type)}
    onClick={action("onClick_" + id)}
    onDoubleClick={action("onDoubleClick_" + id)}
    onContextMenu={onContextMenu}
    contextmenu={contextmenuItem}
    contextmenuOriginAnchor={contextmenuOriginAnchor}
    contextmenuOriginTransf={contextmenuOriginTransf}
    contextmenuPosizionZone={contextmenuPosizionZone}
  >
    {columns
      .filter((_, index) => columnsShow[index] && index !== 0)
      .map(({ id, width }) => (
        <div key={id} style={{ width }}>
          <Text children={data[id]} />
        </div>
      ))}
  </ViewListAsset>
);
const itemsMedia: IViewListItem[] = [0, 1, 2, 3, 4, 5, 6, 7].map((n) => ({
  type: TYPE.MEDIA,
  id: "media_" + n,
  data: {
    label: "media_" + n,
    data1: "data1_" + n,
    data2: "data2_" + n,
    data3: "data3_" + n,
  },
}));
const itemsFolder: IViewListItem[] = [0, 1, 2, 3].map((n) => ({
  type: TYPE.FOLDER,
  id: "folder_" + n,
  data: {
    label: "folder_" + n,
    data1: "data1_" + n,
    data2: "data2_" + n,
    data3: "data3_" + n,
  },
}));
const itemsTouchpoint: IViewListItem[] = [0, 1].map((n) => ({
  type: TYPE.PORTAL,
  id: "touchpoint_" + n,
  data: {
    label: "touchpoint_" + n,
    data1: "data1_" + n,
    data2: "data2_" + n,
    data3: "data3_" + n,
  },
}));
const itemsAnimal: IViewListItem[] = [0].map((n) => ({
  type: TYPE.ANIMAL,
  id: "animal_" + n,
  data: {
    label: "animal_" + n,
    data1: "data1_" + n,
    data2: "data2_" + n,
    data3: "data3_" + n,
  },
}));
export const items: IViewListItem[] = [].concat(
  itemsAnimal,
  itemsMedia,
  itemsFolder,
  itemsTouchpoint,
);
export const columns: IViewListColumn[] = [
  "Name",
  "data1",
  "data2",
  "data3",
].map((id) => ({
  id,
  label: id,
  width: 100,
  sortable: true,
}));

export const itemHeight = () => 50;
export const itemHeight2 = (rowType: string) => {
  switch (rowType) {
    case TYPE.MEDIA:
      return 120;
    case TYPE.FOLDER:
      return 50;
    default:
      return 50;
  }
};
