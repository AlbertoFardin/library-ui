import * as React from "react";
import { action } from "@storybook/addon-actions";
import setTextBold from "./setTextBold";
import InputText from "../stories/InputText";
import Text from "../core/Text";
import Divider from "../core/Divider";

export default {
  title: "utils/setTextBold",
};

const DemoComponent = () => {
  const [textAll, setTextAll] = React.useState(
    "The quick brown fox jumps over the lazy dog",
  );
  const [textBld, setTextBld] = React.useState("quick");
  const result = setTextBold(textBld, textAll, {
    color: "#fff",
    backgroundColor: "#f00",
    padding: "0 5px",
    borderRadius: 5,
  });

  action("onChange")({
    textAll,
    textBld,
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
        children="setTextBold"
      />
      <Text
        style={{ margin: 10 }}
        children="è una funzione di utilità che serve per cercare ed evidenziare parole all'interno di un testo"
      />
      <Divider style={{ margin: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputText
          style={{ backgroundColor: textAll }}
          label="Testo"
          value={textAll}
          onChange={setTextAll}
        />
        <InputText
          style={{ backgroundColor: textBld }}
          label="Parole da evidenziare"
          value={textBld}
          onChange={setTextBld}
        />
      </div>
      <Text
        weight="lighter"
        style={{ margin: 10 }}
        size={3}
        children={result}
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
