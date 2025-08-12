import * as React from "react";
import * as moment from "moment";
import { DayPicker } from "react-day-picker";
import classnames from "classnames";
import Popover, { PopoverOrigin } from "../../Popover";
import emptyFn from "../../../utils/emptyFn";
import IFieldDate from "./IFieldDate";
import { getFontsFamily, getTheme } from "../../../theme";
import Text from "../../Text";
import Btn from "../../Btn";
import { getLabels } from "../Label";
import useStyles from "../utils/useStyles";
import BtnMenu from "../utils/BtnMenu";
import "react-day-picker/dist/style.css";
import "./daypicker.css";
import { DATE_FORMAT } from "../../../constants";

const originAnchor: PopoverOrigin = {
  horizontal: "center",
  vertical: "auto",
};
const originTransf: PopoverOrigin = {
  horizontal: "center",
  vertical: "auto",
};

const FieldDate = ({
  color = getTheme().colors.theme1,
  dateFormat = DATE_FORMAT,
  className,
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
  placeholder = "Select a date...",
  readOnly = false,
  style,
  value = 0,
  fromYear = 2000,
  toYear = 2100,
}: IFieldDate) => {
  const fieldRef = React.useRef(null);
  const fontFamily = getFontsFamily()[0];
  const [popover, setPopover] = React.useState(false);
  const [inputHover, setInputHover] = React.useState(false);
  const classes = useStyles({ color });

  const onPopoverClose = React.useCallback(() => {
    setPopover(false);
  }, []);
  const onSelect = React.useCallback(
    (d: Date) => {
      onChange(new Date(d).getTime());
      setPopover(false);
    },
    [onChange],
  );
  const cbEnter = React.useCallback(() => {
    setInputHover(true);
  }, []);
  const cbLeave = React.useCallback(() => {
    setInputHover(false);
  }, []);
  const cbFieldClick = React.useCallback(() => {
    if (!readOnly) {
      setInputHover(true);
      setPopover(true);
    }
  }, [readOnly]);
  const cbMenuOnClose = React.useCallback(() => {
    setInputHover(false);
    menuOnClose();
  }, [menuOnClose]);
  const cbClearValue = React.useCallback(() => {
    onChange(null);
  }, [onChange]);
  const endAdornmentDefault = React.useMemo(() => {
    if (readOnly) return null;
    return (
      <Btn
        icon="arrow_drop_down"
        onClick={cbFieldClick}
        className={classes.menuPosRelative}
      />
    );
  }, [cbFieldClick, classes.menuPosRelative, readOnly]);

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
        ) : !!value ? (
          <>
            {readOnly ? (
              <div style={{ padding: "0 5px" }} />
            ) : (
              <Btn
                style={{ margin: "0 5px" }}
                color={color}
                icon="close"
                onClick={cbClearValue}
              />
            )}
            <Text
              style={{ flex: 1, textAlign: "left" }}
              ellipsis
              children={moment(value).format(dateFormat)}
            />
          </>
        ) : (
          <input
            readOnly
            placeholder={readOnly && !value ? "No value" : placeholder}
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
            renderDefault={endAdornmentDefault}
          />
        )}
      </div>
      <Popover
        open={popover}
        anchorEl={fieldRef.current}
        onClose={onPopoverClose}
        originAnchor={originAnchor}
        originTransf={originTransf}
      >
        <DayPicker
          style={{
            fontFamily,
            fontSize: 10,
            color: getTheme().colors.typography,
          }}
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          selected={!value ? null : new Date(value)}
          onSelect={onSelect}
          showOutsideDays
        />
      </Popover>
    </>
  );
};

export default FieldDate;
