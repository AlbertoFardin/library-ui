import * as React from "react";
import {
  IItemRender,
  IViewBlockItem,
  cellTypeFooter,
  cellTypeHeader,
  cellTypeEmptys,
} from "./utils";
import { createUseStyles } from "react-jss";
import { IKeyDown } from "../../BtnBase";
import { PopoverOrigin } from "../../Popover";

const useStyles = createUseStyles({
  itemBlock: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export interface IViewBlockRenderData {
  color: string;
  itemWidth: number;
  itemHeight: (type: string) => number;
  itemRender: (p: IItemRender) => JSX.Element | React.ReactNode;
  itemHeader: (
    type: string,
    index: number,
    count: number,
  ) => JSX.Element | React.ReactNode;
  itemFooter: (
    type: string,
    index: number,
    count: number,
  ) => JSX.Element | React.ReactNode;
  itemsIdSelected: string[];
  columnCount: number;
  items: IViewBlockItem[];
  onContextMenu: (
    event: React.MouseEvent,
    keyDown: IKeyDown,
    open: boolean,
  ) => void;
  contextmenuOriginAnchor: PopoverOrigin;
  contextmenuOriginTransf: PopoverOrigin;
  contextmenuPosizionZone: 1 | 2 | 3 | 4;
}

interface IViewBlockRender {
  style?: React.CSSProperties;
  columnIndex: number;
  rowIndex: number;
  data;
}
const ViewBlockRender = ({
  style,
  columnIndex,
  rowIndex,
  data: dataRender,
}: IViewBlockRender) => {
  const classes = useStyles({});
  const {
    color,
    itemWidth,
    itemHeight,
    itemRender,
    itemHeader,
    itemFooter,
    itemsIdSelected,
    columnCount,
    items,
    onContextMenu,
    contextmenuOriginAnchor,
    contextmenuOriginTransf,
    contextmenuPosizionZone,
  }: IViewBlockRenderData = dataRender;

  const index = (rowIndex + 1) * columnCount - (columnCount - columnIndex);
  const item: IViewBlockItem = items[index];
  const { id, type, data } = item;

  const getChildren = React.useCallback(() => {
    switch (type) {
      case null:
      case undefined:
      case cellTypeEmptys:
        return null;
      case cellTypeHeader:
        return itemHeader(data.type, data.index, data.count);
      case cellTypeFooter:
        return itemFooter(data.type, data.index, data.count);
      default:
        return itemRender({
          id,
          type,
          size: [itemWidth, itemHeight(type)],
          data,
          color,
          selected: !!itemsIdSelected.find((i) => i === id),
          selectedIds: itemsIdSelected,
          onContextMenu,
          contextmenuOriginAnchor,
          contextmenuOriginTransf,
          contextmenuPosizionZone,
        });
    }
  }, [
    color,
    contextmenuOriginAnchor,
    contextmenuOriginTransf,
    contextmenuPosizionZone,
    data,
    id,
    itemFooter,
    itemHeader,
    itemHeight,
    itemRender,
    itemWidth,
    itemsIdSelected,
    onContextMenu,
    type,
  ]);

  return (
    <div
      key={index}
      className={classes.itemBlock}
      style={style}
      children={getChildren()}
    />
  );
};

export default ViewBlockRender;
