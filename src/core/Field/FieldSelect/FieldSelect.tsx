import * as React from "react";
import classnames from "classnames";
import Btn from "../../Btn";
import emptyFn from "../../../utils/emptyFn";
import useDebounce from "../../../utils/useDebounce";
import Text from "../../Text";
import Chip from "../../Chip";
import { getLabels } from "../Label";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import Menu from "./Menu";
import IFieldSelect from "./IFieldSelect";
import { IListItem } from "../../ListItem";
import { getTheme } from "../../../theme";
import Divider from "../../Divider";

const getChipLabelDefault = ({ label }: IListItem) => label;
const getInputVisible = (
  type: "singleselect" | "multiselect",
  optionsShow: IListItem[],
  readOnly: boolean,
): boolean => {
  if (readOnly) return false;
  if (type === "singleselect") return !optionsShow.length;
  return true;
};

const FieldSelect = ({
  color = getTheme().colors.theme1,
  className,
  classNameMenu,
  label,
  loading = false,
  getChipLabel = getChipLabelDefault,
  chipsStyle,
  chipsClassName,
  chipsCanRemove = true,
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
  adornmentAvatar,
  adornmentAvatarText,
  adornmentAvatarIcon,
  adornmentAvatarTooltip,
  adornmentElement,
  type = "multiselect",
  menu = [],
  menuVisibled,
  menuDisabled,
  menuOnHover = true,
  menuOnClose = emptyFn,
  onClick = emptyFn,
  onClose = emptyFn,
  onChange = emptyFn,
  onSearch = emptyFn,
  options = [],
  placeholder = "Select...",
  readOnly = false,
  searchable = false,
  style,
  value = [],
}: IFieldSelect) => {
  const fieldRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [inputHover, setInputHover] = React.useState(false);
  const [fieldFocus, setFieldFocus] = React.useState(false);
  const inputValueDebounced = useDebounce(inputValue, 500);

  const fieldWidth = fieldRef.current ? fieldRef.current.clientWidth : 1;
  const optionsShow = value
    .map((v) => {
      return options.find((o) => o.id === v);
    })
    .filter((v) => {
      return !!v;
    });
  const inputVisible = getInputVisible(type, optionsShow, readOnly);
  const classes = useStyles({ color });

  const cbEnter = React.useCallback(() => {
    setInputHover(true);
  }, []);
  const cbLeave = React.useCallback(() => {
    setInputHover(false);
  }, []);
  const cbFieldClick = React.useCallback(() => {
    if (!readOnly) {
      setFieldFocus(true);
      setMenuOpen(true);
      onClick();
    }
  }, [readOnly, onClick]);
  const cbMenuClose = React.useCallback(() => {
    setMenuOpen(false);
    setFieldFocus(false);
    setInputValue("");
    onClose();
  }, [onClose]);
  const onClikReset = React.useCallback(() => {
    onChange(undefined, []);
  }, [onChange]);
  const onClickItem = React.useCallback(
    (slcId: string) => {
      if (type === "singleselect") {
        if (slcId === value[0]) {
          if (chipsCanRemove) {
            onChange(undefined, []);
          }
        } else {
          onChange(slcId, [slcId]);
        }
      } else {
        const slcIds = Array.from(value);
        const indexToRemove = slcIds.findIndex((i) => i === slcId);
        if (indexToRemove === -1) {
          slcIds.push(slcId);
        } else {
          if (chipsCanRemove) {
            slcIds.splice(indexToRemove, 1);
          }
        }
        onChange(slcId, slcIds);
      }
    },
    [chipsCanRemove, onChange, type, value],
  );
  const endAdornmentDefault = readOnly ? null : (
    <Btn
      icon="arrow_drop_down"
      onClick={cbFieldClick}
      className={classes.menuPosAbsoluteBot}
    />
  );
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);

  React.useEffect(() => {
    if (searchable && inputValueDebounced) {
      setMenuOpen(true);
    }
  }, [searchable, inputValueDebounced]);

  React.useEffect(() => {
    setWidth(fieldWidth);
  }, [fieldWidth]);

  React.useEffect(() => {
    if (searchable && fieldFocus) {
      onSearch(inputValueDebounced);
      setFieldFocus(true);
    }
  }, [fieldFocus, inputValueDebounced, onSearch, searchable]);

  return (
    <>
      <div
        ref={fieldRef}
        role="presentation"
        style={style}
        className={classnames({
          [classes.field]: true,
          [classes.fieldCanHover]: !readOnly,
          [classes.fieldDisabled]: readOnly,
          [className]: !!className,
        })}
        onFocus={emptyFn}
        onMouseOver={cbEnter}
        onMouseLeave={cbLeave}
        onClick={cbFieldClick}
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
          <div
            className={classes.adornmentElement}
            children={adornmentElement}
          />
        ) : !!optionsShow.length && type === "singleselect" ? (
          <>
            {readOnly || !chipsCanRemove ? (
              <div style={{ width: 10 }} />
            ) : (
              <Btn
                style={{ margin: "0 5px" }}
                color={color}
                icon="close"
                onClick={onClikReset}
              />
            )}
            <Text
              style={{ flex: 1, textAlign: "left" }}
              ellipsis
              children={getChipLabel(optionsShow[0])}
            />
          </>
        ) : (
          <div className={classes.chipsWrapper}>
            {!!adornmentElement || !optionsShow.length ? null : (
              <>
                <div
                  className={classes.chipsWrapperList}
                  children={optionsShow.map((v) => (
                    <Chip
                      style={chipsStyle}
                      className={chipsClassName}
                      color={getTheme().colors.theme1}
                      key={v.id}
                      id={v.id}
                      disabled={!chipsCanRemove}
                      label={getChipLabel(v)}
                      avatar={v.avatar}
                      avatarText={v.avatarText}
                      avatarIcon={v.avatarIcon}
                      icon={
                        !!v.avatar ||
                        !!v.avatarText ||
                        readOnly ||
                        !chipsCanRemove
                          ? undefined
                          : "close"
                      }
                      onClick={readOnly ? undefined : onClickItem}
                    />
                  ))}
                />
                {!inputVisible ? null : (
                  <Divider className={classes.chipsWrapperDivider} />
                )}
              </>
            )}
            {!inputVisible ? null : (
              <input
                readOnly
                placeholder={
                  readOnly && !value.length ? "No value" : placeholder
                }
                className={classes.input}
              />
            )}
          </div>
        )}
        {!!adornmentElement ? null : (
          <BtnMenu
            color={color}
            className={classes.menuPosAbsoluteBot}
            onClose={cbMenuOnClose}
            inputHover={inputHover || menuVisibled}
            items={menu}
            disabled={menuDisabled}
            visibleOnHover={menuOnHover}
            renderDefault={endAdornmentDefault}
          />
        )}
      </div>
      <Menu
        open={menuOpen && !readOnly}
        anchorEl={fieldRef.current}
        onSearch={setInputValue}
        onClose={cbMenuClose}
        type={type}
        options={options}
        value={value}
        disabled={loading || readOnly}
        onClick={onClickItem}
        searchable={searchable}
        input={inputValue}
        width={width}
        className={classNameMenu}
        loading={loading}
      />
    </>
  );
};

export default FieldSelect;
