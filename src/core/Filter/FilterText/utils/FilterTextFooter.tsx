import * as React from "react";
import { getTheme } from "../../../../theme";
import Switch from "../../../Switch";
import BtnCheckbox from "../../../BtnCheckbox";
import Text from "../../../Text";

interface IFilterTextFooter {
  color: string;
  switchCaseSensitive?: boolean;
  switchExactValue?: boolean;
  switchNoValue?: boolean;
  onChange: (p: {
    switchCaseSensitive?: boolean;
    switchExactValue?: boolean;
    switchNoValue?: boolean;
  }) => void;
}

const FilterTextFooter = ({
  color,
  switchCaseSensitive,
  switchExactValue,
  switchNoValue,
  onChange,
}: IFilterTextFooter) => {
  const onChangeSwitchCaseSensitive = React.useCallback(
    (checked: boolean) => {
      onChange({
        switchCaseSensitive: checked,
        switchExactValue,
        switchNoValue,
      });
    },
    [onChange, switchExactValue, switchNoValue],
  );
  const onChangeSwitchExactValue = React.useCallback(
    (checked: boolean) => {
      onChange({
        switchCaseSensitive,
        switchExactValue: checked,
        switchNoValue,
      });
    },
    [onChange, switchCaseSensitive, switchNoValue],
  );
  const onChangeSwitchNoValue = React.useCallback(
    (newCheck: boolean) => {
      onChange({
        switchCaseSensitive,
        switchExactValue,
        switchNoValue: newCheck,
      });
    },
    [onChange, switchCaseSensitive, switchExactValue],
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {switchCaseSensitive === undefined || !!switchNoValue ? null : (
        <Switch
          color={getTheme().colors.theme1}
          style={{ marginRight: 5 }}
          tooltip="Search match case sensitive value"
          checked={switchCaseSensitive}
          onChange={onChangeSwitchCaseSensitive}
          icon={<Text style={{ fontSize: 12 }} children="Aa" />}
        />
      )}
      {switchExactValue === undefined || !!switchNoValue ? null : (
        <Switch
          color={getTheme().colors.theme1}
          style={{ marginRight: 5 }}
          tooltip="Search match exact value"
          checked={switchExactValue}
          onChange={onChangeSwitchExactValue}
          icon="noise_aware"
        />
      )}
      <div style={{ flex: 1 }} />
      {switchNoValue === undefined ? null : (
        <BtnCheckbox
          color={color}
          style={{ margin: 5 }}
          tooltip="Search match attributes not valued"
          onClick={onChangeSwitchNoValue}
          labelStyle={{ color: getTheme().colors.disable }}
          label="No Value"
          selected={switchNoValue}
        />
      )}
    </div>
  );
};

export default FilterTextFooter;
