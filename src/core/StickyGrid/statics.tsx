import * as React from "react";
import { ICellRenderer, ICellUserData, IColumn, IGridRow } from "./interfaces";
import CellString from "./CellContent/CellString";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";

export const columnsPadding = 10;
export const columnsWidthDefault = 120;
export const DATE_FORMAT = "DD/MM/YYYY";
export const renderCellEmpty = (p: ICellRenderer) => (
  <CellString {...p} value="" />
);
export const getCellValueDefault = (rowData, column: IColumn) => {
  return rowData[column.id];
};
export const getUserDefault = (): ICellUserData => ({
  id: "",
  name: "Unknown User",
  avatar: "",
  avatarIcon: "person_outline",
  avatarText: "",
});
export const getSidebarValueDefault = (): string => "";
export const rowHeightDefault = () => 160;
export const emptyArray = [];
export const getManagerPosition = (managerRef): [number, number] => {
  if (!managerRef.current) return [0, 0];
  const { left, top } = managerRef.current.getBoundingClientRect();
  return [left + 30, top];
};
export const getIdsRef = (rows): string => rows.map((r) => r.id).join();
interface IGetSetsResizedProps {
  selectedId: string;
  sets: IMngSet[];
  columnSize: number;
  columnIndex: number;
}
interface IGetSetsResizedResult {
  sets: IMngSet[];
  setId: string;
  setPayload: IMngSetPayload;
}
export const getSetsResized = ({
  selectedId: setId,
  sets,
  columnSize,
  columnIndex,
}: IGetSetsResizedProps): IGetSetsResizedResult => {
  let setPayload: IMngSetPayload = undefined;
  const newSets = sets.map((s) => {
    if (s.id !== setId) return s;
    setPayload = {
      ...s.payload,
      items: s.payload.items.map((item, i) => {
        if (i !== columnIndex) return item;
        return { ...item, width: columnSize };
      }),
    };
    return { ...s, payload: setPayload };
  });
  return {
    sets: newSets,
    setId,
    setPayload,
  };
};

export const getRowSelectedIndex = (
  rows: IGridRow[],
  rowsSelected: string[],
): number[] => {
  return rowsSelected.map((slcId) => {
    return rows.findIndex((r) => r.id === slcId);
  });
};
