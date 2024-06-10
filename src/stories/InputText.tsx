import * as React from "react";
import Text from "../core/Text";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { ITheme, getTheme } from "../theme";

const useStyles = createUseStyles({
  inputText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: 300,
    padding: 10,
    "& input, & textarea": {
      padding: "5px 10px",
      marginTop: 5,
      opacity: 1,
      border: ({ colors }: ITheme) => `1px solid ${colors.grayBorder}`,
      outline: "none",
      borderRadius: ({ borderRadius }: ITheme) => borderRadius,
      color: ({ colors }: ITheme) => colors.typography,
      backgroundColor: ({ colors }: ITheme) => colors.background,
      alignSelf: "stretch",
      resize: "none",
      flex: 1,
    },
  },
});

interface IInputText {
  style?: React.CSSProperties;
  className?: string;
  label: string;
  value: string;
  onChange?: (v) => void;
  disabled?: boolean;
  textarea?: boolean;
}
const InputText = ({
  style,
  className,
  label,
  value = "",
  onChange,
  disabled,
  textarea,
}: IInputText) => {
  const classes = useStyles(getTheme());
  const cbChange = React.useCallback(
    (event) => {
      onChange(event.target.value);
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
      {!textarea ? (
        <input
          disabled={disabled}
          type="string"
          value={value}
          onChange={cbChange}
        />
      ) : (
        <textarea disabled={disabled} value={value} onChange={cbChange} />
      )}
    </div>
  );
};

export default InputText;
