import { createUseStyles } from "react-jss";
import List from "../../../core/List";
import { IMngSet, IMngChipValue, IMngSetPayload } from "../interfaces";
import ButtonNewSet from "./ButtonNewSet";
import PanelToolbar from "./PanelToolbar";
import PanelListItem from "./PanelListItem";
import Card from "../../../core/Card";
import Btn from "../../../core/Btn";
import Toolbar from "../../../core/Toolbar";
import { ERROR_MAX_SETS } from "../constants";
import Placeholder from "../../../core/Placeholder";
import { IChip } from "../../../core/Chip";
import { getTheme } from "../../../theme";

const useStyles = createUseStyles({
  panel: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
  },
  list: {
    position: "relative",
    margin: "5px 15px 0 15px",
    flex: 1,
    overflow: "auto",
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    padding: 0,
  },
  listMarginBottom: {
    padding: 7,
    width: "inherit",
  },
  btnLevels: {
    flex: 1,
    maxWidth: "inherit",
    margin: 0,
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
  getChip: (
    chipValue: IMngChipValue,
    set: IMngSetPayload,
    shared?: boolean,
  ) => IChip;
  onClose: () => void;
  onBtnCreate: () => void;
  onBtnShared: () => void;
  onBtnLevels: () => void;
  onSelectSet: (setId: string) => void;
  onRemoveSet: (setId: string, setPayload: IMngSetPayload) => void;
  onEditorSet: (setId: string, setPayload: IMngSetPayload) => void;
  onSharedUpsertSet: (setId: string, setPayload: IMngSetPayload) => void;
  onSharedDeleteSet: (setId: string, setPayload: IMngSetPayload) => void;
  onCreateSet: (setId: string, setPayload: IMngSetPayload) => void;
  canShared: boolean;
  canCreate: boolean;
  canLevels: boolean;
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
  onBtnShared,
  onBtnLevels,
  onSelectSet,
  onRemoveSet,
  onEditorSet,
  onSharedUpsertSet,
  onSharedDeleteSet,
  onCreateSet,
  canShared,
  canCreate,
  canLevels,
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
              onClick={onBtnShared}
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
          .map(({ id, payload, shareType }) => (
            <PanelListItem
              key={id}
              setId={id}
              setPayload={payload}
              setShareType={shareType}
              chipValues={chipValues}
              active={id === selectedId}
              onSelect={onSelectSet}
              onRemove={onRemoveSet}
              onCreate={onCreateSet}
              onEditor={onEditorSet}
              onSharedUpsert={onSharedUpsertSet}
              onSharedDelete={onSharedDeleteSet}
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
      {!canLevels || sets.length === 0 ? (
        <div className={classes.listMarginBottom} />
      ) : (
        <Toolbar>
          <Btn
            className={classes.btnLevels}
            label="Define the Default Set per Level"
            icon="settings"
            disabled={loadingBool}
            onClick={onBtnLevels}
          />
        </Toolbar>
      )}
    </Card>
  );
};

export default Panel;
