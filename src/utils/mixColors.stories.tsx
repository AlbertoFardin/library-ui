import * as React from "react";
import { action } from "@storybook/addon-actions";
import mixColors from "./mixColors";
import InputText from "../stories/InputText";
import Text from "../core/Text";
import Divider from "../core/Divider";

export default {
  title: "utils/mixColors",
};

const DemoComponent = () => {
  const [perc, setPerc] = React.useState(0.25);
  const [color1, setColor1] = React.useState("#64ffec");
  const [color2, setColor2] = React.useState("#fcff00");
  const [result, setResult] = React.useState(mixColors(perc, color1, color2));

  const handlePercChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      let perc = 0;
      if (isNaN(value)) {
        perc = 0;
      } else if (value < -1) {
        perc = -1;
      } else if (value > 1) {
        perc = 1;
      } else {
        perc = value;
      }
      setPerc(perc);
      setResult(mixColors(perc, color1, color2));
    },
    [color1, color2],
  );

  const handleColor1 = React.useCallback(
    (color1) => {
      setColor1(color1);
      setResult(mixColors(perc, color1, color2));
    },
    [perc, color2],
  );

  const handleColor2 = React.useCallback(
    (color2) => {
      setColor2(color2);
      setResult(mixColors(perc, color1, color2));
    },
    [perc, color1],
  );
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
        children="è una funzione di utilità che serve per mixare due colore esadecimali in base ad una percentuale compresa tra -1 ed 1 dove i valori negativi fanno scambiare l'ordine dei due colori."
      />
      <Divider style={{ margin: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "5px",
            padding: "5px",
          }}
        >
          <Text style={{ margin: 5 }}>Percentuale</Text>
          <input
            type="number"
            step="0.01"
            min="-1"
            max="1"
            value={perc}
            onChange={handlePercChange}
            style={{ padding: "5px", width: "100px" }}
          />
        </div>
        <InputText
          style={{ backgroundColor: color1 }}
          label="Color1 Value"
          value={color1}
          onChange={handleColor1}
        />
        <InputText
          style={{ backgroundColor: color2 }}
          label="Color2 Value"
          value={color2}
          onChange={handleColor2}
        />
      </div>
      <InputText
        style={{ backgroundColor: result || "#ffffff", width: "initial" }}
        label="Result"
        value={result || ""}
        disabled
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
