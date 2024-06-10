import * as React from "react";
import FieldText from "../../Field/FieldText/FieldText";
import { FilterType } from "../interfaces";
import IFilterText from "./IFilterText";
import FilterWrapper from "../utils/FilterWrapper";
import { prepareBadge, prepareValue } from "./utils/Functions";
import FilterTextFooter from "./utils/FilterTextFooter";
import { getTheme } from "../../../theme";

export const DefaultTextType: FilterType = "FACETTEXTAREA";

const formatValue = (split: boolean, text: string) => {
  if (!text) return undefined;
  return !split ? text : text.split(/\r+|\n/);
};

const FilterText = ({
  id,
  type = DefaultTextType,
  value = "",
  color = getTheme().colors.theme1,
  cartridgeSplit = true,
  className,
  collapsed,
  collapsedHelp,
  help,
  collapsedHide,
  label,
  labelSub,
  onChange,
  onClickCount,
  style,
  switchCaseSensitive,
  switchExactValue,
  switchNoValue,
  mandatory,
}: IFilterText) => {
  const inputValueRef = React.useRef(null);

  const onChangeInput = React.useCallback(
    (t: string) => {
      onChange({
        id,
        type,
        value: formatValue(cartridgeSplit, t),
        switchCaseSensitive,
        switchExactValue,
        switchNoValue,
      });
      inputValueRef.current = t;
    },
    [
      cartridgeSplit,
      type,
      id,
      onChange,
      switchCaseSensitive,
      switchExactValue,
      switchNoValue,
    ],
  );
  const onChangeFooter = React.useCallback(
    (p) => {
      const changes = {
        id,
        type,
        value,
        ...p,
      };

      if (p.switchNoValue === true) {
        inputValueRef.current = "";
        changes.value = "";
      }

      onChange(changes);
    },
    [id, type, onChange, value],
  );

  return (
    <FilterWrapper
      color={color}
      count={prepareBadge(value)}
      label={label}
      labelSub={labelSub}
      collapsedHide={collapsedHide}
      className={className}
      style={style}
      collapsed={collapsed}
      collapsedHelp={collapsedHelp}
      onClickCount={onClickCount}
      mandatory={mandatory}
      help={help}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flex: 1,
        }}
      >
        <FieldText
          style={{ margin: 0 }}
          multiline
          autosize
          value={prepareValue(value)}
          onChange={onChangeInput}
          readOnly={switchNoValue || collapsed}
          placeholder="Write here..."
          placeholderDisabled="Not valued"
        />
        <FilterTextFooter
          color={color}
          switchCaseSensitive={switchCaseSensitive}
          switchExactValue={switchExactValue}
          switchNoValue={switchNoValue}
          onChange={onChangeFooter}
        />
      </div>
    </FilterWrapper>
  );
};

export default FilterText;
