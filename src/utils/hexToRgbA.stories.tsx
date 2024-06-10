import * as React from "react";
import hexToRgbA from "./hexToRgbA";
import InputText from "../stories/InputText";
import InputNumber from "../stories/InputNumber";
import Text from "../core/Text";
import Divider from "../core/Divider";
import { action } from "@storybook/addon-actions";

export default {
  title: "Utils/hexToRgbA",
};

const DemoComponent = () => {
  const [perc, setPerc] = React.useState(0.5);
  const [color, setColor] = React.useState("#64ffec");
  const result = hexToRgbA(color, perc);

  action("onChange")({
    perc,
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
        children="hexToRgbA"
      />
      <Text
        style={{ margin: 10 }}
        children="è una funzione di utilità che serve a trasformare un colore esadecimale in RGBA"
      />
      <Divider style={{ margin: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputNumber label="Opacity" value={perc} onChange={setPerc} />
        <InputText
          style={{ backgroundColor: color }}
          label="Color1 Value"
          value={color}
          onChange={setColor}
        />
      </div>
      <InputText
        style={{ backgroundColor: result, width: "initial" }}
        label="Result"
        value={result}
        disabled
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
