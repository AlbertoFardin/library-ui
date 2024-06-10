import { sortStrings } from "../../../utils/sort";
import { IKeyDown } from "../../BtnBase";
import { PopoverOrigin } from "../../Popover";

export const rowTypeHeader = "//rowTypeHeader";
export const rowTypeFooter = "//rowTypeFooter";

export interface IViewListItem {
  id: string;
  type: string;
  data;
}

export interface IViewListColumn {
  id: string;
  label: string;
  width: number;
  sortable?: boolean;
}

export interface IItemRender extends IViewListItem {
  size: [w: number, h: number];
  color: string;
  selected: boolean;
  selectedIds: string[];
  columns: IViewListColumn[];
  columnsShow: boolean[];
  onContextMenu: (
    event: React.MouseEvent,
    keyDown: IKeyDown,
    open: boolean,
  ) => void;
  contextmenuOriginAnchor: PopoverOrigin;
  contextmenuOriginTransf: PopoverOrigin;
  contextmenuPosizionZone: 1 | 2 | 3 | 4;
}

export const getColumnsShow = (
  array: IViewListColumn[],
  width: number,
): boolean[] => {
  let listitemWidth = 0;

  return array.reduce((acc, c, index) => {
    if (index === 0) {
      const columnWidth = Math.max(200, array[0].width);
      listitemWidth = listitemWidth + columnWidth;
      acc.push(c);
      return acc;
    }

    const columnWidth = array[0].width;
    listitemWidth = listitemWidth + columnWidth;
    if (listitemWidth < width) acc.push(c);

    return acc;
  }, []);
};

export const getKeyRender = (array: IViewListItem[]) => {
  return array
    .map((a) => a.id)
    .sort()
    .join();
};

interface IGetItemsDecoration {
  type: string;
  needHeader: {
    [type: string]: boolean;
  };
  needFooter: {
    [type: string]: boolean;
  };
}
const getItemsDecoration = ({
  type,
  needHeader,
  needFooter,
}: IGetItemsDecoration): {
  header: IViewListItem[];
  footer: IViewListItem[];
} => {
  let header = [];
  if (!!needHeader && needHeader[type] === true) {
    header = [
      {
        id: `header_${type}`,
        type: rowTypeHeader,
        data: { type },
      },
    ];
  }

  let footer = [];
  if (!!needFooter && needFooter[type] === true) {
    footer = [
      {
        id: `footer_${type}`,
        type: rowTypeFooter,
        data: { type },
      },
    ];
  }

  return {
    header,
    footer,
  };
};

interface IPrepareItems {
  items: IViewListItem[];
  itemsTypeSort: string[];
  needHeader: {
    [type: string]: boolean;
  };
  needFooter: {
    [type: string]: boolean;
  };
}
export const prepareItems = ({
  items,
  itemsTypeSort,
  needHeader,
  needFooter,
}: IPrepareItems): IViewListItem[] => {
  const types = sortStrings(
    Array.from(new Set(items.map((a) => a.type))),
    itemsTypeSort,
  );
  return types.reduce((acc: IViewListItem[], type: string) => {
    const itemsGroup = items.filter((a) => a.type === type);
    const { header, footer } = getItemsDecoration({
      type,
      needHeader,
      needFooter,
    });
    acc = acc.concat(header, itemsGroup, footer);
    return acc;
  }, []);
};
