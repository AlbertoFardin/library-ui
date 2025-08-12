import * as React from "react";
import classnames from "classnames";
import { getTheme } from "../../../theme";
import { getLabels } from "../Label";
import Divider from "../../Divider";
import FieldPickerList from "./FieldPickerList";
import FieldPickerBtnCreate from "./FieldPickerBtnCreate";
import FieldPickerSearch from "./FieldPickerSearch";
import IFieldPicker, { IFieldItem, IFieldPickerDialog } from "./IFieldPicker";
import emptyFn from "../../../utils/emptyFn";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import Btn from "../../Btn";

const dialogItemDefault: IFieldPickerDialog = {
  enable: false,
  fields: [],
  onChange: emptyFn,
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
  placeholder = "Search items...",
  readOnly,
  value = [],
  items = [],
  itemsSortable = true,
  itemsSearchable = true,
  itemsSearchKeys = ["label"],
  dialogToCreate = dialogItemDefault,
  dialogToModify = dialogItemDefault,
  zIndex,
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
  const noHeader = !items.length || readOnly || !itemsSearchable;
  const width = fieldRef?.current?.clientWidth || 0;

  return (
    <div
      ref={fieldRef}
      role="presentation"
      style={{ ...style, textAlign: "left", minHeight: "fit-content" }}
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
              fieldRef={fieldRef}
              width={width}
              value={value}
              items={items}
              onChange={onChange}
              placeholder={placeholder}
              itemsSearchKeys={itemsSearchKeys}
              zIndex={zIndex}
            />
          )}
          {!!adornmentElement ? null : (
            <BtnMenu
              zIndex={zIndex}
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
            items={items as IFieldItem[]}
            color={color}
            width={width}
            onChange={onChange}
            readOnly={readOnly}
            sortable={itemsSortable}
            dialogToModify={dialogToModify}
            zIndex={zIndex}
          />
          {readOnly ? null : (
            <FieldPickerBtnCreate
              color={color}
              value={value}
              items={items as IFieldItem[]}
              dialog={dialogToCreate}
              zIndex={zIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldPicker;
