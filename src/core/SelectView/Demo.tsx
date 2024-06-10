import * as React from "react";
import SelectView, { SelectViewType } from ".";
import Toolbar from "../Toolbar";
import Text from "../Text";
import InputText from "../../stories/InputText";
import { action } from "@storybook/addon-actions";

const DemoSelectView = () => {
  const [color, setColor] = React.useState("#ff0000");
  const [value, setValue] = React.useState(SelectViewType.GRID);
  const onChange = React.useCallback((slc: SelectViewType) => {
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
        <SelectView
          color={color}
          style={{ margin: "0 20px" }}
          value={value}
          options={[
            SelectViewType.GRID,
            SelectViewType.BLOCK,
            SelectViewType.CALENDAR,
          ]}
          onChange={onChange}
        />
        <Text weight="bolder" children={`selected: ${value}`} />
      </Toolbar>
    </>
  );
};

export default DemoSelectView;
