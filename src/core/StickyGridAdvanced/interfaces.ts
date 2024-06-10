import { IMngSet, IMngSetPayload, IMngChipGroup } from "../WindowMngSets";
import { IColumn, ICommonStickyGrid } from "../StickyGrid";

export interface IStickyGridAdvanced extends ICommonStickyGrid {
  columns: IColumn[];
  columnsSortMax: number;
  columnsChipsTooltip?: (col: IColumn) => string;
  columnsGroups?: IMngChipGroup[];
  columnsSets?: IMngSet[];
  columnsSetsOwnerId: string;
  columnsSetsContext: string;
  columnsSetsSelectedId: string;
  columnsSetsOnCreateSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<IMngSet>;
  columnsSetsOnSharedSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  columnsSetsOnRemoveSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  columnsSetsOnUpdateSet: (
    context: string,
    setId: string,
    setPayload: IMngSetPayload,
  ) => Promise<void>;
  columnsSetsOnChanged: (
    context: string,
    selectedId: string,
    sets: IMngSet[],
  ) => void;
  columnsSetsGetShared: (context: string) => Promise<IMngSet[]>;
  onError: (msg: string) => void;
}
