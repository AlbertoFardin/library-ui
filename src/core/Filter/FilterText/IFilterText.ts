import { IFilterBase, IChangesBase } from "../interfaces";

export type TextValue = string | string[];

export interface IChangesText extends IChangesBase<TextValue> {
  switchCaseSensitive?: boolean;
  switchExactValue?: boolean;
  switchNoValue?: boolean;
}

interface IFilterText extends IFilterBase<TextValue, IChangesText> {
  /** If true, split value in array */
  multiline?: boolean;
  /** If valued, show checkbox "case sensitive" */
  switchCaseSensitive?: boolean;
  /** If valued, show checkbox "exact value" */
  switchExactValue?: boolean;
  /** If valued, show checkbox "no value" */
  switchNoValue?: boolean;
}

export default IFilterText;
