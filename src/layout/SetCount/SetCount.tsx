import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Popover, { PopoverOrigin } from "../../core/Popover";
import Text from "../../core/Text";
import BtnBase from "../../core/BtnBase";
import Toolbar from "../../core/Toolbar";
import List from "../../core/List";
import Placeholder from "../../core/Placeholder";
import Chip from "../../core/Chip";
import { getTheme } from "../../theme";
import hexToRgbA from "../../utils/hexToRgbA";
import { defaultSetCountCopy } from "./constants";
import { ISetCount } from "./types";

const originAnchor: PopoverOrigin = {
  vertical: "top",
  horizontal: "left",
};

const originTransf: PopoverOrigin = {
  vertical: "top",
  horizontal: "right",
};

const COUNT_SIZE = 18;

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  count: {
    border: `1px solid ${getTheme().colors.grayBorder}`,
    padding: "0 5px",
    margin: "0 8px",
    borderRadius: getTheme().borderRadius,
    backgroundColor: getTheme().colors.background,
    width: COUNT_SIZE,
    minWidth: COUNT_SIZE,
    maxWidth: COUNT_SIZE,
    height: COUNT_SIZE,
    minHeight: COUNT_SIZE,
    maxHeight: COUNT_SIZE,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    "&:hover": {
      backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.15),
      borderColor: ({ color }: IStyles) => color,
      color: ({ color }: IStyles) => color,
    },
  },
  countSelected: {
    backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.15),
    borderColor: ({ color }: IStyles) => color,
    color: ({ color }: IStyles) => color,
  },
  menu: {
    width: 250,
    maxHeigth: 250,
  },
  menuToolbar: {
    padding: "0 15px",
  },
  menuList: {
    maxHeight: 200,
    overflow: "auto",
    padding: "5px 15px 20px",
  },
  menuPlaceholder: {
    position: "relative",
    height: 60,
    paddingBottom: 20,
  },
});

const SetCount = ({
  color = getTheme().colors.theme1,
  chips = [],
  copy = defaultSetCountCopy,
}: ISetCount) => {
  const classes = useStyles({ color });
  const countRef = React.useRef(null);
  const [countMenu, setCountMenu] = React.useState(false);
  const onCountMenuShow = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setCountMenu(true);
  }, []);
  const onCountMenuHide = React.useCallback(() => {
    setCountMenu(false);
  }, []);

  return (
    <>
      <BtnBase
        ref={countRef}
        className={classnames({
          [classes.count]: true,
          [classes.countSelected]: countMenu,
        })}
        onClick={onCountMenuShow}
      >
        <Text children={String(chips.length)} ellipsis={true} tooltip={false} />
      </BtnBase>
      <Popover
        anchorEl={countRef.current}
        open={countMenu}
        onClose={onCountMenuHide}
        originAnchor={originAnchor}
        originTransf={originTransf}
        className={classes.menu}
      >
        <Toolbar className={classes.menuToolbar}>
          <Text size={3} weight="bolder" children={copy.title} />
        </Toolbar>
        {!!chips.length ? (
          <List className={classes.menuList}>
            {chips.map((c) => (
              <Chip
                key={c.id}
                {...c}
                label={c.label || c.id}
                selected
                color={color}
              />
            ))}
          </List>
        ) : (
          <Placeholder
            icon={copy.placeholderIcon}
            label={copy.placeholderLabel}
            className={classes.menuPlaceholder}
          />
        )}
      </Popover>
    </>
  );
};

export default SetCount;
