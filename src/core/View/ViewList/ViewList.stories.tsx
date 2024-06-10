import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewList, { IViewList } from ".";
import { ISortOrder } from "../../../interfaces";
import { itemRender, items, columns, contextmenuView } from "./mocks";
import DemoCmp from "./Demo";

const args: IViewList = {
  color: "#00f",
  itemRender,
  itemHeight: 50,
  items,
  columns,
  columnsSortId: columns[0].id,
  columnsSortOrder: ISortOrder.ASC,
  contextmenu: contextmenuView,
  onColumnSort: action("onColumnSort"),
  onClick: action("onClick"),
  placeholderIcon: "help_center",
  placeholderLabel: "View is Empty",
};

export default {
  title: "Core/View/ViewList",
  component: ViewList,
  args,
};

const Story = (args) => (
  <div
    style={{
      height: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "row",
      position: "relative",
      overflowX: "hidden",
      overflowY: "hidden",
    }}
  >
    <ViewList {...args} />
  </div>
);

export const Demo = DemoCmp.bind({});

export const Default = Story.bind({});

export const Selected = Story.bind({});
Selected.args = {
  itemsIdSelected: items
    .filter((f, index) => index === 1 || index === 2 || index === 3)
    .map((f) => f.id),
};

export const Loading = Story.bind({});
Loading.args = {
  loading: true,
};

export const Placeholder = Story.bind({});
Placeholder.args = {
  items: [],
};
