import * as React from "react";
import Checkbox, { SelectType } from ".";
import Text from "../Text";
import BtnBase from "../BtnBase";
import { getTheme } from "../../theme";

const color = "#f00";

export default {
  title: "Core/Checkbox",
  component: Checkbox,
};

const ExampleStory = () => {
  const [selected, setSelected] = React.useState(false);
  const onClick = React.useCallback(() => {
    setSelected(!selected);
  }, [selected]);

  return (
    <div style={{ margin: 25 }}>
      {Object.keys(SelectType).map((t: SelectType) => (
        <BtnBase
          color={color}
          key={t}
          style={{
            margin: 5,
            padding: "5px 10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: `1px solid ${selected ? color : getTheme().colors.grayBorder}`,
            borderRadius: getTheme().borderRadius,
            backgroundColor: getTheme().colors.background,
          }}
          onClick={onClick}
        >
          <Checkbox
            style={{ marginRight: 10 }}
            color={color}
            type={t}
            selected={selected}
          />
          <Text children={t} />
        </BtnBase>
      ))}
    </div>
  );
};
export const Example = ExampleStory.bind({});
