import * as React from "react";
import Btn, { IBtn } from "../../Btn";
import Cell from "../Cell";
import CellAvatar from "./CellAvatar";
import CellIcon from "./CellIcon";
import CellUser from "./CellUser";
import CellThumbs from "./CellThumbs";
import CellString from "./CellString";
import CellCategory from "./CellCategory";
import CellSkeleton from "./CellSkeleton";
import isEmpty from "lodash-es/isEmpty";
import TypeCell from "../TypeCell";
import {
  ICellClick,
  IRenderCellContent,
  IColumn,
  ICellUserData,
} from "../interfaces";
import getValueString from "../getValueString";
import { IPopoverListItem } from "../../PopoverList";
import { IRenderer } from "../../StickyTable";

export interface ICellContentData {
  value;
  loading: boolean;
  column: IColumn;
  rowThumbnailSize: number;
  rowContextmenu?: IPopoverListItem[];
  rowOnClick?: (p: ICellClick) => void;
  rowOnContextMenu?: (p: ICellClick) => void;
  rowOnCopyToClipboard?: (s: string) => void;
  renderCell?: (p: IRenderCellContent) => JSX.Element;
  renderPlaceholder?: (p: IRenderCellContent) => JSX.Element;
  overrideCellMap?: { [keyError: string]: IBtn };
  getUser: (userId: string) => ICellUserData;
}
export interface ICellContent extends IRenderer {
  data: ICellContentData;
}

const CellContent = ({
  columnIndex,
  rowIndex,
  style,
  data,
  selected,
  disabled,
  highligh,
}: ICellContent) => {
  const {
    value,
    column,
    loading,
    rowThumbnailSize,
    rowContextmenu,
    rowOnClick,
    rowOnContextMenu,
    rowOnCopyToClipboard,
    renderCell,
    renderPlaceholder,
    overrideCellMap,
    getUser,
  } = data;

  if (!!renderPlaceholder && data.value == undefined) {
    return renderPlaceholder({
      columnData: column,
      columnIndex,
      rowIndex,
      selected,
      disabled,
      highligh,
      style,
      contextmenu: rowContextmenu,
      onClick: rowOnClick,
      onContextMenu: rowOnContextMenu,
      onCopyToClipboard: rowOnCopyToClipboard,
    });
  }

  if (renderCell) {
    const cell = renderCell({
      columnData: column,
      columnIndex,
      rowIndex,
      selected,
      disabled,
      highligh,
      style,
      contextmenu: rowContextmenu,
      onClick: rowOnClick,
      onContextMenu: rowOnContextMenu,
      onCopyToClipboard: rowOnCopyToClipboard,
    });
    if (cell) return cell;
  }

  if (new Set(Object.keys(overrideCellMap)).has(value)) {
    return (
      <Cell
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        selected={selected}
        disabled={disabled}
        highligh={highligh}
        style={style}
        contextmenu={rowContextmenu}
        onClick={rowOnClick}
        onContextMenu={rowOnContextMenu}
        children={
          <Btn
            variant="bold"
            label="?"
            style={{ margin: 0, minWidth: 0 }}
            {...overrideCellMap[value]}
          />
        }
      />
    );
  }

  switch (column.type) {
    case TypeCell.Thumbnail:
    case TypeCell.MultipleThumbnail:
      return (
        <CellThumbs
          value={isEmpty(value) ? [] : value}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          thumbnailSize={rowThumbnailSize}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
          loading={loading}
        />
      );
    case TypeCell.MultipleAvatar:
    case TypeCell.Avatar:
      return (
        <CellAvatar
          value={value}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
        />
      );
    case TypeCell.Icon:
      return (
        <CellIcon
          value={value}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
        />
      );
    case TypeCell.Category:
      return (
        <CellCategory
          value={value}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
        />
      );
    case TypeCell.User:
      return (
        <CellUser
          value={value}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
          onCopyToClipboard={rowOnCopyToClipboard}
          getUser={getUser}
        />
      );
    case TypeCell.Skeleton:
      return (
        <CellSkeleton
          style={style}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
        />
      );
    default:
      return (
        <CellString
          value={getValueString(value, column.type)}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          selected={selected}
          disabled={disabled}
          highligh={highligh}
          style={style}
          contextmenu={rowContextmenu}
          onContextMenu={rowOnContextMenu}
          onClick={rowOnClick}
          onCopyToClipboard={rowOnCopyToClipboard}
        />
      );
  }
};
export default CellContent;
