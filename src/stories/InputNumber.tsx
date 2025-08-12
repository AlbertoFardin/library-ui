import * as React from "react";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import Text from "../core/Text";
import { ITheme, getTheme } from "../theme";

const useStyles = createUseStyles({
  inputText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: 300,
    padding: 10,
    "& input": {
      padding: "5px 10px",
      marginTop: 5,
      opacity: 1,
      border: ({ colors }: ITheme) => `1px solid ${colors.grayBorder}`,
      outline: "none",
      borderRadius: ({ borderRadius }: ITheme) => borderRadius,
      color: ({ colors }: ITheme) => colors.typography,
      backgroundColor: ({ colors }: ITheme) => colors.background,
      alignSelf: "stretch",
    },
  },
});

interface IInputNumber {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  value: number;
  onChange?: (v: number) => void;
  disabled?: boolean;
}
const InputNumber = ({
  style,
  className,
  label,
  value,
  onChange,
  disabled,
}: IInputNumber) => {
  const classes = useStyles(getTheme());
  const cbChange = React.useCallback(
    (event) => {
      onChange(Number(event.target.value));
    },
    [onChange],
  );

  return (
    <div
      style={style}
      className={classnames({
        [classes.inputText]: true,
        [className]: !!className,
      })}
    >
      <Text children={label} />
      <input
        disabled={disabled}
        type="number"
        value={value}
        onChange={cbChange}
      />
    </div>
  );
};

export default InputNumber;
