import * as React from "react";
import Tabs from "./Tabs";
import { getTheme } from "../../theme";

export default {
  title: "core/Tabs",
  component: Tabs,
};

const color = getTheme().colors.theme1;

const Story = () => {
  const [value, setValue] = React.useState("cake");
  const onValue = React.useCallback((id) => setValue(id), []);
  return (
    <div
      style={{
        border: `1px solid #f00`,
        margin: 20,
        padding: 10,
      }}
    >
      <Tabs
        style={{
          border: `1px solid ${color}`,
        }}
        color={color}
        value={value}
        items={[
          "calendar_month",
          "cake",
          "brightness_7",
          "energy_savings_leaf",
          "favorite",
        ].map((p: string) => ({
          id: p,
          icon: p,
          label: `label_${p}`,
          tooltip: `tooltip_tab_${p}`,
        }))}
        onChange={onValue}
      />
    </div>
  );
};
export const Example = Story.bind({});
