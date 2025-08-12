import { IViewTreeItem } from "./interfaces";

const getChildren = (
  items: IViewTreeItem[],
  parent?: string,
): IViewTreeItem[] => {
  return items.filter((c) => {
    if (!parent) return !c.parent;
    return c.parent === parent;
  });
};

export default getChildren;
