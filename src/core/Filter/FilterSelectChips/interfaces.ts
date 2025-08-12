import { IChip } from "../../Chip";
import { IMngChipGroup, IMngChipValue } from "../../../layout/WindowMngSets";

export interface IFacetToggleAction {
  id: string;
  selected: boolean;
  label: string;
  width: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface IFacetToggle {
  className?: string;
  style?: React.CSSProperties;
  help?: string;
  color?: string;
  label?: string;
  actions: IFacetToggleAction[];
  onChange: (id: string) => void;
}

export interface IFilterSelectChips {
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  labelMandatory?: boolean;
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  chipsSelected: string[];
  chipsValues: IMngChipValue[];
  chipsGroups: IMngChipGroup[];
  onChange: (newSelected: string[]) => void;
  getChip?: (chipValue: IMngChipValue) => IChip;
  disabled?: boolean;
  showFilterMandatory?: boolean;
}
