import * as React from "react";
import classnames from "classnames";
import emptyFn from "../../../utils/emptyFn";
import useDebouncedState from "../../../utils/useDebouncedState";
import { getLabels } from "../Label";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import IFieldText from "./IFieldText";
import Btn from "../../Btn";
import { getTheme } from "../../../theme";
import TextareaAutosize from "react-textarea-autosize";

export const defaultMinRows = 1;
export const defaultMaxRows = 5;
export const defaultAutoSize = false;

const FieldText = ({
  color = getTheme().colors.theme1,
  className,
  debounce = 300,
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
}: IFieldText) => {
  const fieldRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [inputHover, setInputHover] = React.useState(false);
  const [inputValue, setInputValue] = useDebouncedState(
    value,
    debounce,
    onChange,
  );
  const classes = useStyles({ color });
  const cbOnMouseEnter = React.useCallback(() => {
    setInputHover(true);
  }, []);
  const cbOnMouseLeave = React.useCallback(() => {
    setInputHover(false);
  }, []);
  const cbOnChange = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setInputValue(event.target.value);
    },
    [setInputValue],
  );
  const cbOnBlur = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const v = event.target.value;
      if (!v) {
        inputRef.current.value = value;
      }
      onBlur(v);
    },
    [inputRef, onBlur, value],
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
      onKeyPress(event.key, inputRef.current.value);
    },
    [inputRef, onKeyPress],
  );
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);

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
      onMouseOver={cbOnMouseEnter}
      onMouseLeave={cbOnMouseLeave}
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
      ) : multiline ? (
        <TextareaAutosize
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          ref={inputRef}
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
          disabled={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          ref={inputRef}
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
      {!!adornmentElement ? null : (
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
