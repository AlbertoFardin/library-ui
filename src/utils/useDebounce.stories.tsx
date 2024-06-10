import * as React from "react";
import useDebounce from "./useDebounce";
import InputNumber from "../stories/InputNumber";
import InputText from "../stories/InputText";
import Text from "../core/Text";
import Divider from "../core/Divider";

export default {
  title: "Utils/useDebounce",
};

const DemoComponent = () => {
  const [debounce, setDebounce] = React.useState(1000);
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("prova a scrivere velocemente...");
  const onText = React.useCallback(
    (v: string) => {
      setText(v);
      setCount(count + 1);
    },
    [count],
  );
  const countDebounced = useDebounce(count, debounce);

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
        children="useDebounce"
      />
      <Text
        style={{ margin: 10 }}
        children="è una funzione di utilità che dato in ingresso uno stato che cambia rapidamente ed un tempo di ritardo, restituisce dopo tale ritardo il valore finale di tale dello stato"
      />
      <Text
        style={{ margin: 10 }}
        children="questa funzione è utile in tutti quei componenti che devono evitare di far scattare molte volte il loro render"
      />
      <Divider style={{ margin: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InputNumber
          label="Debounce time (millesecondi)"
          value={debounce}
          onChange={setDebounce}
        />
        <InputText label="Testo" value={text} onChange={onText} />
      </div>
      <Text style={{ margin: 10 }} size={4} children={`Counter: ${count}`} />
      <Text
        style={{ margin: 10 }}
        size={4}
        children={`Counter + Debounce: ${countDebounced}`}
      />
    </div>
  );
};

export const Demo = DemoComponent.bind({});
