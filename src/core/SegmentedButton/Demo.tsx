import * as React from "react";
import { action } from "@storybook/addon-actions";
import SegmentedButton, { ISegmentedButtonOption } from ".";
import Toolbar from "../Toolbar";
import Text from "../Text";
import InputText from "../../stories/InputText";

const options: ISegmentedButtonOption[] = [
  {
    id: "1",
    icon: "help",
    text: "help",
  },
  {
    id: "2",
    icon: "all_inclusive",
    text: "infinite",
  },
  {
    id: "3",
    icon: "attractions",
    text: "attractions",
  },
];

const Demo = () => {
  const [color, setColor] = React.useState("#ff0000");
  const [value, setValue] = React.useState("1");
  const onChange = React.useCallback((slc: string) => {
    action("onChange")(slc);
    setValue(slc);
  }, []);

  return (
    <>
      <InputText
        style={{ width: 250, margin: 20 }}
        label="color"
        value={color}
        onChange={setColor}
      />
      <Toolbar>
        <SegmentedButton
          color={color}
          style={{ margin: "0 20px" }}
          value={value}
          options={options}
          onChange={onChange}
        />
        <Text weight="bolder" children={`selected: ${value}`} />
      </Toolbar>
    </>
  );
};

export default Demo;
