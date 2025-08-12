import * as React from "react";
import { action } from "@storybook/addon-actions";
import SegmentedView, { SegmentedViewType } from ".";
import Toolbar from "../Toolbar";
import Text from "../Text";
import InputText from "../../stories/InputText";

const Demo = () => {
  const [color, setColor] = React.useState("#ff0000");
  const [value, setValue] = React.useState(SegmentedViewType.GRID);
  const onChange = React.useCallback((slc: SegmentedViewType) => {
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
        <SegmentedView
          color={color}
          style={{ margin: "0 20px" }}
          value={value}
          options={[
            SegmentedViewType.GRID,
            SegmentedViewType.BLOCK,
            SegmentedViewType.CALENDAR,
          ]}
          onChange={onChange}
        />
        <Text weight="bolder" children={`selected: ${value}`} />
      </Toolbar>
    </>
  );
};

export default Demo;
