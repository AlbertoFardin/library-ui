import * as React from "react";
import CatchCode, { IListener, KeyMap } from ".";

export default {
  title: "core/CatchCode",
  component: CatchCode,
};

const DemoComponent = () => {
  const [text, setText] = React.useState("uno");
  const onText = React.useCallback((event) => {
    setText(event.target.value);
  }, []);
  const onPresEsc = React.useCallback(() => {
    alert("you have press ESC");
  }, []);
  const onPresTest = React.useCallback(() => {
    alert(`you have write: ${text}`);
  }, [text]);
  const listeners: IListener[] = React.useMemo(
    () => [
      { toCatch: KeyMap.Escape, onCatch: onPresEsc },
      { toCatch: text, onCatch: onPresTest },
    ],
    [onPresEsc, onPresTest, text],
  );

  return (
    <div
      style={{
        height: "inherit",
        width: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <input
          type="string"
          style={{ width: 250, margin: 5 }}
          value={text}
          onChange={onText}
        />
      </div>
      <CatchCode listeners={listeners}>
        <div
          style={{
            border: "1px solid #f00",
            flex: 1,
          }}
        >
          <p>try to focus here and</p>
          <p>pres ESC or type {text}</p>
        </div>
      </CatchCode>
    </div>
  );
};

export const Example = DemoComponent.bind({});
