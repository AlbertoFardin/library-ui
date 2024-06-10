import * as React from "react";
import { getTheme } from "../../theme";
import classnames from "classnames";
import Icon from "../Icon";
import Text from "../Text";
import BtnBase from "../BtnBase";
import emptyFn from "../../utils/emptyFn";
import useStyles from "./useStyles";
import IBtn from "./IBtn";
import PopoverList from "../PopoverList";
import Avatar from "../Avatar";

enum ACTION {
  SET_HOVER = "SET_HOVER",
  SET_MENU_OPEN = "SET_MENU_OPEN",
  SET_ON_CLOSE = "SET_ON_CLOSE",
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_HOVER:
      return { ...state, hover: action.hover };
    case ACTION.SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.menuOpen,
      };
    case ACTION.SET_ON_CLOSE:
      return {
        ...state,
        menuOpen: false,
        hover: false,
      };
    default:
      throw new Error();
  }
};

const Btn = ({
  variant = "light",
  cmpRef,
  className,
  style,
  tooltip,
  tooltipPlace,
  tooltipOpen,
  disabled,
  onClick,
  icon,
  iconClassName,
  iconStyle,
  label,
  labelWeight = "bolder",
  labelPosition = "right",
  labelRequired,
  labelClassName,
  labelStyle,
  color,
  selected,
  avatar,
  avatarText,
  avatarIcon,
  avatarClassName,
  avatarStyle,
  copyToClipboard,
  onCopyToClipboard,
  menu,
  onMouseEnter,
  onMouseLeave,
  small,
  badge,
  badgeColor = getTheme().colors.msgFail,
  children,
}: IBtn) => {
  const buttonRefDefault = React.useRef(null);
  const buttonRef = cmpRef || buttonRefDefault;
  const [state, dispatch] = React.useReducer(reducer, {
    hover: false,
    menuOpen: false,
  });
  const { hover, menuOpen } = state;
  const classes = useStyles({
    variant,
    color,
    hover,
    selected,
    icon,
    disabled,
    label,
    onClick,
    menuProp: !!menu,
    menuOpen,
    small,
    badgeColor,
  });
  const cbOnMouseEnter = React.useCallback(
    (event) => {
      event.persist();
      dispatch({ type: ACTION.SET_HOVER, hover: true });
      if (onMouseEnter) onMouseEnter(event);
    },
    [onMouseEnter],
  );
  const cbOnMouseLeave = React.useCallback(
    (event) => {
      event.persist();
      dispatch({ type: ACTION.SET_HOVER, hover: false });
      if (onMouseLeave) onMouseLeave(event);
    },
    [onMouseLeave],
  );
  const cbOnClose = React.useCallback(() => {
    dispatch({ type: ACTION.SET_ON_CLOSE });
    setTimeout(menu.onClose || emptyFn, 200);
  }, [menu]);
  const cbOnClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!!menu) {
        dispatch({ type: ACTION.SET_MENU_OPEN, menuOpen: true });
      }
      if (!!onClick) {
        onClick(event);
      }
    },
    [menu, onClick],
  );
  const disabledClick = !copyToClipboard && !menu && !onClick;
  const labelRequiredCmp = (
    <span className={classes.requiredSign} children={"*"} />
  );
  const labelCmp = (
    <Text
      ellipsis={true}
      tooltip={false}
      weight={labelWeight}
      className={classnames({
        [classes.label]: true,
        [labelClassName]: !!labelClassName,
      })}
      style={labelStyle}
      children={
        <>
          {label}
          {!labelRequired ? null : labelRequiredCmp}
        </>
      }
    />
  );
  const iconCmp = (
    <Icon
      className={classnames({
        [classes.icon]: true,
        [iconClassName]: !!iconClassName,
      })}
      style={iconStyle}
      children={icon}
    />
  );
  const avatarCmp = (
    <Avatar
      className={avatarClassName}
      style={avatarStyle}
      src={avatar}
      text={avatarText}
      icon={avatarIcon}
      size={22}
    />
  );

  return (
    <>
      <BtnBase
        ref={buttonRef}
        color={color}
        className={classnames({
          [classes.button]: true,
          [className]: !!className,
        })}
        style={style}
        onClick={disabled || disabledClick ? undefined : cbOnClick}
        onMouseEnter={cbOnMouseEnter}
        onMouseLeave={cbOnMouseLeave}
        tooltip={tooltip}
        tooltipPlace={tooltipPlace}
        tooltipOpen={tooltipOpen}
        copyToClipboard={copyToClipboard}
        onCopyToClipboard={onCopyToClipboard}
      >
        {!!label && labelPosition === "left" ? labelCmp : null}
        {!icon ? null : iconCmp}
        {!avatar && !avatarText && !avatarIcon ? null : avatarCmp}
        {!!label && labelPosition === "right" ? labelCmp : null}
        {!menu || !menu.icon ? null : (
          <Icon
            className={classnames({
              [classes.icon]: true,
              [menu.iconClassName]: !!menu.iconClassName,
            })}
            style={menu.iconStyle}
            children="arrow_drop_down"
          />
        )}
        {!badge ? null : (
          <div
            role="presentation"
            className={classes.badge}
            style={{
              top: 1,
              right: 1,
              backgroundColor: color,
            }}
          />
        )}
        {children}
      </BtnBase>

      {!menu ? null : (
        <PopoverList
          open={menuOpen}
          anchorEl={buttonRef.current}
          actions={menu.items}
          originAnchor={menu.originAnchor}
          originTransf={menu.originTransf}
          onClose={cbOnClose}
          title={menu.title}
        />
      )}
    </>
  );
};

export default Btn;
