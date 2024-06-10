import * as React from "react";
import { IViewTreeItem } from "./interfaces";
import ViewTree, { IViewTreeAction } from "./";
import mockItems from "./_mockItems.json";
import { action } from "@storybook/addon-actions";
import { SelectType } from "../../Checkbox";
import CardDemo from "../../../stories/CardDemo";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import InputText from "../../../stories/InputText";

const actions: IViewTreeAction[] = ["edit", "help"].map((icon) => ({
  icon,
  tooltip: "tooltip_" + icon,
  onClick: action("onClickAction_" + icon),
}));

const TreeViewDemo = () => {
  const [selectType, setSelectType] = React.useState(SelectType.NONE);
  const [expanded, setExpanded] = React.useState([] as string[]);
  const [selected, setSelected] = React.useState([] as string[]);
  const [showActions, setShowActions] = React.useState(true);
  const [items, setItems] = React.useState(mockItems as IViewTreeItem[]);

  const onTreeViewClick = React.useCallback(
    (id: string) => {
      action("onClick")(id);
      const ids = Array.from(selected);
      const index = ids.findIndex((i) => i === id);
      if (index === -1) {
        ids.push(id);
      } else {
        ids.splice(index, 1);
      }
      setSelected(ids);
    },
    [selected],
  );
  const onTreeViewToggle = React.useCallback(
    (id: string) => {
      action("onToggle")(id);
      const ids = Array.from(expanded);
      const index = ids.findIndex((i) => i === id);
      if (index === -1) {
        ids.push(id);
      } else {
        ids.splice(index, 1);
      }
      setExpanded(ids);
    },
    [expanded],
  );
  const onChangeItems = React.useCallback((s: string) => {
    try {
      setItems(JSON.parse(s));
    } catch {
      console.warn("onChangeItems");
    }
  }, []);
  const onChangeExpanded = React.useCallback((s: string) => {
    setExpanded(s.split(", "));
  }, []);
  const onChangeSelected = React.useCallback((s: string) => {
    setSelected(s.split(", "));
  }, []);
  const onExpandAll = React.useCallback(() => {
    setExpanded(expanded.length ? [] : items.map((c) => c.id));
  }, [expanded.length, items]);
  const onSelectAll = React.useCallback(() => {
    setSelected(selected.length ? [] : items.map((c) => c.id));
  }, [items, selected.length]);

  const onSelectTypeNone = React.useCallback(() => {
    setSelectType(SelectType.NONE);
  }, []);
  const onSelectTypeRadio = React.useCallback(() => {
    setSelectType(SelectType.RADIO);
  }, []);
  const onSelectTypeCheck = React.useCallback(() => {
    setSelectType(SelectType.CHECK);
  }, []);
  const onShowActions = React.useCallback(() => {
    setShowActions(!showActions);
  }, [showActions]);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ViewTree
          color="#f00"
          style={{ margin: 15, maxWidth: 300 }}
          items={items}
          selectType={selectType}
          expanded={expanded}
          selected={selected}
          onClick={onTreeViewClick}
          onToggle={onTreeViewToggle}
          actions={showActions ? actions : undefined}
        />
      </div>
      <CardDemo>
        <InputButton
          label={expanded.length ? "COLLAPSE ALL" : "EXPAND ALL"}
          onChange={onExpandAll}
        />
        <InputButton
          label={selected.length ? "DESELECT ALL" : "SELECT ALL"}
          onChange={onSelectAll}
        />
        <InputBoolean
          value={showActions}
          label="Show Actions"
          onChange={onShowActions}
        />
        <InputBoolean
          value={selectType === SelectType.NONE}
          label="SelectType - NONE"
          onChange={onSelectTypeNone}
        />
        <InputBoolean
          value={selectType === SelectType.RADIO}
          label="SelectType - RADIO"
          onChange={onSelectTypeRadio}
        />
        <InputBoolean
          value={selectType === SelectType.CHECK}
          label="SelectType - CHECK"
          onChange={onSelectTypeCheck}
        />

        <InputText
          label="expanded ids"
          value={expanded.join(", ")}
          onChange={onChangeExpanded}
        />
        <InputText
          label="selected ids"
          value={selected.join(", ")}
          onChange={onChangeSelected}
        />
        <InputText
          label="items JSON"
          value={JSON.stringify(items, null, "\t")}
          onChange={onChangeItems}
          style={{ minHeight: 300 }}
          textarea
        />
      </CardDemo>
    </div>
  );
};

export default TreeViewDemo;
