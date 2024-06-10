import * as React from "react";
import Switch from "./Switch";
import Toolbar from "../Toolbar";
import Text from "../Text";

const color = "#ffac00";
const tooltip = "__tooltip__";

const DemoSwitch = () => {
  const [checked, setChecked] = React.useState(true);
  const onChecked = React.useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  return (
    <>
      <Toolbar>
        <Switch
          tooltip={tooltip}
          onChange={onChecked}
          checked={checked}
          color={color}
          style={{ margin: "0 15px" }}
          icon="alt_route"
        />
        <Text children="PROVA icon" />
      </Toolbar>
      <Toolbar>
        <Switch
          tooltip={tooltip}
          onChange={onChecked}
          checked={checked}
          color={color}
          style={{ margin: "0 15px" }}
          icon={
            <Text
              children="Aa"
              style={{ fontSize: 12, lineHeight: "16px", width: "fit-content" }}
            />
          }
        />
        <Text children="PROVA label" />
      </Toolbar>
      <Toolbar>
        <Switch
          tooltip={tooltip}
          onChange={onChecked}
          checked={checked}
          color={color}
          style={{ margin: "0 15px" }}
          children={<Text children="Label" style={{ margin: "0 5px" }} />}
        />
        <Text children="PROVA label interna" />
      </Toolbar>
      <Toolbar>
        <Switch
          tooltip={tooltip}
          disabled
          onChange={onChecked}
          checked={checked}
          color={color}
          style={{ margin: "0 15px" }}
          children={<Text children="Label" style={{ margin: "0 5px" }} />}
        />
        <Text children="PROVA disabled" />
      </Toolbar>
    </>
  );
};

export default DemoSwitch;
