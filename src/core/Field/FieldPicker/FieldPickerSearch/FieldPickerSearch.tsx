import * as React from "react";
import { createUseStyles } from "react-jss";
import FieldSearch from "../../../InputSearch";
import FieldPickerSearchModal from "./FieldPickerSearchModal";
import { IListItem } from "../../../ListItem";
import { getTheme } from "../../../../theme";

const useStyles = createUseStyles({
  search: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",
    position: "relative",
  },
  searchinput: {
    width: "inherit",
    height: 42,
    padding: 0,
    borderRadius: getTheme().borderRadius,
    border: 0,
    flex: 1,
  },
});

interface IFieldPickerSearch {
  fieldRef;
  width: number;
  value: string[];
  items: IListItem[];
  onChange: (value: string[]) => void;
  adornment?: JSX.Element;
  placeholder: string;
  itemsSearchKeys: string[];
  zIndex?: number;
}

const FieldPickerSearch = ({
  fieldRef,
  width,
  value,
  items,
  onChange,
  adornment,
  placeholder,
  itemsSearchKeys,
  zIndex,
}: IFieldPickerSearch) => {
  const classes = useStyles({});
  const [dropdown, setDropdown] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const onDropdownOpen = React.useCallback(() => {
    setDropdown(true);
  }, []);
  const onDropdownClose = React.useCallback(() => {
    setDropdown(false);
  }, []);
  return (
    <>
      <div
        role="presentation"
        className={classes.search}
        onClick={onDropdownOpen}
      >
        <FieldSearch
          className={classes.searchinput}
          value={inputValue}
          onChange={setInputValue}
          placeholder={placeholder}
        />
        {adornment}
      </div>
      <FieldPickerSearchModal
        anchorEl={fieldRef.current}
        open={dropdown}
        inputValue={inputValue}
        placeholder={placeholder}
        width={width}
        items={items}
        slcIds={value}
        onInput={setInputValue}
        onClick={onChange}
        onClose={onDropdownClose}
        itemsSearchKeys={itemsSearchKeys}
        zIndex={zIndex}
      />
    </>
  );
};

export default FieldPickerSearch;
