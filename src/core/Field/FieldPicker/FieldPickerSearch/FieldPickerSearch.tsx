import * as React from "react";
import { createUseStyles } from "react-jss";
import FieldSearch from "../../../FieldSearch";
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
  width: number;
  value: string[];
  items: IListItem[];
  onChange: (value: string[]) => void;
  onSearch: (inputValue: string, item: IListItem) => boolean;
  adornment?: JSX.Element;
  placeholder: string;
}

const FieldPickerSearch = ({
  width,
  value,
  items,
  onChange,
  onSearch,
  adornment,
  placeholder,
}: IFieldPickerSearch) => {
  const classes = useStyles({});
  const searchRef = React.useRef(null);
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
        ref={searchRef}
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
      {!searchRef?.current ? null : (
        <FieldPickerSearchModal
          anchorEl={searchRef.current}
          open={dropdown}
          inputValue={inputValue}
          placeholder={placeholder}
          width={width}
          items={items}
          slcIds={value}
          onInput={setInputValue}
          onClick={onChange}
          onClose={onDropdownClose}
          onSearch={onSearch}
        />
      )}
    </>
  );
};

export default FieldPickerSearch;
