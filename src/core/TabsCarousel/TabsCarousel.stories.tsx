import * as React from "react";
import Text from "../Text";
import TabsCarousel from ".";

export default {
  title: "Core/TabsCarousel",
  component: TabsCarousel,
};

const icons = [
  "calendar_month",
  "cake",
  "brightness_7",
  "energy_savings_leaf",
  "favorite",
];

const Story = () => {
  const [value, setValue] = React.useState("tab_1");
  return (
    <TabsCarousel
      value={value}
      items={[1, 2, 3, 4, 5].map((x) => ({
        id: `tab_${x}`,
        tabIcon: icons[x - 1],
        tabLabel: `label_${x}`,
        tabTooltip: `tooltip_tab_${x}`,
        children: (
          <div>
            <Text
              size={3}
              style={{ padding: 10, textAlign: "center" }}
              children={String(x)}
            />
            <div style={{ height: 500 }} />
            <Text
              size={3}
              style={{ padding: 10, textAlign: "center" }}
              children="END"
            />
          </div>
        ),
      }))}
      onChange={setValue}
    />
  );
};
export const Example = Story.bind({});
