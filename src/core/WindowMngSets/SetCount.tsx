import * as React from "react";
import Popover, { PopoverOrigin } from "../Popover";
import Text from "../Text";
import BtnBase from "../BtnBase";
import Toolbar from "../Toolbar";
import List from "../List";
import { createUseStyles } from "react-jss";
import Placeholder from "../Placeholder";
import { IMngChipValue, IMngSetPayload } from "./interfaces";
import Chip, { IChip } from "../Chip";
import { getTheme } from "../../theme";
import hexToRgbA from "../../utils/hexToRgbA";

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
  menu: {
    width: 250,
    "max-heigth": 250,
  },
  menuToolbar: {
    padding: "0 15px",
  },
  menuList: {
    "max-height": 200,
    overflow: "auto",
    padding: "5px 15px 20px",
  },
  menuPlaceholder: {
    height: 80,
  },
});

interface ISetCount {
  color: string;
  setPayload: IMngSetPayload;
  chipValues: IMngChipValue[];
  getChip: (chipValue: IMngChipValue, setPayload: IMngSetPayload) => IChip;
}

const SetCount = ({ color, setPayload, chipValues, getChip }: ISetCount) => {
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

  const { items } = setPayload;
  const chipsId = [...new Set(items.map((c) => c.id))]; // evito i dupplicati
  const chips = chipsId
    .filter((itemId) => {
      const chip = chipValues.find((c) => c.id === itemId);
      return !!chip;
    })
    .map((itemId) => {
      const chip = chipValues.find((c) => c.id === itemId);
      return {
        ...getChip(chip, setPayload),
        id: itemId,
        label: chip.label,
        color,
        selected: true,
        tooltip: undefined,
      };
    });

  return (
    <>
      <BtnBase
        ref={countRef}
        className={classes.count}
        onClick={onCountMenuShow}
      >
        <Text
          weight="bolder"
          children={String(chips.length)}
          ellipsis={true}
          tooltip={false}
        />
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
          <Text size={3} weight="bolder" children="Set composition" />
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
          <div className={classes.menuPlaceholder}>
            <Placeholder label="Set without items selected" />
          </div>
        )}
      </Popover>
    </>
  );
};

export default SetCount;
