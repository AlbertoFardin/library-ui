import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { getTheme } from "../../../theme";
import { Collapse } from "../../Transitions";
import Text from "../../Text";
import Chip, { IChip } from "../../Chip";
import Btn from "../../Btn";
import { IMngChipValue } from "../../../layout/WindowMngSets";
import Icon from "../../Icon";
import setTextBold from "../../../utils/setTextBold";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  group: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "transparent",
    "&:hover $groupHeader": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  groupHeader: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 15px 0 10px",
    height: 40,
    color: ({ color }: IStyles) => color,
    transition: "all 150ms",
    position: "sticky",
    top: 0,
    zIndex: 1,
    borderTop: `1px solid ${getTheme().colors.grayBorder}`,
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  groupContent: {
    padding: "5px 8px 10px",
    overflowY: "auto",
    transition: "all 150ms",
  },
  headerIcon: {
    marginLeft: 10,
  },
  count: {
    backgroundColor: getTheme().colors.grayDrawer,
    marginRight: 5,
    borderRadius: 5,
    padding: "0 5px",
    border: `1px solid ${getTheme().colors.grayBorder}`,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  countColored: {
    color: ({ color }: IStyles) => color,
    borderColor: ({ color }: IStyles) => color,
  },
  btnSelect: {
    margin: "0 3px 0 4px",
    "& span": {
      fontSize: "16px !important",
    },
  },
});

interface IGroupChips {
  color: string;
  title: string;
  input: string;
  chips: IMngChipValue[];
  chipsSelected: string[];
  onChipsSelect: (ids: string[]) => void;
  onChipsRemove: (ids: string[]) => void;
  getChip: (chipValue: IMngChipValue) => IChip;
  onlyMandatory: boolean;
  disabled?: boolean;
}

const GroupChips = ({
  color,
  title,
  input,
  chips: allGroupChips,
  chipsSelected,
  onChipsSelect,
  onChipsRemove,
  getChip,
  onlyMandatory,
  disabled,
}: IGroupChips) => {
  const classes = useStyles({ color });

  const chips = allGroupChips.filter((c) =>
    onlyMandatory ? c.mandatory : true,
  );
  const sel = React.useMemo(() => {
    const groupSelIds = chipsSelected.filter((id) =>
      chips.find((c) => c.id === id),
    );
    return new Set(groupSelIds);
  }, [chips, chipsSelected]);

  const datasDes = chips.filter((c) => !sel.has(c.id));
  const datasSel = chips.filter((c) => sel.has(c.id));
  const datasSelEnabled = datasSel.filter((c) => !getChip(c).disabled);
  const selectedAll = datasSel.length === chips.length;

  const [close, setClose] = React.useState(true);
  const onClose = React.useCallback(() => setClose(!close), [close]);

  const onSelectAll = React.useCallback(() => {
    onChipsSelect(datasDes.map((c) => c.id));
  }, [datasDes, onChipsSelect]);
  const onDeselectAll = React.useCallback(() => {
    onChipsRemove(datasSelEnabled.map((c) => c.id));
  }, [datasSelEnabled, onChipsRemove]);
  const onClickChip = React.useCallback(
    (id: string) => {
      if (sel.has(id)) {
        onChipsRemove([id]);
      } else {
        onChipsSelect([id]);
      }
    },
    [onChipsRemove, onChipsSelect, sel],
  );

  if (!chips.length) return null;

  return (
    <div className={classes.group}>
      <div
        role="presentation"
        className={classes.groupHeader}
        onClick={onClose}
      >
        {datasSel.length ? (
          <Btn
            disabled={disabled}
            small
            className={classes.btnSelect}
            onClick={onDeselectAll}
            color={color}
            tooltip="Deselect All"
            icon={selectedAll ? "check_box" : "indeterminate_check_box"}
          />
        ) : (
          <Btn
            disabled={disabled}
            small
            className={classes.btnSelect}
            onClick={onSelectAll}
            color={color}
            tooltip="Select All"
            icon="check_box_outline_blank"
          />
        )}
        <Text
          className={classnames({
            [classes.count]: true,
            [classes.countColored]: selectedAll,
          })}
        >
          <>
            <span
              className={classnames({
                [classes.countColored]: !!datasSel.length,
              })}
              children={datasSel.length}
            />
            <span style={{ fontSize: 9, margin: "0 2px" }} children="/" />
            <span children={chips.length} />
          </>
        </Text>
        <Text ellipsis children={title} />
        <div style={{ flex: 1 }} />
        {!!input ? null : (
          <Icon
            className={classes.headerIcon}
            children={close ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          />
        )}
      </div>
      <Collapse open={!!input || !close}>
        <div className={classes.groupContent}>
          {chips.map((c) => {
            const p = getChip(c);
            return (
              <Chip
                key={c.id}
                {...p}
                onClick={onClickChip}
                color={color}
                icon={sel.has(c.id) ? "check" : ""}
                label={setTextBold(input, c.label)}
                selected={sel.has(c.id)}
                disabled={p.disabled || disabled}
              />
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

export default GroupChips;
