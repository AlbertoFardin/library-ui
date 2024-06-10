import * as React from "react";
import { createUseStyles } from "react-jss";
import PanelToolbar from "./PanelToolbar";
import Card from "../../Card";
import { Slide } from "../../Transitions";
import { IMngChipGroup, IMngChipValue, IMngSetPayload } from "../interfaces";
import { WINDOW_HEIGHT_MAX } from "../constants";
import { IChip } from "../../Chip";
import FieldSelectChips from "../../FieldSelectChips";
import { FieldText } from "../../Field";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  panel: {
    position: "absolute",
    width: "-webkit-fill-available",
    height: WINDOW_HEIGHT_MAX,
    zIndex: 1,
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  content: {
    width: "inherit",
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
    left: 0,
    background: getTheme().colors.background,
    zIndex: 1,
    padding: "0 7px",
  },
  fieldRename: {
    margin: "15px 0 30px",
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
  onModifySet: (setId: string, setPayload: IMngSetPayload) => void;
  getChip: (chipValue: IMngChipValue, setPayload: IMngSetPayload) => IChip;
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
  onModifySet,
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
        onModifySet(setId, {
          ...setPayload,
          items: slcIds.map((id) => {
            const oldItem = setPayload.items.find((a) => a.id === id);
            const newItem = { id };
            return oldItem || newItem;
          }),
        });
      }
    },
    [chipMaxSlc, onError, onModifySet, setId, setPayload],
  );
  const onSetRename = React.useCallback(
    (value: string) => {
      onModifySet(setId, {
        ...setPayload,
        label: value,
      });
    },
    [onModifySet, setId, setPayload],
  );
  const getChipComplete = React.useCallback(
    (chipValue: IMngChipValue) => {
      return getChip(chipValue, setPayload);
    },
    [getChip, setPayload],
  );

  return (
    <Slide open={open} direction="left">
      <Card className={classes.panel} elevation={0}>
        <PanelToolbar onClose={onClose} />
        <div className={classes.content}>
          <FieldText
            className={classes.fieldRename}
            label={[
              {
                label: "Name",
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
      </Card>
    </Slide>
  );
};

export default Panel;
