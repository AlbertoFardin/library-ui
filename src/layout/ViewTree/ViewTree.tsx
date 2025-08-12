import { IViewTree } from "./interfaces";
import emptyFn from "../../utils/emptyFn";
import getChildren from "./getChildren";
import ViewTreeItem from "./ViewTreeItem";
import { getTheme } from "../../theme";
import { SelectType } from "../../core/Checkbox";

const ViewTree = ({
  style,
  className,
  color = getTheme().colors.theme1,
  items,
  expanded = [],
  selected = [],
  actions = [],
  onClick = emptyFn,
  onToggle = emptyFn,
  selectType = SelectType.NONE,
}: IViewTree) => (
  <div style={style} className={className}>
    {getChildren(items).map((c) => (
      <ViewTreeItem
        key={c.id}
        {...c}
        color={color}
        items={items}
        selectType={selectType}
        expanded={expanded}
        selected={selected}
        actions={actions}
        onClick={onClick}
        onToggle={onToggle}
      />
    ))}
  </div>
);

export default ViewTree;
