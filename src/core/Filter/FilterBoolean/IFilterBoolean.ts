import { IFilterBase, IChangesBase, FilterType } from "../interfaces";

export interface IChangesBoolean extends IChangesBase<boolean> {}

interface IFilterBoolean extends IFilterBase<boolean, IChangesBoolean> {
  type?: FilterType;
  i18n?: {
    itemYesLabel?: string;
    itemYesCount?: number;
    itemNoLabel?: string;
    itemNoCount?: number;
  };
}

export default IFilterBoolean;
