import * as React from "react";
import { action } from "@storybook/addon-actions";
import AssetCheckbox from ".";

export default {
  title: "Core/AssetCheckbox",
  component: AssetCheckbox,
};

const Story = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <AssetCheckbox
      style={{ margin: 10 }}
      color="#00f"
      icon="image"
      type="mousehover"
      mouseHover={false}
      onClick={action("onClick")}
    />
    <AssetCheckbox
      style={{ margin: 10 }}
      color="#00f"
      icon="image"
      type="mousehover"
      mouseHover={true}
      onClick={action("onClick")}
    />
    <AssetCheckbox
      style={{ margin: 10 }}
      color="#00f"
      icon="image"
      type="mousehover"
      mouseHover={false}
      selected={false}
      onClick={action("onClick")}
    />
    <AssetCheckbox
      style={{ margin: 10 }}
      color="#00f"
      icon="image"
      type="mousehover"
      mouseHover={true}
      selected={true}
      onClick={action("onClick")}
    />
  </div>
);

export const Example = Story.bind({});
