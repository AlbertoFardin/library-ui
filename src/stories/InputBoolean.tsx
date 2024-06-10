import * as React from "react";
import BtnBase from "../core/BtnBase";
import Text from "../core/Text";
import Icon from "../core/Icon";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

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

interface IInputBoolean {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  value: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}
const InputBoolean = ({
  style,
  className,
  label,
  value,
  onChange,
  disabled,
}: IInputBoolean) => {
  const classes = useStyles({});
  const cbChange = React.useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  return (
    <BtnBase
      style={style}
      className={classnames({
        [classes.inputBoolean]: true,
        [className]: !!className,
      })}
      onClick={disabled ? undefined : cbChange}
    >
      <Icon
        children={value ? "check_box" : "check_box_outline_blank"}
        style={{ marginRight: 10 }}
      />

      <Text children={label} />
    </BtnBase>
  );
};

export default InputBoolean;
