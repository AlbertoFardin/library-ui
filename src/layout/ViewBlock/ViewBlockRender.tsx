import * as React from "react";
import { createUseStyles } from "react-jss";
import {
  IItemRender,
  IViewBlockItem,
  cellTypeFooter,
  cellTypeHeader,
  cellTypeEmptys,
} from "./utils";
import { PopoverOrigin } from "../../core/Popover";
import { IItemDecorator } from "./interfaces";

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
  itemHeader: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  itemFooter: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  itemsSelectedId: string[];
  itemsSelectedType: string[];
  columnCount: number;
  items: IViewBlockItem[];
  onContextMenu: (event: React.MouseEvent, open: boolean) => void;
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
    itemsSelectedId,
    itemsSelectedType,
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
        return itemHeader(data);
      case cellTypeFooter:
        return itemFooter(data);
      default:
        return itemRender({
          id,
          type,
          size: [itemWidth, itemHeight(type)],
          data,
          color,
          selected: !!itemsSelectedId.find((i) => i === id),
          selectedIds: itemsSelectedId,
          selectedTypes: itemsSelectedType,
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
    itemsSelectedId,
    itemsSelectedType,
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
