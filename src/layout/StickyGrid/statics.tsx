import { ICellRenderer, ICellUserData, IColumn, IGridRow } from "./interfaces";
import CellString from "./CellContent/CellString";
import { IMngSet, IMngSetPayload } from "../WindowMngSets";
import { ShareType } from "../../interfaces";
import TypeCell from "./TypeCell";

export const columnsPadding = 10;
export const columnsWidthDefault = 120;
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
const typeThumbs = new Set([TypeCell.Thumbnail, TypeCell.MultipleThumbnail]);
export const getRowHeight = ({
  columns,
  rowIndex,
  rowHeight,
}: {
  columns: IColumn[];
  rowIndex: number;
  rowHeight: (rowIndex: number) => number;
}): number => {
  if (!!rowHeight) return rowHeight(rowIndex);
  const someThumbs = columns.some((c) => typeThumbs.has(c.type));
  return someThumbs ? 170 : 50;
};
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
  setShareType: ShareType;
}
export const getSetsResized = ({
  selectedId: setId,
  sets,
  columnSize,
  columnIndex,
}: IGetSetsResizedProps): IGetSetsResizedResult => {
  let setPayload: IMngSetPayload = undefined;
  let setShareType: ShareType = undefined;
  const newSets = sets.map((s) => {
    if (s.id !== setId) return s;
    setPayload = {
      ...s.payload,
      items: s.payload.items.map((item, i) => {
        if (i !== columnIndex) return item;
        return { ...item, width: columnSize };
      }),
    };
    setShareType = s.shareType;
    return { ...s, payload: setPayload };
  });
  return {
    sets: newSets,
    setId,
    setPayload,
    setShareType,
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
