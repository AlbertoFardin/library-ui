import { IFilterBase, IChangesBase } from "../interfaces";

export type PercentageRange = [number, number];

export interface IChangesPercentage extends IChangesBase<PercentageRange> {}

interface IFilterPercentage
  extends IFilterBase<PercentageRange, IChangesPercentage> {
  /* The granularity with which the slider can step through values. */
  step?: number;
}

export default IFilterPercentage;
