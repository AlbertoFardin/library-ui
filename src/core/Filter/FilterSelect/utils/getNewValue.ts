import { IFilterSelectItem } from "../IFilterSelect";

interface IGetNewValue {
  options: IFilterSelectItem[];
  value: string[];
  maxItems: number;
  slcId: string;
}

const getNewValue = ({
  options,
  value,
  maxItems,
  slcId,
}: IGetNewValue): IFilterSelectItem[] => {
  const slcOpt = options.find((v) => v.id === slcId);
  const newValue = value
    .map((vId) => {
      return options.find((o) => o.id === vId);
    })
    .filter((o) => {
      return !!o;
    });
  const itemIndex = newValue.findIndex((o) => o.id === slcId);
  const itemExist = itemIndex !== -1;

  if (maxItems === 1) return itemExist ? [] : [slcOpt];
  // exist index => remove item to new value
  // no exist index => add item to new value
  if (itemExist) {
    newValue.splice(itemIndex, 1);
  } else {
    if (!maxItems || newValue.length < maxItems) {
      newValue.push(slcOpt);
    } else {
      console.warn("FilterMultiSelect: limit of selected items");
    }
  }

  return newValue;
};

export default getNewValue;
