import { sortStrings } from "../../utils/sort";
import { PopoverOrigin } from "../../core/Popover";
import { IItemDecorator } from "./interfaces";

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
    [type: string]: number;
  };
  needFooter: {
    [type: string]: number;
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
  const columnsArray = new Array(columnCount);
  columnsArray.fill(0);

  const header = [];
  if (!!needHeader && !!needHeader[type]) {
    const totalRows = needHeader[type];
    for (let indexRow = 0; indexRow < needHeader[type]; indexRow++) {
      columnsArray.forEach((_, indexCol) => {
        const data: IItemDecorator = {
          type,
          indexRow,
          indexCol,
          totalRows,
          totalCols: columnCount,
        };
        header.push({
          id: `header_${type}_${indexCol}/${indexRow}`,
          type: cellTypeHeader,
          data,
        });
      });
    }
  }

  const footer = [];
  if (!!needFooter && !!needFooter[type]) {
    const totalRows = needFooter[type];
    for (let indexRow = 0; indexRow < needFooter[type]; indexRow++) {
      columnsArray.forEach((_, indexCol) => {
        const data: IItemDecorator = {
          type,
          indexRow,
          indexCol,
          totalRows,
          totalCols: columnCount,
        };
        footer.push({
          id: `footer_${type}_${indexCol}/${indexRow}`,
          type: cellTypeFooter,
          data,
        });
      });
    }
  }

  const emptyCount = getEmptyCellCount({
    itemsCount: items.length,
    columns: columnCount,
  });
  let emptys = [];
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
    [type: string]: number;
  };
  needFooter: {
    [type: string]: number;
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
  selectedTypes: string[];
  onContextMenu: (event: React.MouseEvent, open: boolean) => void;
  contextmenuOriginAnchor: PopoverOrigin;
  contextmenuOriginTransf: PopoverOrigin;
  contextmenuPosizionZone: 1 | 2 | 3 | 4;
}
