import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Icon from "../Icon";
import Text from "../Text";
import Tooltip from "../Tooltip";
import emptyFn from "../../utils/emptyFn";
import ListItemButton, { IListItemButton } from "./ListItemButton";
import Avatar from "../Avatar";
import BtnBase from "../BtnBase";
import Checkbox, { SelectType } from "../Checkbox";
import { getTheme } from "../../theme";
import IconHelp from "../IconHelp";
import setTextBold from "../../utils/setTextBold";
import { MISSING_KEY } from "../../constants";

export interface IGetAdditionalChildren {
  id?: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent, id: string) => void;
  onClose?: (event: React.MouseEvent) => void;
}

export interface IListItem {
  cmpRef?: React.Ref<HTMLDivElement>;
  id: string;
  avatar?: string;
  avatarText?: string;
  avatarIcon?: string;
  avatarSize?: number;
  avatarStyle?: React.CSSProperties;
  avatarClassName?: string;
  getAdditionalChildren?: (p: IGetAdditionalChildren) => React.ReactNode;
  children?: JSX.Element | React.ReactNode;
  buttons?: IListItemButton[];
  buttonsLeft?: IListItemButton[];
  buttonsEverVisible?: boolean;
  buttonsLeftEverVisible?: boolean;
  clickPropagation?: boolean;
  onClose?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent, id: string, buttonId?: string) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  copyToClipboard?: string;
  onCopyToClipboard?: (text: string) => void;
  disabled?: boolean;
  disabledRipple?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label: string;
  labelWeight?: "regular" | "lighter" | "bolder";
  labelStyle?: React.CSSProperties;
  labelClassName?: string;
  subLabel?: string;
  subLabelStyle?: React.CSSProperties;
  subLabelClassName?: string;
  icon?: string;
  iconStyle?: React.CSSProperties;
  iconClassName?: string;
  iconTooltip?: string;
  selected?: boolean;
  selectType?: SelectType;
  selectPosition?: "start" | "end";
  input?: string;
  color?: string;
  help?: string;
}

const useStyles = createUseStyles({
  listitem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minHeight: 35,
    padding: "0 15px",
    "&:hover": {
      "& $button": {
        visibility: "visible",
      },
      "& $help": {
        transform: "scale(1)",
      },
    },
  },
  listitemButton: {
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  listitemDisabled: {
    cursor: "default",
    opacity: 0.5,
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  listitemWithSubLabel: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  labels: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  button: {
    visibility: "hidden",
  },
  buttonVisible: {
    visibility: "visible",
  },
  labelsContainer: {
    width: "100%",
    minWidth: 0,
  },
  textCount: {
    color: getTheme().colors.disable,
  },
  help: {
    transform: "scale(0)",
  },
  textNoValue: {
    color: getTheme().colors.disable,
  },
});

const ListItem = ({
  cmpRef,
  id,
  avatar,
  avatarText,
  avatarIcon,
  avatarSize = 25,
  avatarStyle,
  avatarClassName,
  buttons = [],
  buttonsLeft = [],
  buttonsEverVisible,
  buttonsLeftEverVisible,
  getAdditionalChildren = emptyFn,
  children,
  onClose,
  clickPropagation,
  onClick,
  onMouseEnter,
  onMouseLeave,
  copyToClipboard,
  onCopyToClipboard,
  disabled,
  disabledRipple,
  style,
  className,
  label,
  labelWeight = "lighter",
  labelStyle,
  labelClassName,
  subLabel,
  subLabelStyle,
  subLabelClassName,
  icon,
  iconStyle,
  iconClassName,
  iconTooltip,
  selected,
  selectType = SelectType.NONE,
  selectPosition = "start",
  input,
  color = getTheme().colors.theme1,
  help,
}: IListItem) => {
  const classes = useStyles({});
  const cbOnClick = React.useCallback(
    (event: React.MouseEvent) => {
      onClick(event, id, undefined);
    },
    [id, onClick],
  );
  const getListItemButtons = React.useCallback(
    (
      btns: IListItemButton[] = [],
      visible = false,
      additionalCmp: JSX.Element = null,
    ) => {
      if (!btns.length) return null;
      return (
        <>
          {additionalCmp}
          {btns.map((b) => (
            <ListItemButton
              {...b}
              key={b.id}
              className={classnames({
                [classes.button]: true,
                [classes.buttonVisible]: visible,
              })}
              color={b.color}
              onClick={onClick}
              id={b.id}
              parentId={id}
              disabled={disabled}
            />
          ))}
        </>
      );
    },
    [classes.button, classes.buttonVisible, disabled, id, onClick],
  );
  const getLabel = React.useCallback(
    (text = "") => {
      if (!text || !input) return text;
      return setTextBold(input, text);
    },
    [input],
  );
  const selectCmp = (
    <Checkbox
      style={{ marginRight: 10 }}
      type={selectType}
      selected={selected}
      color={color}
    />
  );

  return (
    <BtnBase
      ref={cmpRef}
      color={color}
      className={classnames({
        [classes.listitem]: true,
        [classes.listitemButton]: !!onClick,
        [classes.listitemDisabled]: disabled,
        [classes.listitemWithSubLabel]: !!subLabel,
        [className]: !!className,
      })}
      style={style}
      clickPropagation={clickPropagation}
      onClick={!onClick ? undefined : cbOnClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      disabledRipple={disabled || disabledRipple || !onClick}
      copyToClipboard={copyToClipboard}
      onCopyToClipboard={onCopyToClipboard}
    >
      <div className={classes.labels}>
        {selectPosition === "start" ? selectCmp : null}
        {getListItemButtons(buttonsLeft, buttonsLeftEverVisible)}
        {!avatar && !avatarText && !avatarIcon ? null : (
          <Avatar
            style={{ marginRight: 10, marginLeft: 5, ...avatarStyle }}
            className={avatarClassName}
            size={avatarSize}
            src={avatar}
            text={avatarText}
            icon={avatarIcon}
          />
        )}
        {!icon ? null : (
          <Tooltip title={iconTooltip}>
            <Icon
              children={icon}
              className={iconClassName}
              style={{ marginRight: 10, ...iconStyle }}
            />
          </Tooltip>
        )}
        <div className={classes.labelsContainer}>
          {!label ? null : (
            <Text
              ellipsis
              weight={selected ? "bolder" : labelWeight}
              size={1}
              style={labelStyle}
              className={classnames({
                [classes.textNoValue]: id === MISSING_KEY,
                [labelClassName]: !!labelClassName,
              })}
              children={getLabel(label)}
            />
          )}
          {!subLabel ? null : (
            <Text
              ellipsis
              weight="lighter"
              size={0}
              className={subLabelClassName}
              style={subLabelStyle}
              children={subLabel}
            />
          )}
        </div>

        {getListItemButtons(
          buttons,
          buttonsEverVisible,
          <div style={{ flex: 1, minWidth: 20 }} />,
        )}
        {getAdditionalChildren({
          id,
          active: selected,
          onClick,
          onClose,
        })}
        {children}
      </div>
      <IconHelp open className={classes.help} tooltip={help} />
      {selectPosition === "end" ? selectCmp : null}
    </BtnBase>
  );
};

export default ListItem;
