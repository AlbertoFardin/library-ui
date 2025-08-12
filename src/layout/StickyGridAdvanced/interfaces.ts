import {
  IMngSet,
  IMngSetPayload,
  IMngChipGroup,
  IMngLevel,
} from "../WindowMngSets";
import { IColumn, ICommonStickyGrid } from "../StickyGrid";

export interface IStickyGridAdvanced extends ICommonStickyGrid {
  columnsSortMax: number;
  columnsChipsTooltip?: (col: IColumn) => string;
  columnsGroups?: IMngChipGroup[];
  columnsSets?: IMngSet[];
  columnsSetsOwnerId: string;
  columnsSetsContext: string;
  columnsSetsSelectedId: string;
  columnsSetsOnCreateSet: (
    context: string,
    payload: IMngSetPayload,
  ) => Promise<IMngSet>;
  columnsSetsOnRemoveSet: (context: string, id: string) => Promise<void>;
  columnsSetsOnUpdateSet: (context: string, set: IMngSet) => Promise<IMngSet>;
  columnsSetsOnChanged: (
    context: string,
    selectedId: string,
    sets: IMngSet[],
  ) => void;
  columnsSetsEnableShared?: boolean;
  columnsSetsOnSharedUpsert?: (context: string, setId: string) => Promise<void>;
  columnsSetsOnSharedDelete?: (context: string, setId: string) => Promise<void>;
  columnsSetsGetItemsShared?: (context: string) => Promise<IMngSet[]>;
  columnsSetsEnableLevels?: boolean;
  columnsSetsOnLevelsUpdate?: (
    context: string,
    levels: IMngLevel[],
  ) => Promise<void>;
  columnsSetsGetItemsLevels?: (context) => Promise<IMngLevel[]>;
  onError: (msg: string) => void;
}
