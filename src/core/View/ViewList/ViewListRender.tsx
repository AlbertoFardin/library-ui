import * as React from "react";
import {
  IItemRender,
  IViewListColumn,
  IViewListItem,
  rowTypeHeader,
  rowTypeFooter,
} from "./utils";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../../theme";
import mixColors from "../../../utils/mixColors";
import { PopoverOrigin } from "../../Popover";
import { IKeyDown } from "../../BtnBase";

export const listitemBorder = 1;

const useStyles = createUseStyles({
  itemBlock: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTop: `${listitemBorder}px solid transparent`,
    borderBottom: `${listitemBorder}px solid ${mixColors(
      0.5,
      getTheme().colors.grayBorder,
      getTheme().colors.background,
    )}`,
  },
});

export interface IViewListRenderData {
  color: string;
  items: IViewListItem[];
  itemsIdSelected: string[];
  itemWidth: number;
  itemHeight: number;
  itemRender: (p: IItemRender) => JSX.Element | React.ReactNode;
  itemHeader: (type: string, index: number) => JSX.Element | React.ReactNode;
  itemFooter: (type: string, index: number) => JSX.Element | React.ReactNode;
  columns: IViewListColumn[];
  columnsShow: boolean[];
  padding: number[];
  onContextMenu: (
    event: React.MouseEvent,
    keyDown: IKeyDown,
    open: boolean,
  ) => void;
  contextmenuOriginAnchor: PopoverOrigin;
  contextmenuOriginTransf: PopoverOrigin;
  contextmenuPosizionZone: 1 | 2 | 3 | 4;
}

interface IViewListRender {
  style?: React.CSSProperties;
  index: number;
  data;
}
const ViewListRender = ({
  style,
  index,
  data: dataRender,
}: IViewListRender) => {
  const classes = useStyles({});
  const {
    color,
    items,
    itemsIdSelected,
    itemWidth,
    itemHeight,
    itemRender,
    itemHeader,
    itemFooter,
    columns,
    columnsShow,
    padding,
    onContextMenu,
    contextmenuOriginAnchor,
    contextmenuOriginTransf,
    contextmenuPosizionZone,
  }: IViewListRenderData = dataRender;
  const item: IViewListItem = items[index];
  const { id, type, data } = item;

  const getChildren = React.useCallback(() => {
    switch (type) {
      case null:
      case undefined:
        return null;
      case rowTypeHeader:
        return itemHeader(data.type, data.index);
      case rowTypeFooter:
        return itemFooter(data.type, data.index);
      default:
        return itemRender({
          id,
          type,
          size: [itemWidth - padding[0] - padding[1], itemHeight],
          data,
          color,
          selected: !!itemsIdSelected.find((i) => i === id),
          selectedIds: itemsIdSelected,
          columns,
          columnsShow,
          onContextMenu,
          contextmenuOriginAnchor,
          contextmenuOriginTransf,
          contextmenuPosizionZone,
        });
    }
  }, [
    color,
    columns,
    columnsShow,
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
    padding,
    type,
  ]);

  return (
    <div
      key={index}
      className={classes.itemBlock}
      style={{ ...style, padding: `0 ${padding[0]}px 0 ${padding[1]}px` }}
      children={getChildren()}
    />
  );
};

export default ViewListRender;
