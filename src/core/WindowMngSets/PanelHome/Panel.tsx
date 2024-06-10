import * as React from "react";
import List from "../../List";
import { createUseStyles } from "react-jss";
import { IMngSet, IMngChipValue, IMngSetPayload } from "../interfaces";
import ButtonNewSet from "./ButtonNewSet";
import PanelToolbar from "./PanelToolbar";
import PanelListItem from "./PanelListItem";
import Card from "../../Card";
import Toolbar from "../../Toolbar";
import { ERROR_MAX_SETS } from "../constants";
import Placeholder from "../../Placeholder";
import { IChip } from "../../Chip";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  panel: {
    width: "-webkit-fill-available",
    height: "-webkit-fill-available",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  list: {
    position: "relative",
    margin: "5px 15px 15px",
    flex: 1,
    overflow: "auto",
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    padding: 0,
  },
});

interface IPanel {
  colorOwner: string;
  colorShare: string;
  titleText: string;
  titleInfo: string | string[];
  loadingBool: boolean;
  loadingText: string;
  sets: IMngSet[];
  selectedId: string;
  chipValues: IMngChipValue[];
  getChip: (chipValue: IMngChipValue, set: IMngSetPayload) => IChip;
  onClose: () => void;
  onBtnCreate: () => void;
  onBtnImport: () => void;
  onSelectSet: (setId: string) => void;
  onRemoveSet: (setId: string, setPayload: IMngSetPayload) => void;
  onClonedSet: (setId: string, setPayload: IMngSetPayload) => void;
  onEditorSet: (setId: string, setPayload: IMngSetPayload) => void;
  onSharedSet: (setId: string, setPayload: IMngSetPayload) => void;
  sharedSets: IMngSet[];
  canShared: boolean;
  canCreate: boolean;
}
const Panel = ({
  colorOwner,
  colorShare,
  titleText,
  titleInfo,
  loadingBool,
  loadingText,
  sets,
  selectedId,
  chipValues,
  getChip,
  onClose,
  onBtnCreate,
  onBtnImport,
  onSelectSet,
  onRemoveSet,
  onClonedSet,
  onEditorSet,
  onSharedSet,
  sharedSets,
  canShared,
  canCreate,
}: IPanel) => {
  const classes = useStyles({});
  return (
    <Card className={classes.panel} elevation={0}>
      <PanelToolbar
        titleText={titleText}
        titleInfo={titleInfo}
        loadingBool={loadingBool}
        loadingText={loadingText}
        onClose={onClose}
      />
      <Toolbar>
        <ButtonNewSet
          color={colorOwner}
          label="Create a new Set"
          icon="add"
          tooltip={!canCreate ? ERROR_MAX_SETS : undefined}
          disabled={!canCreate || loadingBool}
          onClick={onBtnCreate}
        />
        {!canShared ? null : (
          <>
            <div style={{ minWidth: 10 }} />
            <ButtonNewSet
              color={colorShare}
              label="Import a Set"
              icon="download"
              disabled={!canCreate || loadingBool}
              onClick={onBtnImport}
            />
          </>
        )}
      </Toolbar>
      <List className={classes.list}>
        {sets
          .sort((a, b) => {
            if (a.created > b.created) return -1;
            if (a.created < b.created) return +1;
            return 0;
          })
          .map(({ id, payload }) => (
            <PanelListItem
              key={id}
              setId={id}
              setPayload={payload}
              chipValues={chipValues}
              shared={sharedSets.some((s) => s.id === id)}
              active={id === selectedId}
              onSelect={onSelectSet}
              onRemove={onRemoveSet}
              onCloned={onClonedSet}
              onEditor={onEditorSet}
              onShared={onSharedSet}
              getChip={getChip}
              canShared={canShared}
              canCreate={canCreate}
              loading={loadingBool}
              colorOwner={colorOwner}
              colorShare={colorShare}
            />
          ))}
        <Placeholder open={!sets.length} label="You have no Set" />
      </List>
    </Card>
  );
};

export default Panel;
