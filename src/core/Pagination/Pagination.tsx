import * as React from "react";
import { getTheme } from "../../theme";
import { createUseStyles } from "react-jss";
import Text from "../Text";
import classnames from "classnames";
import Tooltip from "../Tooltip";
import BtnArrow from "./BtnArrow";
import Btn from "../Btn";
import { IPageSize, IPagination } from "./interfaces";
import { PopoverOrigin } from "../Popover";

const getInputWidth = (value: number) => String(value).length * 6 + 25;
const pageMin = 1;
const getMenuRadio = (p: IPageSize) => {
  return {
    id: String(p.value),
    label: p.label,
    active: p.selected,
    icon: p.selected ? "radio_button_checked" : "radio_button_unchecked",
    iconStyle: p.selected ? { color: getTheme().colors.theme1 } : {},
  };
};
const styleInputFocus = { borderColor: getTheme().colors.theme1 };
const useStyles = createUseStyles({
  pagination: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    margin: "0 5px",
  },
  labelSelected: {
    color: getTheme().colors.theme1,
  },
  input: {
    outline: "none",
    backgroundColor: getTheme().colors.background,
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    minWidth: 10,
    color: getTheme().colors.typography,
    padding: "0 1px",
    textAlign: "center",
    fontSize: 12,
    height: 20,
    "&:focus": styleInputFocus,
    "&:hover": styleInputFocus,
    "&:read-only": {
      cursor: "pointer",
    },
  },
});

const menuOriginAnchorDefault: PopoverOrigin = {
  vertical: "auto",
  horizontal: "auto",
};
const menuOriginTransfDefault: PopoverOrigin = {
  vertical: "auto",
  horizontal: "auto",
};

const Pagination = ({
  style,
  className,
  count,
  textPrev,
  textNext,
  onChangeCurr,
  onChangeSize,
  pageCurr,
  pageSize = 1,
  minimal,
  menuOriginAnchor = menuOriginAnchorDefault,
  menuOriginTransf = menuOriginTransfDefault,
}: IPagination) => {
  const classes = useStyles({});
  const inputRef = React.useRef(null);
  const [input, setInput] = React.useState(pageCurr);

  const size = Number.isInteger(pageSize)
    ? (pageSize as number)
    : (pageSize as IPageSize[]).find(({ selected }) => selected).value;
  const pageMax = Math.max(1, Math.ceil(count / size));
  const cbOnInputChange = React.useCallback(
    (event) => {
      const newValue = event.target.value;
      // check if value is a number
      if (!isNaN(newValue)) setInput(newValue);
      // else reset input value
      else inputRef.current.value = input;
    },
    [input],
  );
  const cbOnInputBlur = React.useCallback(
    (event) => {
      let newValue = Number(event.target.value);
      newValue = Math.min(pageMax, newValue);
      newValue = Math.max(pageMin, newValue);
      if (pageCurr !== newValue) {
        onChangeCurr(newValue);
        setInput(newValue);
        inputRef.current.value = newValue;
      }
    },
    [onChangeCurr, pageCurr, pageMax],
  );
  const cbOnChangeSize = React.useCallback(
    (event, id: string) => {
      const { selected } = (pageSize as IPageSize[]).find(
        (s) => String(id) === String(s.value),
      );
      if (!selected) {
        const newSizes = (pageSize as IPageSize[]).map(
          ({ value, label }: IPageSize) => ({
            value: value,
            label,
            selected: String(id) === String(value),
          }),
        );
        onChangeSize(newSizes);
      }
    },
    [onChangeSize, pageSize],
  );
  const cbOnClickLeft = React.useCallback(() => {
    const newValue = pageCurr - 1;
    onChangeCurr(newValue);
  }, [onChangeCurr, pageCurr]);
  const cbOnClickRight = React.useCallback(() => {
    const newValue = pageCurr + 1;
    onChangeCurr(newValue);
  }, [onChangeCurr, pageCurr]);
  const pageSizeMenu = !Number.isInteger(pageSize);

  React.useEffect(() => {
    setInput(pageCurr);
    if (inputRef && inputRef.current) inputRef.current.value = pageCurr;
  }, [pageCurr]);

  return (
    <div
      style={style}
      className={classnames({
        [classes.pagination]: true,
        [className]: !!className,
      })}
    >
      {minimal ? null : (
        <BtnArrow
          icon="keyboard_arrow_left"
          disabled={!input || input === pageMin}
          onClick={cbOnClickLeft}
        />
      )}
      {minimal || !textPrev ? null : (
        <Text className={classes.label} children={textPrev} />
      )}
      <Tooltip title="go to page…">
        <input
          type="number"
          ref={inputRef}
          min={pageMin}
          max={pageMax}
          style={{ width: getInputWidth(Number(input)) }}
          onBlur={cbOnInputBlur}
          className={classes.input}
          defaultValue={pageCurr}
          onChange={cbOnInputChange}
        />
      </Tooltip>
      <Text className={classes.label} children="/" />
      <Btn
        small
        style={{
          border: `1px solid ${getTheme().colors.grayBorder}`,
          margin: 0,
          padding: 0,
          textAlign: "center",
        }}
        label={String(pageMax)}
        labelStyle={{ fontWeight: "normal" }}
        tooltip={!pageSizeMenu ? undefined : "Select number of items per page"}
        menu={
          !pageSizeMenu
            ? undefined
            : {
                originAnchor: menuOriginAnchor,
                originTransf: menuOriginTransf,
                title: "Number of items per page",
                items: (pageSize as IPageSize[]).map((p) => ({
                  onClick: cbOnChangeSize,
                  ...getMenuRadio(p),
                })),
              }
        }
      />
      {minimal || !textNext ? null : (
        <Text className={classes.label} children={textNext} />
      )}
      {minimal ? null : (
        <BtnArrow
          icon="keyboard_arrow_right"
          disabled={!input || input === pageMax}
          onClick={cbOnClickRight}
        />
      )}
    </div>
  );
};

export default Pagination;
