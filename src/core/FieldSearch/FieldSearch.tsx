/* eslint-disable jsx-a11y/no-autofocus */
import * as React from "react";
import { getTheme } from "../../theme";
import Btn, { IBtn } from "../Btn";
import useDebounce from "../../utils/useDebounce";
import { createUseStyles } from "react-jss";
import CircularProgress from "../CircularProgress";
import classnames from "classnames";
import Zoom from "../Transitions/Zoom";

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
    outline: "none",
    border: 0,
    backgroundColor: "transparent",
    alignSelf: "stretch",
    flex: 1,
    color: getTheme().colors.typography,
  },
});

export interface IFieldSearch {
  color?: string;
  autofocus?: boolean;
  placeholder?: string;
  value: string;
  onChange: (s: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  button?: IBtn;
}

const FieldSearch = ({
  color = getTheme().colors.theme1,
  autofocus,
  placeholder = "Search...",
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  style,
  disabled,
  loading,
  button,
}: IFieldSearch) => {
  const classes = useStyles({});
  const inputRef = React.useRef(null);
  const searching = React.useRef(false);
  const [inputValue, setInputValue] = React.useState(value);
  const inputValueDebounced = useDebounce(inputValue, 500);

  const onInputChange = React.useCallback((event) => {
    setInputValue(event.target.value);
    searching.current = true;
  }, []);
  const onInputClean = React.useCallback(() => {
    inputRef.current.value = "";
    onChange("");
    setInputValue("");
  }, [onChange]);

  React.useEffect(() => {
    if (searching.current) {
      onChange(inputValueDebounced);
      searching.current = false;
    }
  }, [inputValueDebounced, onChange]);

  return (
    <div
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
          {...button}
        />
      )}

      <input
        ref={inputRef}
        autoFocus={autofocus}
        placeholder={placeholder}
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classes.fieldInput}
        disabled={!!disabled}
      />
      <Zoom open={!!value}>
        <Btn
          color={color}
          style={{ margin: "0px 5px" }}
          icon="close"
          tooltip="Clean"
          onClick={onInputClean}
          small
        />
      </Zoom>
    </div>
  );
};

export default FieldSearch;
