import * as React from "react";
import { createUseStyles } from "react-jss";
import PanelToolbar from "./PanelToolbar";
import { Slide } from "../../../core/Transitions";
import { IMngChipGroup, IMngChipValue, IMngSetPayload } from "../interfaces";
import { WINDOW_HEIGHT_MAX } from "../constants";
import { IChip } from "../../../core/Chip";
import FieldSelectChips from "../../../core/Filter/FilterSelectChips";
import { FieldText } from "../../../core/Field";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  panel: {
    width: "100%",
    height: WINDOW_HEIGHT_MAX,
    background: getTheme().colors.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  content: {
    boxSizing: "border-box",
    position: "relative",
    padding: "0 10px 10px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  fieldChipsLabel: {
    position: "absolute",
    transform: "translate(8px, -9px) scale(0.75)",
    transformOrigin: "top left",
    top: 0,
    left: 3,
    background: getTheme().colors.background,
    zIndex: 1,
    padding: "0 7px",
  },
  fieldRename: {
    margin: "5px 0 30px",
  },
});

interface IPanel {
  color: string;
  open: boolean;
  setId: string;
  setPayload: IMngSetPayload;
  chipMaxSlc: number;
  chipValues: IMngChipValue[];
  chipGroups: IMngChipGroup[];
  onClose: () => void;
  onUpdate: (setId: string, setPayload: IMngSetPayload) => void;
  getChip: (
    chipValue: IMngChipValue,
    setPayload: IMngSetPayload,
    shared?: boolean,
  ) => IChip;
  onError: (err: string) => void;
}

const Panel = ({
  color,
  open,
  setId,
  setPayload,
  chipMaxSlc,
  chipValues,
  chipGroups,
  onClose,
  onUpdate,
  getChip,
  onError,
}: IPanel) => {
  const classes = useStyles({});

  const chipsSelected = setPayload ? setPayload.items.map((c) => c.id) : [];
  const onChangeChips = React.useCallback(
    (slcIds: string[]) => {
      if (slcIds.length > chipMaxSlc) {
        onError(`You can't select more than ${chipMaxSlc} items`);
      } else {
        onUpdate(setId, {
          ...setPayload,
          items: slcIds.map((id) => {
            const oldItem = setPayload.items.find((a) => a.id === id);
            const newItem = { id };
            return oldItem || newItem;
          }),
        });
      }
    },
    [chipMaxSlc, onError, onUpdate, setId, setPayload],
  );
  const onSetRename = React.useCallback(
    (value: string) => {
      onUpdate(setId, {
        ...setPayload,
        label: value,
      });
    },
    [onUpdate, setId, setPayload],
  );
  const getChipComplete = React.useCallback(
    (chipValue: IMngChipValue) => {
      return getChip(chipValue, setPayload);
    },
    [getChip, setPayload],
  );

  return (
    <Slide open={open} className={classes.panel} direction="left">
      <PanelToolbar onClose={onClose} />
      <div className={classes.content}>
        <FieldText
          className={classes.fieldRename}
          label={[
            {
              text: "Name",
              style: {
                backgroundColor: getTheme().colors.background,
                transform: "translate(0px, 9px) scale(0.75)",
                zIndex: 1,
                padding: "0 7px",
              },
              positionX: "left",
              positionY: "top",
            },
          ]}
          placeholder="Write your Set's name"
          value={setPayload.label}
          onChange={onSetRename}
          adornmentIcon="edit"
        />
        <FieldSelectChips
          label="Items"
          labelClassName={classes.fieldChipsLabel}
          chipsGroups={chipGroups}
          chipsValues={chipValues}
          chipsSelected={chipsSelected}
          onChange={onChangeChips}
          getChip={getChipComplete}
          color={color}
        />
      </div>
    </Slide>
  );
};

export default Panel;
