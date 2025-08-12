import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../../theme";
import Popover, { PopoverOrigin } from "../../Popover";
import emptyFn from "../../../utils/emptyFn";
import ListItem, { IListItem } from "../../ListItem";
import List from "../../List";
import FieldSearch from "../../InputSearch";
import { SelectType } from "../../Checkbox";

const MAX_SIZE = 30;
const originAnchor: PopoverOrigin = {
  horizontal: "center",
  vertical: "auto",
};
const originTransf: PopoverOrigin = {
  horizontal: "center",
  vertical: "auto",
};

interface IStyle {
  width: number;
}
const useStyles = createUseStyles({
  menu: {
    minWidth: ({ width }: IStyle) => width,
    maxWidth: ({ width }: IStyle) => width,
    width: ({ width }: IStyle) => width,
  },
  fieldsearch: {
    height: 42,
    border: 0,
    width: "100%",
    borderRadius: 0,
    borderBottom: `1px solid ${getTheme().colors.grayBorder}`,
  },
  list: {
    maxHeight: 200,
    overflow: "auto",
  },
});

interface IMenu {
  className?: string;
  anchorEl: Element | ((element: Element) => Element);
  type: "singleselect" | "multiselect";
  options: IListItem[];
  value: string[];
  open: boolean;
  onSearch?: (s: string) => void;
  onClose?: () => void;
  searchable?: boolean;
  input?: string;
  width?: number;
  loading: boolean;
  disabled?: boolean;
  onClick: (id: string) => void;
}

const Menu = ({
  className,
  type,
  options,
  value,
  anchorEl,
  open,
  onSearch = emptyFn,
  onClose = emptyFn,
  searchable,
  input = "",
  width = 150,
  loading,
  disabled,
  onClick,
}: IMenu) => {
  const classes = useStyles({ width });
  const onSelect = React.useCallback(
    (_, slcId: string) => {
      if (type === "singleselect") onClose();
      onClick(slcId);
    },
    [onClick, onClose, type],
  );
  const slcType = type === "singleselect" ? SelectType.RADIO : SelectType.CHECK;
  const optionsFound = options.filter((a) => {
    const vLabel1 = (a.label || "").toLocaleUpperCase();
    const vLabel2 = (a.subLabel || "").toLocaleUpperCase();
    const vInput = input.toLocaleUpperCase();
    return vLabel1.includes(vInput) || vLabel2.includes(vInput);
  });
  const optionsMore = Math.max(0, optionsFound.length - MAX_SIZE);
  const optionsFoundMaxSize = optionsFound.filter((_, index) => {
    return index < MAX_SIZE;
  });

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      className={classnames({
        [classes.menu]: true,
        [className]: !!className,
      })}
      originAnchor={originAnchor}
      originTransf={originTransf}
    >
      {!optionsMore && !searchable ? null : (
        <FieldSearch
          autoFocus
          className={classes.fieldsearch}
          onChange={onSearch}
          value={input}
          loading={loading}
        />
      )}
      <List className={classes.list}>
        {!optionsFoundMaxSize.length ? (
          <ListItem
            selectType={SelectType.NONE}
            id="_noresults"
            label="No results found"
            disabled
          />
        ) : (
          optionsFoundMaxSize.map((v) => (
            <ListItem
              key={v.id}
              selectType={slcType}
              input={input}
              selected={new Set(value).has(v.id)}
              disabled={disabled}
              onClick={onSelect}
              {...v}
            />
          ))
        )}
        {!optionsMore ? null : (
          <ListItem
            id="_more"
            selectType={slcType}
            label={`${optionsMore} more results...`}
            disabled
          />
        )}
      </List>
    </Popover>
  );
};

export default Menu;
