import * as React from "react";
import { createUseStyles } from "react-jss";
import { getTheme } from "../../../../theme";
import Popover from "../../../Popover";
import Divider from "../../../Divider";
import Placeholder from "../../../Placeholder";
import FieldSearch from "../../../InputSearch";
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
  placeholder: string;
  itemsSearchKeys: string[];
  zIndex?: number;
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
  placeholder,
  itemsSearchKeys,
  zIndex,
}: IFieldPickerSearchModal) => {
  const classes = useStyles({});
  const cbOnClick = React.useCallback(
    (_, id: string) => {
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
      const inputLow = inputValue.toLowerCase();
      const matchKey = itemsSearchKeys.some((key) => {
        const value = item[key] || "";
        const valueLow = value.toLowerCase();
        return valueLow.includes(inputLow);
      });
      return matchKey;
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
        input: inputValue,
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
      style={{ width: width + 2 }}
      zIndex={zIndex}
    >
      <FieldSearch
        className={classes.input}
        value={inputValue}
        onChange={onInput}
        placeholder={placeholder}
        autoFocus
      />
      <Divider />
      <List className={classes.list}>
        {listItems.map((p) => (
          <ListItem
            key={p.id}
            {...p}
            subLabel={
              !p.subLabel || p.label === p.subLabel ? undefined : p.subLabel
            }
          />
        ))}
        <Placeholder open={!listItems.length} label="No item found" />
      </List>
    </Popover>
  );
};

export default FieldPickerSearchModal;
