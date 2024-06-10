import * as React from "react";
import { IViewListColumn } from "./utils";
import Toolbar from "../../Toolbar";
import { IPopoverListItem } from "../../PopoverList";
import Btn from "../../Btn";
import { ISortOrder } from "../../../interfaces";
import BorderShadow from "../../BorderShadow";

export const toolbarHeight = 50;

interface IViewListToolbarItem {
  index: number;
  color: string;
  column: IViewListColumn;
  onClick?: (id: string, order: ISortOrder) => void;
  sortId?: string;
  sortOrder?: ISortOrder;
}
const ViewListToolbarItem = ({
  index,
  color,
  column,
  onClick,
  sortId,
  sortOrder,
}: IViewListToolbarItem) => {
  const { id, label, width, sortable } = column;
  const disabled = !sortable || !onClick;
  const cbClickText = React.useCallback(() => {
    onClick(id, ISortOrder.ASC);
  }, [id, onClick]);
  const cbClickIcon = React.useCallback(() => {
    const newOrder =
      sortOrder === ISortOrder.ASC ? ISortOrder.DESC : ISortOrder.ASC;
    onClick(id, newOrder);
  }, [id, onClick, sortOrder]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: !index ? 1 : undefined,
        width,
        marginLeft: !index ? 12 : 0,
      }}
    >
      <Btn
        disabled={disabled}
        style={{ opacity: 1, marginLeft: "-10px" }}
        color={color}
        label={label}
        onClick={cbClickText}
        tooltip={disabled ? undefined : `Sort by ${label}`}
      />
      {sortId !== id ? null : (
        <Btn
          disabled={disabled}
          style={{ opacity: 1, margin: 0, borderRadius: 100 }}
          color={color}
          onClick={cbClickIcon}
          icon={
            sortOrder === ISortOrder.ASC ? "arrow_upward" : "arrow_downward"
          }
          tooltip={
            disabled ? undefined : "Reverse the direction of the sorting"
          }
        />
      )}
    </div>
  );
};

export interface IViewListToolbar {
  color: string;
  contextmenu: IPopoverListItem[];
  columns: IViewListColumn[];
  columnsShow: boolean[];
  columnsSortId?: string;
  columnsSortOrder?: ISortOrder;
  padding: number[];
  width: number;
  onColumnSort?: (id: string, order: ISortOrder) => void;
  scrolled: boolean;
}

const ViewListToolbar = ({
  color,
  contextmenu,
  columns,
  columnsShow,
  columnsSortId,
  columnsSortOrder,
  padding,
  width,
  onColumnSort,
  scrolled,
}: IViewListToolbar) => (
  <>
    <Toolbar
      style={{
        zIndex: 1,
        height: toolbarHeight,
        width,
        maxWidth: width,
        minWidth: width,
        boxSizing: "border-box",
        padding: `0 ${padding[0] + 1}px 0 ${padding[1]}px`,
      }}
    >
      {columns
        .filter((c, index) => {
          return columnsShow[index];
        })
        .map((c, index) => (
          <ViewListToolbarItem
            key={c.id}
            color={color}
            index={index}
            column={c}
            onClick={onColumnSort}
            sortId={columnsSortId}
            sortOrder={columnsSortOrder}
          />
        ))}
      {!contextmenu.length ? null : (
        <Btn
          color={color}
          icon="more_vert"
          style={{ margin: "0 5px 0 0" }}
          menu={{ items: contextmenu }}
        />
      )}
    </Toolbar>
    <BorderShadow
      position="top"
      shadow={scrolled}
      style={{ top: toolbarHeight }}
    />
  </>
);

export default ViewListToolbar;
