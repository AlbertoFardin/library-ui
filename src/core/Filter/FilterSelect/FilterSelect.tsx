import * as React from "react";
import { getTheme } from "../../../theme";
import List from "../../List";
import FilterWrapper from "../utils/FilterWrapper";
import FieldSearch from "../../FieldSearch";
import IFilterSelect, { IFilterSelectItem } from "./IFilterSelect";
import ListItem from "../../ListItem";
import { FilterType } from "../interfaces";
import getNewValue from "./utils/getNewValue";
import emptyFn from "../../../utils/emptyFn";
import { createUseStyles } from "react-jss";
import { SelectType } from "../../Checkbox";
import { missingKey } from "../../../interfaces";

export const DefaultSelectType: FilterType = "MULTISELECTION";
const itemEmpty = (
  <ListItem
    id="_noresults"
    selectType={SelectType.NONE}
    disabled
    label="No results found"
  />
);

const MAX_SIZE = 30;
const useStyles = createUseStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  list: {
    flex: 1,
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    overflow: "hidden",
    backgroundColor: getTheme().colors.background,
    marginBottom: 10,
  },
  listSearch: {
    width: "inherit",
    height: 40,
    border: 0,
    borderRadius: 0,
    borderBottom: `1px solid ${getTheme().colors.grayBorder}`,
  },
  listContent: {
    overflow: "auto",
    maxHeight: 220,
    flex: 1,
    textAlign: "left",
  },
});

/**
 * **FilterSelect** è una faccetta che gestisce diversi items selezionabili.
 */
const FilterSelect = ({
  id,
  type = DefaultSelectType,
  value = [],
  color = getTheme().colors.theme1,
  className,
  style,
  collapsed,
  collapsedHelp,
  collapsedHide,
  maxItems,
  options = [],
  optionsMore: optionsMoreOut = 0,
  label,
  labelSub,
  onChange = emptyFn,
  onSearch,
  onClickCount,
  mandatory,
  loading,
  loadingSearch,
  searchable,
  footer,
}: IFilterSelect) => {
  const classes = useStyles({});
  const searching = React.useRef(false);
  const [inputValue, setInputValue] = React.useState("");

  const optionsSearch = options
    .filter((a) => {
      const label1 = (a.label || "").toLocaleUpperCase();
      const label2 = (a.subLabel || "").toLocaleUpperCase();
      const input = inputValue.toLocaleUpperCase();
      return label1.includes(input) || label2.includes(input);
    })
    .filter((a) => {
      if (!!inputValue && a.id === missingKey) return false;
      return true;
    })
    .sort((a) => {
      if (a.id === missingKey) return -1;
      return 0;
    });

  const optionsVisible = optionsSearch.filter((a, i) => i < MAX_SIZE);
  const needFieldSearch = optionsSearch.length > options.length;
  const optionsMoreIn = optionsSearch.length - optionsVisible.length;
  const optionsMoreTotal = optionsMoreIn + optionsMoreOut;
  const listitemType = maxItems === 1 ? SelectType.RADIO : SelectType.CHECK;

  const onClickItem = React.useCallback(
    (e, slcId: string) => {
      onChange({
        id,
        type,
        value: getNewValue({ options, value, maxItems, slcId }),
        options,
      });
    },
    [onChange, id, type, value, maxItems, options],
  );
  const onSearchInput = React.useCallback((text: string) => {
    setInputValue(text);
    searching.current = true;
  }, []);

  React.useEffect(() => {
    if (!collapsed && onSearch && searching.current) {
      onSearch(inputValue);
      searching.current = false;
    }
  }, [collapsed, onSearch, inputValue]);

  return (
    <FilterWrapper
      color={color}
      count={value.length}
      label={label}
      labelSub={labelSub}
      collapsedHide={collapsedHide}
      className={className}
      style={style}
      collapsed={collapsed}
      collapsedHelp={collapsedHelp}
      onClickCount={onClickCount}
      mandatory={mandatory}
      loading={loading}
    >
      <div className={classes.content}>
        <div className={classes.list}>
          {searchable || needFieldSearch || !!optionsMoreIn || !!onSearch ? (
            <FieldSearch
              className={classes.listSearch}
              value={inputValue}
              onChange={onSearchInput}
              loading={loadingSearch}
            />
          ) : null}
          <List className={classes.listContent}>
            {!optionsVisible.length
              ? itemEmpty
              : optionsVisible.map((item: IFilterSelectItem) => (
                  <ListItem
                    key={item.id}
                    style={item.style}
                    className={item.className}
                    id={item.id}
                    disabled={collapsed}
                    selectType={listitemType}
                    selected={value.some((id) => id === item.id)}
                    input={inputValue}
                    color={item.color}
                    label={item.label}
                    labelStyle={item.labelStyle}
                    labelClassName={item.labelClassName}
                    subLabel={item.subLabel}
                    count={item.count}
                    onClick={onClickItem}
                  />
                ))}
            {!optionsMoreTotal ? null : (
              <ListItem
                id="_more"
                selectType={listitemType}
                disabled
                label="More results..."
              />
            )}
          </List>
        </div>
        {footer}
      </div>
    </FilterWrapper>
  );
};

export default FilterSelect;
