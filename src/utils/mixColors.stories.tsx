import * as React from "react";
import mixColors from "./mixColors";
import InputText from "../stories/InputText";
import InputNumber from "../stories/InputNumber";
import Text from "../core/Text";
import Divider from "../core/Divider";
import { action } from "@storybook/addon-actions";

export default {
  title: "Utils/mixColors",
};

const DemoComponent = () => {
  const [perc, setPerc] = React.useState(0.25);
  const [color1, setColor1] = React.useState("#64ffec");
  const [color2, setColor2] = React.useState("#fcff00");
  const result = mixColors(perc, color1, color2);

  action("onChange")({
    perc,
    color1,
    color2,
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
        children="mixColors"
      />
      <Text
        style={{ margin: 10 }}
        children="è una funzione di utilità che serve per mixare due colore esadecimali in mase ad una percentuale"
      />
      <Text
        style={{ margin: 10 }}
        children="in quale percentuale il primo colore si sovrappone al secondo colore?"
      />
      <Divider style={{ margin: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputNumber
          label="Color1 Percentuale (decimale)"
          value={perc}
          onChange={setPerc}
        />
        <InputText
          style={{ backgroundColor: color1 }}
          label="Color1 Value"
          value={color1}
          onChange={setColor1}
        />
        <InputText
          style={{ backgroundColor: color2 }}
          label="Color2 Value"
          value={color2}
          onChange={setColor2}
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
