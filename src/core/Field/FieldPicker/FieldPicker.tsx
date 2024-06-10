import * as React from "react";
import { getTheme } from "../../../theme";
import { getLabels } from "../Label";
import Divider from "../../Divider";
import FieldPickerList from "./FieldPickerList";
import FieldPickerCreate from "./FieldPickerCreate";
import FieldPickerSearch from "./FieldPickerSearch";
import IFieldPicker from "./IFieldPicker";
import emptyFn from "../../../utils/emptyFn";
import classnames from "classnames";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import Btn from "../../Btn";
import { IListItem } from "../../ListItem";

const itemsOnSearchDefault = (inputValue: string, item: IListItem): boolean => {
  const valueLow = item.label?.toLowerCase() || "";
  const inputLow = inputValue.toLowerCase();
  return valueLow.includes(inputLow);
};

const FieldPicker = ({
  className,
  style,
  color = getTheme().colors.theme1,
  label,
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
  adornmentAvatar,
  adornmentAvatarText,
  adornmentAvatarIcon,
  adornmentAvatarTooltip,
  adornmentElement,
  menu = [],
  menuVisibled,
  menuDisabled,
  menuOnHover = true,
  menuOnClose = emptyFn,
  onChange = emptyFn,
  onCreate = emptyFn,
  placeholder = "Search items...",
  readOnly,
  value = [],
  items = [],
  itemsSortable = true,
  itemsOnSearch = itemsOnSearchDefault,
  createEnabled,
  createProps = [],
  createTitle,
  createTitleHelp,
}: IFieldPicker) => {
  const classes = useStyles({ color });
  const fieldRef = React.useRef(null);

  const [inputHover, setInputHover] = React.useState(false);
  const cbEnter = React.useCallback(() => {
    setInputHover(true);
  }, []);
  const cbLeave = React.useCallback(() => {
    setInputHover(false);
  }, []);
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);
  const noHeader = !items.length || readOnly;
  const width = fieldRef?.current?.clientWidth || 0;

  return (
    <div
      ref={fieldRef}
      role="presentation"
      style={style}
      className={classnames({
        [classes.field]: true,
        [classes.fieldCanHover]: !readOnly,
        [classes.fieldDisabled]: readOnly,
        [classes.fieldNoMaxHeight]: true,
        [className]: !!className,
      })}
      onFocus={emptyFn}
      onMouseOver={cbEnter}
      onMouseLeave={cbLeave}
    >
      {getLabels(label)}
      {!adornmentIcon ? null : (
        <Btn
          className={classes.adornmentIcon}
          icon={adornmentIcon}
          iconStyle={{ color: adornmentIconColor }}
          tooltip={adornmentIconTooltip}
        />
      )}
      {!adornmentAvatar &&
      !adornmentAvatarText &&
      !adornmentAvatarIcon ? null : (
        <Btn
          className={classes.adornmentAvatar}
          avatar={adornmentAvatar}
          avatarText={adornmentAvatarText}
          avatarIcon={adornmentAvatarIcon}
          tooltip={adornmentAvatarTooltip}
        />
      )}
      {adornmentElement ? (
        <div className={classes.adornmentElement} children={adornmentElement} />
      ) : (
        <div className={classes.chipsWrapper}>
          {noHeader ? null : (
            <FieldPickerSearch
              width={width}
              value={value}
              items={items}
              onSearch={itemsOnSearch}
              onChange={onChange}
              placeholder={placeholder}
              adornment={
                <Btn
                  icon="arrow_drop_down"
                  className={classes.menuPosAbsoluteBot}
                />
              }
            />
          )}
          {!!adornmentElement ? null : (
            <BtnMenu
              color={color}
              className={classes.menuPosAbsoluteTop}
              onClose={cbMenuOnClose}
              inputHover={inputHover || menuVisibled}
              items={menu}
              disabled={menuDisabled}
              visibleOnHover={menuOnHover}
            />
          )}
          {noHeader ? null : <Divider />}
          <FieldPickerList
            value={value}
            items={items}
            onChange={onChange}
            readOnly={readOnly}
            sortable={itemsSortable}
          />
          {!createEnabled || readOnly ? null : (
            <FieldPickerCreate
              color={color}
              width={width}
              onCreate={onCreate}
              title={createTitle}
              titleHelp={createTitleHelp}
              props={createProps}
              items={items}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldPicker;
