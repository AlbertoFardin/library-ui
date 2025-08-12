import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import BtnBase from "../core/BtnBase";
import Text from "../core/Text";
import Icon from "../core/Icon";
import PopoverList from "../core/PopoverList";
import { SelectType } from "../core/Checkbox";

const useStyles = createUseStyles({
  inputBoolean: {
    display: "flex",
    width: 300,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "start",
  },
});

interface IInputSelect {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange?: (v: string) => void;
  disabled?: boolean;
}
const InputSelect = ({
  style,
  className,
  label,
  value,
  onChange,
  disabled,
  options,
}: IInputSelect) => {
  const classes = useStyles({});
  const [menuOpen, setMenuOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const onClick = React.useCallback(
    (_, id: string) => {
      onChange(id);
    },
    [onChange],
  );
  const onMenuHide = React.useCallback(() => setMenuOpen(false), []);
  const onMenuOpen = React.useCallback(() => setMenuOpen(true), []);
  const item = options.find((o) => o.id === value);

  return (
    <>
      <BtnBase
        ref={buttonRef}
        style={style}
        className={classnames({
          [classes.inputBoolean]: true,
          [className]: !!className,
        })}
        onClick={disabled ? undefined : onMenuOpen}
      >
        <Icon children="arrow_drop_down" style={{ marginRight: 10 }} />
        <Text children={`${label}: ${item.label}`} />
      </BtnBase>
      <PopoverList
        open={menuOpen}
        anchorEl={buttonRef.current}
        actions={options.map((o) => ({
          ...o,
          selected: o.id === value,
          selectType: SelectType.RADIO,
          onClick,
        }))}
        onClose={onMenuHide}
        originAnchor={{
          horizontal: "left",
          vertical: "bottom",
        }}
        originTransf={{
          horizontal: "left",
          vertical: "top",
        }}
      />
    </>
  );
};

export default InputSelect;
