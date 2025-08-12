import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { IViewTreeAction, IViewTreeItem } from "./interfaces";
import getChildren from "./getChildren";
import Text from "../../core/Text";
import Icon from "../../core/Icon";
import BtnBase from "../../core/BtnBase";
import BtnCollapse from "./BtnCollapse";
import BtnAction from "./BtnAction";
import Collapse from "../../core/Transitions/Collapse";
import hexToRgbA from "../../utils/hexToRgbA";
import { getTheme } from "../../theme";
import Checkbox, { SelectType } from "../../core/Checkbox";

const SIZE = 30;

interface IStyles {
  color: string;
  parent: string;
  noChild: boolean;
  isSelected: boolean;
}
const useStyles = createUseStyles({
  treeItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflow: "hidden",
    borderLeft: ({ parent }: IStyles) =>
      !parent ? "none" : `1px solid ${getTheme().colors.grayBorder}`,
    marginLeft: ({ parent }: IStyles) => (!parent ? 0 : 13),
  },
  btnClick: {
    color: ({ color }: IStyles) => color,
    borderRadius: getTheme().borderRadius,
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "start",
    minHeight: SIZE,
    border: "1px solid transparent",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
    "&:hover $action": {
      transform: "scale(1)",
    },
  },
  btnClickSelected: {
    backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.1),
  },
  label: {
    flex: 1,
    padding: ({ noChild }: IStyles) => (noChild ? "0 2px" : 0),
  },
  icon: {
    margin: "0 5px",
    alignSelf: "center",
    height: "auto",
  },
  action: {
    transition: "all 250ms",
    transform: "scale(0)",
  },
  checkbox: {
    margin: "0 10px",
  },
});

interface IViewTreeItemCmp extends IViewTreeItem {
  color: string;
  items: IViewTreeItem[];
  expanded: string[];
  selected: string[];
  selectType: SelectType;
  actions: IViewTreeAction[];
  onClick: (id: string) => void;
  onToggle: (id: string) => void;
}

const ViewTreeItem = ({
  className,
  style,
  color,
  id,
  parent,
  label,
  icon,
  tooltip,
  loading,
  hasChildren,
  items,
  selected,
  expanded,
  selectType,
  actions,
  onClick,
  onToggle,
  disabled,
}: IViewTreeItemCmp) => {
  const isSelected = new Set(selected).has(id);
  const isExpanded = new Set(expanded).has(id);
  const children = getChildren(items, id);
  const noChild = !items.filter((c) => !!c.parent || !!c.hasChildren).length;
  const classes = useStyles({
    color,
    parent,
    noChild,
    isSelected,
  });
  const cbOnClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(id);
    },
    [onClick, id],
  );

  return (
    <div className={classes.treeItem}>
      <BtnBase
        color={color}
        className={classnames({
          [classes.btnClick]: true,
          [classes.btnClickSelected]: isSelected,
          [className]: !!className,
        })}
        style={style}
        onClick={cbOnClick}
        tooltip={tooltip}
        disabled={disabled}
      >
        <BtnCollapse
          color={color}
          id={id}
          size={SIZE}
          hasChildren={hasChildren || !!children.length}
          collapse={!isExpanded}
          onClick={onToggle}
          loading={loading}
        />
        {!icon ? null : <Icon className={classes.icon} children={icon} />}
        <Text ellipsis className={classes.label} children={label} />
        {disabled
          ? null
          : actions.map((a) => (
              <BtnAction
                className={classes.action}
                color={color}
                key={a.icon}
                listitemId={id}
                icon={a.icon}
                size={SIZE}
                tooltip={a.tooltip}
                onClick={a.onClick}
              />
            ))}
        {disabled ? null : (
          <Checkbox
            className={classes.checkbox}
            color={color}
            size={12}
            type={selectType}
            selected={isSelected}
          />
        )}
      </BtnBase>
      <Collapse open={isExpanded && !!children.length}>
        <>
          {children.map((c) => (
            <ViewTreeItem
              key={c.id}
              {...c}
              color={color}
              items={items}
              expanded={expanded}
              selected={selected}
              selectType={selectType}
              actions={actions}
              onClick={onClick}
              onToggle={onToggle}
            />
          ))}
        </>
      </Collapse>
    </div>
  );
};

export default ViewTreeItem;
