import { sortStrings } from "../../../utils/sort";
import { IKeyDown } from "../../BtnBase";
import { PopoverOrigin } from "../../Popover";

export const cellHeightDefault = 50;
export const cellTypeEmptys = "//cellTypeEmptys";
export const cellTypeHeader = "//cellTypeHeader";
export const cellTypeFooter = "//cellTypeFooter";

export const getRowCount = (props: {
  itemsCount: number;
  columnCount: number;
}) => {
  const { itemsCount, columnCount } = props;
  const resto = itemsCount % columnCount;
  const total = itemsCount ? Math.trunc(itemsCount / columnCount) : 0;
  return resto ? total + 1 : total;
};

export const itemCountInRow = (props: {
  listWidth: number;
  cellWidth: number;
}) => {
  const { listWidth, cellWidth } = props;
  const columns = listWidth / cellWidth;
  return Math.max(1, Math.trunc(columns));
};

export const getEmptyCellCount = (props: {
  itemsCount: number;
  columns: number;
}): number => {
  const { itemsCount, columns } = props;
  const rowsInt = Math.trunc(itemsCount / columns);
  const itemsOdd = itemsCount - rowsInt * columns;
  const placeholderToAdd = columns - itemsOdd;
  if (
    !itemsCount ||
    !columns ||
    placeholderToAdd === columns ||
    placeholderToAdd < 0
  ) {
    return 0;
  }
  return placeholderToAdd;
};

interface IGetItemsDecoration {
  type: string;
  items: IViewBlockItem[];
  columnCount: number;
  needHeader: {
    [type: string]: boolean;
  };
  needFooter: {
    [type: string]: boolean;
  };
}
const getItemsDecoration = ({
  type,
  items,
  columnCount,
  needHeader,
  needFooter,
}: IGetItemsDecoration): {
  header: IViewBlockItem[];
  footer: IViewBlockItem[];
  emptys: IViewBlockItem[];
} => {
  let header = [];
  let footer = [];
  let emptys = [];

  const columnsArray = new Array(columnCount);
  columnsArray.fill(0);
  const emptyCount = getEmptyCellCount({
    itemsCount: items.length,
    columns: columnCount,
  });

  if (!!needHeader && needHeader[type] === true) {
    header = columnsArray.map((c, index) => ({
      id: `header_${type}_${index}`,
      type: cellTypeHeader,
      data: { type, index, count: columnCount },
    }));
  }
  if (!!needFooter && needFooter[type] === true) {
    footer = columnsArray.map((c, index) => ({
      id: `footer_${type}_${index}`,
      type: cellTypeFooter,
      data: { type, index, count: columnCount },
    }));
  }
  if (emptyCount > 0) {
    emptys = new Array(emptyCount);
    emptys.fill({ type: cellTypeEmptys, data: {} });
  }

  return {
    header,
    footer,
    emptys,
  };
};

interface IPrepareItems {
  items: IViewBlockItem[];
  itemsTypeSort: string[];
  needHeader: {
    [type: string]: boolean;
  };
  needFooter: {
    [type: string]: boolean;
  };
  columnCount: number;
}
export const prepareItems = ({
  items,
  itemsTypeSort,
  needHeader,
  needFooter,
  columnCount,
}: IPrepareItems): IViewBlockItem[] => {
  const types = sortStrings(
    Array.from(new Set(items.map((a) => a.type))),
    itemsTypeSort,
  );

  return types.reduce((acc: IViewBlockItem[], type: string) => {
    const itemsGroup = items.filter((a) => a.type === type);
    const { header, footer, emptys } = getItemsDecoration({
      type,
      items: itemsGroup,
      needHeader,
      needFooter,
      columnCount,
    });
    acc = acc.concat(header, itemsGroup, emptys, footer);
    return acc;
  }, []);
};

export interface IViewBlockItem {
  id: string;
  type: string;
  data;
}

export const getKeyRender = (array: IViewBlockItem[]) => {
  return array
    .map((a) => a.id)
    .sort()
    .join();
};

export interface IItemRender extends IViewBlockItem {
  size: [w: number, h: number];
  color: string;
  selected: boolean;
  selectedIds: string[];
  onContextMenu: (
    event: React.MouseEvent,
    keyDown: IKeyDown,
    open: boolean,
  ) => void;
  contextmenuOriginAnchor: PopoverOrigin;
  contextmenuOriginTransf: PopoverOrigin;
  contextmenuPosizionZone: 1 | 2 | 3 | 4;
}
