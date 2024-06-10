import * as React from "react";
import IFilterBoolean from "./IFilterBoolean";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";
import { FilterType } from "../interfaces";
import FilterSelect, { IChangesSelect } from "../FilterSelect";
const idY = "yes";
const idN = "no";
const i18nDefault = {
  itemYesLabel: "Yes",
  itemYesCount: undefined,
  itemNoLabel: "No",
  itemNoCount: undefined,
};

export const DefaultBooleanType: FilterType = "FACETBOOLEAN";

/**
 * **FilterBoolean** è una faccetta che gestisce un booleano.
 */
const FilterBoolean = ({
  id,
  type = DefaultBooleanType,
  value,
  color = getTheme().colors.theme1,
  className,
  collapsed,
  collapsedHelp,
  i18n: i18nCustom,
  label,
  labelSub,
  onChange = emptyFn,
  onClickCount,
  style,
  mandatory,
}: IFilterBoolean) => {
  const onCbChange = React.useCallback(
    ({ id, type, value }: IChangesSelect) => {
      onChange({
        id,
        type,
        // do per scontato che ci sia solo 1 value perchè è singleSelect
        value: value.length === 0 ? undefined : value[0].id === idY,
      });
    },
    [onChange],
  );
  const i18n = {
    ...i18nDefault,
    ...i18nCustom,
  };
  const optionsMemo = React.useMemo(() => {
    return [
      {
        label: i18n.itemYesLabel,
        count: i18n.itemYesCount,
        id: idY,
      },
      {
        label: i18n.itemNoLabel,
        count: i18n.itemNoCount,
        id: idN,
      },
    ];
  }, [
    i18n.itemNoCount,
    i18n.itemNoLabel,
    i18n.itemYesCount,
    i18n.itemYesLabel,
  ]);
  const valueMemo = React.useMemo(() => {
    if (value === false) return [idN];
    if (value === true) return [idY];
    return undefined;
  }, [value]);

  return (
    <FilterSelect
      type={type}
      color={color}
      id={id}
      style={style}
      className={className}
      collapsed={collapsed}
      collapsedHelp={collapsedHelp}
      label={label}
      labelSub={labelSub}
      value={valueMemo}
      maxItems={1}
      options={optionsMemo}
      onChange={onCbChange}
      onClickCount={onClickCount}
      mandatory={mandatory}
    />
  );
};

export default FilterBoolean;
