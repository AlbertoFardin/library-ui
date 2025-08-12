import { IChip } from "../../core/Chip";

export interface ISetCountCopy {
  title: string;
  placeholderLabel: string;
  placeholderIcon?: string;
}

export interface ISetCount {
  color: string;
  chips: IChip[];
  copy?: ISetCountCopy;
}
