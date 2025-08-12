import * as React from "react";
import classnames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import emptyFn from "../../../utils/emptyFn";
import { getLabels } from "../Label";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import IFieldText from "./IFieldText";
import Btn from "../../Btn";
import { getTheme } from "../../../theme";

export const defaultMinRows = 1;
export const defaultMaxRows = 5;
export const defaultAutoSize = false;

const FieldText = ({
  inputRef: inputRefProp,
  color = getTheme().colors.theme1,
  className,
  debounce = 500,
  label,
  inputReadOnly,
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
  multiline,
  onChange = emptyFn,
  onKeyPress = emptyFn,
  onBlur = emptyFn,
  onFocus = emptyFn,
  onClick = emptyFn,
  onMouseOver = emptyFn,
  onMouseLeave = emptyFn,
  placeholder = "Write...",
  placeholderDisabled = "No value",
  readOnly,
  style,
  autoComplete,
  autoFocus,
  inputType,
  inputName,
  value = "",
  minRows = defaultMinRows,
  maxRows = defaultMaxRows,
  autosize = defaultAutoSize,
  innerChildren,
}: IFieldText) => {
  const fieldRef = React.useRef(null);
  const inputRefDefault = React.useRef(null);
  const inputRef = inputRefProp || inputRefDefault;
  const [inputHover, setInputHover] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const classes = useStyles({ color });
  const cbOnMouseOver = React.useCallback(() => {
    onMouseOver();
    setInputHover(true);
  }, [onMouseOver]);
  const cbOnMouseLeave = React.useCallback(() => {
    onMouseLeave();
    setInputHover(false);
  }, [onMouseLeave]);
  const cbOnChange = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setInputValue(event.target.value);
  }, []);
  const cbOnBlur = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onBlur(event.target.value);
    },
    [onBlur],
  );
  const cbOnFocus = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onFocus(event.target.value);
    },
    [onFocus],
  );
  const cbOnKeyDown = React.useCallback(
    (event) => {
      onKeyPress(event.key, inputValue);
    },
    [inputValue, onKeyPress],
  );
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);

  // Debounce effect
  React.useEffect(() => {
    if (inputValue === value) return undefined;
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounce);
    return () => clearTimeout(handler);
  }, [inputValue, value, debounce, onChange]);

  // Keep local state in sync with external value if it changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

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
      onMouseOver={cbOnMouseOver}
      onMouseLeave={cbOnMouseLeave}
    >
      {getLabels(label)}
      {!!adornmentIcon && (
        <Btn
          className={classes.adornmentIcon}
          icon={adornmentIcon}
          iconStyle={{ color: adornmentIconColor }}
          tooltip={adornmentIconTooltip}
        />
      )}
      {(adornmentAvatar || adornmentAvatarText || adornmentAvatarIcon) && (
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
      ) : multiline ? (
        <TextareaAutosize
          ref={inputRef}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          readOnly={readOnly || inputReadOnly}
          value={inputValue}
          placeholder={readOnly && !value ? placeholderDisabled : placeholder}
          onChange={cbOnChange}
          onFocus={cbOnFocus}
          onBlur={cbOnBlur}
          onClick={onClick}
          onKeyDown={cbOnKeyDown}
          minRows={autosize ? minRows : maxRows}
          maxRows={maxRows}
          className={classes.input}
          disabled={readOnly}
        />
      ) : (
        <input
          ref={inputRef}
          disabled={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          type={inputType}
          name={inputName}
          readOnly={readOnly || inputReadOnly}
          value={inputValue}
          placeholder={readOnly && !value ? placeholderDisabled : placeholder}
          onChange={cbOnChange}
          onFocus={cbOnFocus}
          onBlur={cbOnBlur}
          onClick={onClick}
          onKeyDown={cbOnKeyDown}
          className={classes.input}
        />
      )}
      {innerChildren}
      {!adornmentElement && (
        <BtnMenu
          color={color}
          className={classes.menuPosRelative}
          onClose={cbMenuOnClose}
          inputHover={inputHover || menuVisibled}
          items={menu}
          disabled={menuDisabled}
          visibleOnHover={menuOnHover}
        />
      )}
    </div>
  );
};

export default FieldText;
