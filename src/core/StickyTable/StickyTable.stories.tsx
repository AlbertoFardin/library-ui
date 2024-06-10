import * as React from "react";
import DemoCmp from "./Demo";
import StickyTable from "./StickyTable";

export default {
  title: "Core/StickyTable",
  component: StickyTable,
};

const Story = () => <DemoCmp />;
export const Demo = Story.bind({});
