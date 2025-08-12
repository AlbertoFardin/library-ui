import * as React from "react";
import { action } from "@storybook/addon-actions";
import hexToHsl from "./hexToHsl";
import InputText from "../stories/InputText";
import Text from "../core/Text";
import Divider from "../core/Divider";

export default {
  title: "utils/hexToHsl",
};

const DemoComponent = () => {
  const [color, setColor] = React.useState("#64ffec");
  const result = hexToHsl(color);

  action("onChange")({
    color,
    result,
  });

  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        weight="bolder"
        size={3}
        style={{ margin: 10 }}
        children="hexToHsl"
      />
      <Text
        style={{ margin: 10 }}
        children="è una funzione di utilità che serve a trasformare un colore esadecimale in HSL"
      />
      <Divider style={{ margin: 10 }} />
      <InputText
        style={{ backgroundColor: color }}
        label="Color1 Value"
        value={color}
        onChange={setColor}
      />
      <InputText
        style={{ width: "initial" }}
        label="Result"
        value={JSON.stringify(result)}
        disabled
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
