import * as React from "react";
import { createUseStyles } from "react-jss";
import {
  IItemRender,
  IViewListColumn,
  IViewListItem,
  rowTypeHeader,
  rowTypeFooter,
} from "./utils";
import { getTheme } from "../../theme";
import mixColors from "../../utils/mixColors";
import { PopoverOrigin } from "../../core/Popover";
import { IItemDecorator } from "../ViewBlock";
import Divider from "../../core/Divider";

const useStyles = createUseStyles({
  itemBlock: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export interface IViewListRenderData {
  color: string;
  items: IViewListItem[];
  itemsSelectedId: string[];
  itemsSelectedType: string[];
  itemWidth: number;
  itemHeight: (type: string) => number;
  itemRender: (p: IItemRender) => JSX.Element | React.ReactNode;
  itemHeader: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  itemFooter: (p: IItemDecorator) => JSX.Element | React.ReactNode;
  columns: IViewListColumn[];
  columnsShow: boolean[];
  onContextMenu: (event: React.MouseEvent, open: boolean) => void;
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
  const {
    color,
    items,
    itemsSelectedId,
    itemsSelectedType,
    itemWidth,
    itemHeight,
    itemRender,
    itemHeader,
    itemFooter,
    columns,
    columnsShow,
    onContextMenu,
    contextmenuOriginAnchor,
    contextmenuOriginTransf,
    contextmenuPosizionZone,
  }: IViewListRenderData = dataRender;
  const classes = useStyles({});
  const item: IViewListItem = items[index];
  const itemNext: IViewListItem = items[index - 1];
  const { id, type, data } = item || {};

  const selected = itemsSelectedId.some((i) => i === id);
  const selectedNext = !!itemsSelectedId.some((i) => i === itemNext?.id || "");

  const getChildren = React.useCallback(() => {
    switch (type) {
      case null:
      case undefined:
        return null;
      case rowTypeHeader:
        return itemHeader(data);
      case rowTypeFooter:
        return itemFooter(data);
      default:
        return itemRender({
          id,
          type,
          size: [itemWidth, itemHeight(type)],
          data,
          color,
          selected,
          selectedIds: itemsSelectedId,
          selectedTypes: itemsSelectedType,
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
    itemsSelectedId,
    itemsSelectedType,
    onContextMenu,
    selected,
    type,
  ]);

  return (
    <div key={index} className={classes.itemBlock} style={style}>
      {!item || index === 0 || selected || selectedNext ? null : (
        <Divider
          style={{ margin: "0 15px" }}
          color={mixColors(
            0.5,
            getTheme().colors.grayBorder,
            getTheme().colors.background,
          )}
        />
      )}
      {getChildren()}
    </div>
  );
};

export default ViewListRender;
