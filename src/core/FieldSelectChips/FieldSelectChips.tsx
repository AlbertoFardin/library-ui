import * as React from "react";
import { getTheme } from "../../theme";
import { createUseStyles } from "react-jss";
import List from "../List";
import Text from "../Text";
import FieldSearch from "../FieldSearch";
import GroupChips from "./GroupChips";
import Placeholder from "../Placeholder";
import classnames from "classnames";
import FacetToggle from "./FacetToggle";
import FieldLabel from "../FieldLabel";
import { IFieldSelectChips } from "./interfaces";

const getChipDefault = (c) => c;
const useStyles = createUseStyles({
  field: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    borderRadius: getTheme().borderRadius,
    "&:hover": {
      borderColor: getTheme().colors.typography,
    },
  },
  fieldFocused: {
    borderColor: `${getTheme().colors.theme1} !important`,
  },
  search: {
    width: "-webkit-fill-available",
    margin: 10,
    border: 0,
  },
  list: {
    position: "relative",
    overflow: "auto",
    padding: 0,
    flex: 1,
    minHeight: 82,
    borderBottomRightRadius: getTheme().borderRadius,
    borderBottomLeftRadius: getTheme().borderRadius,
  },
  label: {
    position: "absolute",
    top: "-30px",
    left: 7,
    zIndex: 1,
  },
  labelFocused: {
    color: getTheme().colors.theme1,
  },
  switchOnlyMandatory: {
    margin: 0,
    position: "absolute",
    right: 5,
    top: "-20px",
    "& > div": {
      boxShadow: "none",
      border: `1px solid ${getTheme().colors.grayBorder}`,
    },
  },
});

const FieldSelectChips = ({
  color = getTheme().colors.theme1,
  style,
  className,
  label,
  labelMandatory,
  labelStyle,
  labelClassName,
  chipsSelected,
  chipsValues,
  chipsGroups,
  onChange,
  getChip = getChipDefault,
  disabled,
}: IFieldSelectChips) => {
  const classes = useStyles({});

  const [inputValue, setInputValue] = React.useState("");
  const [inputFocus, setInputFocus] = React.useState(false);
  const [onlyMandatory, setOnlyMandatory] = React.useState(false);

  const chipsGroupsSet = new Set(chipsGroups.map((g) => g.id));
  const chipsFound = chipsValues
    .sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    })
    .filter((c) => {
      const vLabel = c.label.toLocaleLowerCase();
      const vInput = inputValue.toLocaleLowerCase();
      return vLabel.includes(vInput);
    });

  const thereAreMandatory = chipsValues.some((c) => c.mandatory);

  const onToggleOnlyMandatory = React.useCallback(() => {
    setOnlyMandatory(!onlyMandatory);
  }, [onlyMandatory, setOnlyMandatory]);
  const onChipsSelect = React.useCallback(
    (ids: string[]) => {
      const newSelected = Array.from(chipsSelected);
      ids.forEach((id) => {
        newSelected.splice(0, 0, id);
      });
      onChange(newSelected);
    },
    [chipsSelected, onChange],
  );
  const onChipsRemove = React.useCallback(
    (ids: string[]) => {
      const newSelected = Array.from(chipsSelected);
      ids.forEach((id) => {
        const index = newSelected.findIndex((s) => s === id);
        newSelected.splice(index, 1);
      });
      onChange(newSelected);
    },
    [chipsSelected, onChange],
  );
  const onSearchFocus = React.useCallback(() => {
    setInputFocus(true);
  }, []);
  const onSearchBlur = React.useCallback(() => {
    setInputFocus(false);
  }, []);

  return (
    <div
      style={style}
      className={classnames({
        [classes.field]: true,
        [classes.fieldFocused]: inputFocus,
        [className]: !!className,
      })}
    >
      {!label ? null : (
        <Text
          style={labelStyle}
          className={classnames({
            [classes.label]: true,
            [classes.labelFocused]: inputFocus,
            [labelClassName]: !!labelClassName,
          })}
          children={<FieldLabel label={label} mandatory={labelMandatory} />}
        />
      )}
      {!thereAreMandatory ? null : (
        <FacetToggle
          color={color}
          className={classes.switchOnlyMandatory}
          onChange={onToggleOnlyMandatory}
          help="Show all items or only mandatory"
          actions={[
            {
              id: "b",
              selected: onlyMandatory === true,
              label: "Mandatory*",
              width: 100,
            },
            {
              id: "a",
              selected: onlyMandatory === false,
              label: "All items",
              width: 100,
            },
          ]}
        />
      )}
      <FieldSearch
        color={color}
        className={classes.search}
        value={inputValue}
        onChange={setInputValue}
        onBlur={onSearchBlur}
        onFocus={onSearchFocus}
      />
      <List className={classes.list}>
        {chipsGroups.map((g) => (
          <GroupChips
            key={g.id}
            input={inputValue}
            title={g.label}
            chips={chipsFound.filter((c) => c.groupId === g.id)}
            chipsSelected={chipsSelected}
            onChipsSelect={onChipsSelect}
            onChipsRemove={onChipsRemove}
            getChip={getChip}
            onlyMandatory={onlyMandatory}
            disabled={disabled}
            color={color}
          />
        ))}
        <GroupChips
          title="Without group"
          input={inputValue}
          chips={chipsFound.filter((c) => !chipsGroupsSet.has(c.groupId))}
          chipsSelected={chipsSelected}
          onChipsSelect={onChipsSelect}
          onChipsRemove={onChipsRemove}
          getChip={getChip}
          onlyMandatory={onlyMandatory}
          disabled={disabled}
          color={color}
        />
        <Placeholder
          open={!chipsFound.length}
          label="You have no selectable items"
        />
      </List>
    </div>
  );
};

export default FieldSelectChips;
