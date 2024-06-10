import * as React from "react";
import PercentageSlider from "./SliderPercentage";
import Btn from "../Btn";
import { action } from "@storybook/addon-actions";
import { PercentageRange } from "../Filter/FilterPercentage";

const DemoStory = () => {
  const [value, setValue] = React.useState(undefined as PercentageRange);
  const cbOnChange = React.useCallback((v) => {
    setValue(v);
    action("onChange")(v);
  }, []);

  const onClick0 = React.useCallback(() => setValue(null), []);
  const onClick1 = React.useCallback(() => setValue([0, 0]), []);
  const onClick2 = React.useCallback(() => setValue([10, 20]), []);
  const onClick3 = React.useCallback(() => setValue([50, 50]), []);
  const onClick4 = React.useCallback(() => setValue([0, 100]), []);
  const onClick5 = React.useCallback(() => setValue([15, 50]), []);

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          border: "1px solid red",
          boxSizing: "border-box",
          width: 250,
          padding: 20,
          margin: 20,
        }}
      >
        <PercentageSlider onChange={cbOnChange} range={value} />
      </div>

      <Btn variant="bold" label={`value: ${JSON.stringify(value)}`} />
      <br />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set null"}
        onClick={onClick0}
      />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [0,0]"}
        onClick={onClick1}
      />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [10,20]"}
        onClick={onClick2}
      />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [50,50]"}
        onClick={onClick3}
      />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [0,100]"}
        onClick={onClick4}
      />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [15,100]"}
        onClick={onClick5}
      />
    </div>
  );
};

export default DemoStory;
