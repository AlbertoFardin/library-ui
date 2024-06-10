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

interface IInputButton {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  onChange?: () => void;
  disabled?: boolean;
}
const InputButton = ({
  style,
  className,
  label,
  onChange,
  disabled,
}: IInputButton) => {
  const classes = useStyles({});

  return (
    <BtnBase
      style={style}
      className={classnames({
        [classes.inputBoolean]: true,
        [className]: !!className,
      })}
      onClick={disabled ? undefined : onChange}
    >
      <Icon children="edit" style={{ marginRight: 10 }} />
      <Text children={label} />
    </BtnBase>
  );
};

export default InputButton;
