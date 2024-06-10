import * as React from "react";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../../../theme";
import Popover from "../../../Popover";
import Divider from "../../../Divider";
import Placeholder from "../../../Placeholder";
import FieldSearch from "../../../FieldSearch";
import List from "../../../List";
import ListItem, { IListItem } from "../../../ListItem";
import { SelectType } from "../../../Checkbox";

const useStyles = createUseStyles({
  input: {
    width: "auto",
    border: 0,
    padding: 0,
    height: 42,
    borderColor: "transparent",
    borderRadius: getTheme().borderRadius,
  },
  list: {
    position: "relative",
    maxHeight: 250,
    minHeight: 35,
    backgroundColor: getTheme().colors.background,
  },
});

interface IFieldPickerSearchModal {
  anchorEl;
  open: boolean;
  inputValue: string;
  width: number;
  items: IListItem[];
  slcIds: string[];
  onInput: (input: string) => void;
  onClick: (slcIds: string[]) => void;
  onClose: () => void;
  onSearch: (inputValue: string, item: IListItem) => boolean;
  placeholder: string;
}

const FieldPickerSearchModal = ({
  anchorEl,
  open,
  inputValue,
  width,
  items,
  slcIds,
  onInput,
  onClick,
  onClose,
  onSearch,
  placeholder,
}: IFieldPickerSearchModal) => {
  const classes = useStyles({});
  const cbOnClick = React.useCallback(
    (e, id: string) => {
      const newIds = Array.from(slcIds);
      const indexToRemove = newIds.findIndex((i) => i === id);
      if (indexToRemove === -1) {
        newIds.push(id);
      } else {
        newIds.splice(indexToRemove, 1);
      }
      onClick(newIds);
    },
    [onClick, slcIds],
  );
  const listItems: IListItem[] = items
    .filter((item) => {
      return onSearch(inputValue, item);
    })
    .sort((a, b) => {
      const aValue = a.label?.toLowerCase() || "";
      const bValue = b.label?.toLowerCase() || "";
      if (!aValue || !bValue) return 0;
      if (aValue > bValue) return +1;
      if (aValue < bValue) return -1;
      return 0;
    })
    .map((item) => {
      const data: IListItem = {
        ...item,
        selected: slcIds.some((a) => a === item.id),
        selectType: SelectType.CHECK,
        onClick: cbOnClick,
      };
      return data;
    });

  return (
    <Popover
      anchorEl={anchorEl}
      originAnchor={{
        vertical: "top",
        horizontal: "center",
      }}
      originTransf={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      onClose={onClose}
      style={{ width }}
    >
      <FieldSearch
        className={classes.input}
        value={inputValue}
        onChange={onInput}
        placeholder={placeholder}
        autofocus
      />
      <Divider />
      <List className={classes.list}>
        {listItems.map((p) => (
          <ListItem key={p.id} {...p} input={inputValue} />
        ))}
        <Placeholder open={!listItems.length} label="No item found" />
      </List>
    </Popover>
  );
};

export default FieldPickerSearchModal;
