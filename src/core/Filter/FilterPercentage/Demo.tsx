import * as React from "react";
import { action } from "@storybook/addon-actions";
import FilterPercentage, { PercentageRange } from ".";
import Btn from "../../Btn";
import Text from "../../Text";

const DemoFilterPercentage = () => {
  const [value, setValue] = React.useState(undefined as PercentageRange);
  const onClickCount = React.useCallback(() => console.log("onClickCount"), []);
  const cbOnChange = React.useCallback((v) => {
    setValue(v.value);
    action("onChange")(v.value);
  }, []);
  const onClick0 = React.useCallback(() => setValue(null), []);
  const onClick1 = React.useCallback(() => setValue([25, 50]), []);
  const onClick2 = React.useCallback(() => setValue([40, 70]), []);
  const onClick3 = React.useCallback(() => setValue([0, 100]), []);

  return (
    <div>
      <FilterPercentage
        id={"_id"}
        label={"FilterPercentage"}
        onChange={cbOnChange}
        onClickCount={onClickCount}
        value={value}
        style={{ width: 350 }}
      />
      <br />
      percentage:
      <Text weight="bolder" children={`value: ${JSON.stringify(value)}`} />
      <br />
      <br />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"RESET"}
        onClick={onClick0}
      />
      <br />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [25,50] (invalid)"}
        onClick={onClick1}
      />
      <br />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [40,70]"}
        onClick={onClick2}
      />
      <br />
      <Btn
        color="#00f"
        variant="bold"
        icon="edit"
        label={"set [0,100]"}
        onClick={onClick3}
      />
    </div>
  );
};

export default DemoFilterPercentage;
