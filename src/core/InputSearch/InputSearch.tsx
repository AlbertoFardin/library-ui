/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../theme";
import Btn, { IBtn } from "../Btn";
import CircularProgress from "../CircularProgress";
import Zoom from "../Transitions/Zoom";

const valueDefault = "";
const useStyles = createUseStyles({
  field: {
    border: `1px solid ${getTheme().colors.grayBorder}`,
    transition: "all 250ms",
    borderRadius: 25,
    backgroundColor: getTheme().colors.background,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 400,
  },
  fieldInput: {
    minWidth: 20,
    outline: "none",
    border: 0,
    backgroundColor: "transparent",
    alignSelf: "stretch",
    flex: 1,
    color: getTheme().colors.typography,
  },
});

export interface IInputSearch {
  cmpRef?: React.Ref<HTMLDivElement>;
  color?: string;
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (s: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  buttonInput?: IBtn;
  buttonClear?: IBtn;
  debounce?: number;
  children?: JSX.Element | React.ReactNode;
}

const InputSearch = ({
  cmpRef,
  color = getTheme().colors.theme1,
  autoFocus,
  placeholder = "Search...",
  value = valueDefault,
  onChange,
  onFocus,
  onBlur,
  className,
  style,
  disabled,
  loading,
  buttonInput,
  buttonClear,
  debounce = 300,
  children,
}: IInputSearch) => {
  const classes = useStyles({});
  const [inputValue, setInputValue] = React.useState(value);
  const onInputChange = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setInputValue(event.target.value);
    },
    [setInputValue],
  );
  const onInputClean = React.useCallback(() => {
    onChange(valueDefault);
  }, [onChange]);

  // Debounce effect
  React.useEffect(() => {
    if (inputValue === value) return undefined;
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, debounce);
    return () => clearTimeout(handler);
  }, [inputValue, value, debounce, onChange]);

  // Keep local state in sync with external value if it changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      ref={cmpRef}
      style={style}
      className={classnames({
        [classes.field]: true,
        [className]: !!className,
      })}
    >
      {loading ? (
        <CircularProgress
          size={15}
          style={{ color, margin: "8px 8px 8px 9px" }}
        />
      ) : (
        <Btn
          color={color}
          style={{ margin: 0 }}
          icon="search"
          disabled
          {...buttonInput}
        />
      )}
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classes.fieldInput}
        disabled={!!disabled}
        value={inputValue}
      />
      <Zoom open={!!value && !disabled}>
        <Btn
          color={color}
          style={{ margin: "0px 5px" }}
          icon="close"
          tooltip="Clean"
          onClick={onInputClean}
          small
          {...buttonClear}
        />
      </Zoom>
      {children}
    </div>
  );
};

export default InputSearch;
