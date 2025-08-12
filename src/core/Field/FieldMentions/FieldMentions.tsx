import * as React from "react";
import { MentionsInput } from "react-mentions";
import classnames from "classnames";
import { getLabels } from "../Label";
import ListItem from "../../../core/ListItem";
import IFieldMentions from "./IFieldMentions";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";
import useStyles from "../utils/useStyles";
import Btn from "../../Btn";
import BtnMenu from "../utils/BtnMenu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Mention = ({ display, className }: any) => (
  <span className={className} children={display} />
);
const displayTransform = (_, display) => display;

const FieldMentions = ({
  color = getTheme().colors.theme1,
  autoFocus,
  className,
  style,
  label = "",
  onChange = emptyFn,
  placeholder = "Write...",
  readOnly = false,
  users,
  value,
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
}: IFieldMentions) => {
  const inputRef = React.useRef(null);
  const [inputHover, setInputHover] = React.useState(false);
  const classes = useStyles({ color });
  const c = getTheme().colors.isDark ? "250,250,250" : "0,0,0";

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
  const cbOnChange = React.useCallback(
    (_event, newValue, _newPlainTextValue, mentions) => {
      if (!readOnly) {
        const mentionsCompleted = mentions.map(({ id }) =>
          users.find((u) => u.id === id),
        );
        onChange(newValue, mentionsCompleted);
      }
    },
    [onChange, users, readOnly],
  );
  const cbRenderSuggestion = React.useCallback(
    (suggestion, _, highlightedDisplay) => {
      const { id, avatar, avatarIcon, avatarText } = users.find(
        ({ id }) => id === suggestion.id,
      );
      return (
        <ListItem
          id={id}
          avatar={avatar}
          avatarText={avatarText}
          avatarIcon={avatarIcon}
          label={highlightedDisplay}
          clickPropagation
          onClick={emptyFn} // serve x colorarlo al mouse hover
        />
      );
    },
    [users],
  );

  React.useEffect(() => {
    inputRef.current.readOnly = readOnly;
  }, [readOnly]);

  React.useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

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
        <MentionsInput
          inputRef={inputRef}
          value={value || ""}
          onChange={cbOnChange}
          className={classes.mentionsInput}
          placeholder={placeholder}
          style={{
            suggestions: {
              boxShadow: `0px 2px 4px -1px rgba(${c},0.2), 0px 4px 5px 0px rgba(${c},0.14), 0px 1px 10px 0px rgba(${c},0.12)`,
              borderRadius: getTheme().borderRadius,
              backgroundColor: getTheme().colors.background,
            },
          }}
        >
          <Mention
            markup="@[__display__](id:__id__)"
            trigger="@"
            data={users.map((u) => ({
              id: u.id,
              display: u.name,
            }))}
            renderSuggestion={cbRenderSuggestion}
            displayTransform={displayTransform}
            className={classes.mentionsUser}
            isOpen={false}
          />
        </MentionsInput>
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

export default FieldMentions;
