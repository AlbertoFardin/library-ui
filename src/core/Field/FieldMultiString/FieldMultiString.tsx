import * as React from "react";
import classnames from "classnames";
import emptyFn from "../../../utils/emptyFn";
import Chip from "../../Chip";
import Text from "../../Text";
import { getLabels } from "../Label";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import IFieldMultiString, { IFieldMultiStringItem } from "./interfaces";
import Btn from "../../Btn";
import { getTheme } from "../../../theme";
import Divider from "../../Divider";
import { v4 as uuidv4 } from "uuid";

const createItem = (label: string): { id: string; label: string } => ({
  id: uuidv4(),
  label,
});
const getInputVisible = (
  type: "singleselect" | "multiselect",
  value: IFieldMultiStringItem[],
  readOnly: boolean,
): boolean => {
  if (readOnly) return false;
  if (type === "singleselect") return !value.length;
  return true;
};

const FieldMultiString = ({
  color = getTheme().colors.theme1,
  className,
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
  adornmentAvatar,
  adornmentAvatarText,
  adornmentAvatarIcon,
  adornmentAvatarTooltip,
  adornmentElement,
  renderChip,
  type = "multiselect",
  label,
  onChange = emptyFn,
  onClick = emptyFn,
  menu = [],
  menuVisibled,
  menuDisabled,
  menuOnHover = true,
  menuOnClose = emptyFn,
  placeholder = "Input value and press ENTER...",
  readOnly = false,
  readOnlyInput = false,
  style,
  value = [],
  separator = ";",
}: IFieldMultiString) => {
  const [inputHover, setInputHover] = React.useState(false);
  const classes = useStyles({ color });
  const inputVisible = getInputVisible(type, value, readOnly);

  const cbEnter = React.useCallback(() => {
    setInputHover(true);
  }, []);
  const cbLeave = React.useCallback(() => {
    setInputHover(false);
  }, []);
  const cbChipReset = React.useCallback(() => {
    onChange(value[0], []);
  }, [onChange, value]);
  const cbChipClick = React.useCallback(
    (id: string) => {
      const chips = Array.from(value);
      const found = chips.find((x) => x.id === id);
      if (found) {
        const newValues = chips.filter((x) => x.id !== found.id);
        onChange(
          found,
          newValues.map((x) => x),
        );
      } else {
        console.error("Chip not found");
      }
    },
    [onChange, value],
  );
  const cbKeyPressed = React.useCallback(
    (event) => {
      const chips = Array.from(value);
      const val = event.target.value.trim();
      if (event.key === "Enter" && !!val) {
        // split stringa ;
        const splitStrings = val.split(separator);
        // genero items da stringa/stringhe splittate
        const splitItems = splitStrings.reduce((acc, cur) => {
          if (!!cur.trim()) acc.push(createItem(cur));
          return acc;
        }, []);

        // se ci sono stringhe da aggiungere
        if (splitItems.length > 0) {
          const newItems = [...chips, ...splitItems];
          onChange(val, newItems);
          event.target.value = "";
        }
      }
    },
    [onChange, separator, value],
  );
  const cbClick = React.useCallback(() => {
    if (!readOnly) onClick();
  }, [onClick, readOnly]);
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);
  const cbRenderChip = React.useCallback(
    ({ id, label }) => {
      return !!renderChip ? (
        renderChip({
          id,
          label,
          readOnly,
          onClick: cbChipClick,
        })
      ) : (
        <Chip
          key={id}
          color={getTheme().colors.theme1}
          id={id}
          label={label}
          icon="close"
          onClick={readOnly ? undefined : cbChipClick}
        />
      );
    },
    [cbChipClick, readOnly, renderChip],
  );

  return (
    <div
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
      onClick={cbClick}
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
      ) : !!value.length && type === "singleselect" ? (
        <>
          {readOnly ? (
            <div style={{ width: 10 }} />
          ) : (
            <Btn
              style={{ margin: "0 5px" }}
              color={color}
              icon="close"
              onClick={cbChipReset}
            />
          )}
          <Text
            style={{ flex: 1, textAlign: "left" }}
            ellipsis
            children={value[0].label}
          />
        </>
      ) : (
        <div className={classes.chipsWrapper}>
          {!!adornmentElement || !value.length ? null : (
            <>
              <div
                className={classes.chipsWrapperList}
                children={value.map(cbRenderChip)}
              />
              {!inputVisible ? null : (
                <Divider className={classes.chipsWrapperDivider} />
              )}
            </>
          )}
          {!inputVisible ? null : (
            <input
              placeholder={
                readOnly && !value.length
                  ? "No value"
                  : readOnlyInput
                    ? "Click to input value..."
                    : placeholder
              }
              className={classes.input}
              onKeyDown={cbKeyPressed}
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
        />
      )}
    </div>
  );
};

export default FieldMultiString;
