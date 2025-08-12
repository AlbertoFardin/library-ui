import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import CardDraggable from "../../core/CardDraggable";
import { IChip } from "../../core/Chip";
import {
  IWindowMngSets,
  IMngChipValue,
  WINDOW_PANELS,
  IMngSetUser,
  IMngSetPayload,
  IMngSet,
  IMngLevel,
} from "./interfaces";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT_MIN,
  WINDOW_HEIGHT_MAX,
  CLS_DRAGING,
  MAX_SET_COUNT,
  DRAFT_PAYLOAD,
  ERROR,
} from "./constants";
import { ShareType, Initialize } from "../../interfaces";
import PanelHome from "./PanelHome";
import PanelEditor from "./PanelEditor";
import PanelShared from "./PanelShared";
import PanelLevels from "./PanelLevels";
import {
  cleanSets,
  getLoadingData,
  updateSetsAfterCreate,
  updateSetsAfterModify,
  updateSetsAfterRemove,
  updateSetsAfterShare,
} from "./functions";
import reducer, { ACTIONS, reducerInitState } from "./reducer";
import emptyFn from "../../utils/emptyFn";
import { getTheme } from "../../theme";
import { DATE_FORMAT } from "../../constants";

const useStyles = createUseStyles({
  window: {
    width: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT_MIN,
    maxHeight: WINDOW_HEIGHT_MAX,
  },
  windowPanel: {
    height: WINDOW_HEIGHT_MAX,
    minHeight: WINDOW_HEIGHT_MAX,
  },
  windowClosed: {
    display: "none !important",
  },
});

const getChipDefault = (c: IMngChipValue, color: string): IChip => ({
  id: c.id,
  label: c.label,
  tooltip: c.tooltip,
  mandatory: c.mandatory,
  color,
});
const getUserDefault = (id: string): IMngSetUser => {
  return {
    id,
    name: "Unknown User",
    avatar: "",
    avatarIcon: "person_outline",
    avatarText: "",
  };
};
const getItemsDefault = async () => [];

const WindowMngSets = ({
  colorOwner = getTheme().colors.theme1,
  colorShare = getTheme().colors.theme2,
  open,
  titleText,
  titleInfo,
  positionX,
  positionY,
  loading,
  ownerId,
  sets: setsDirty,
  selectedId,
  chipMaxSlc,
  chipValues,
  chipGroups,
  context,
  onClose,
  onCreateSet,
  onRemoveSet,
  onUpdateSet,
  onSetsChanged,
  getChip,
  getUser = getUserDefault,
  onError = emptyFn,
  dateFormat = DATE_FORMAT,
  enableShared = false,
  onSharedUpsert = emptyFn,
  onSharedDelete = emptyFn,
  getItemsShared = getItemsDefault,
  enableLevels = false,
  onLevelsUpdate = emptyFn,
  getItemsLevels = getItemsDefault,
}: IWindowMngSets) => {
  const classes = useStyles({});
  const sets = cleanSets(setsDirty, chipValues);
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    initialize,
    initCreate,
    initRemove,
    initUpdate,
    initSharedUpsert,
    initSharedDelete,
    initLevels,
    panel,
    levelsListItems,
    draftSetId,
    draftSetPayload,
    needSaveEditor,
    needSaveLevels,
  } = state;

  const canCreate = sets.length <= MAX_SET_COUNT;
  const [loadingBool, loadingText] = getLoadingData({
    loading,
    initialize,
    initCreate,
    initRemove,
    initUpdate,
    initSharedUpsert,
    initSharedDelete,
    initLevels,
    needSaveEditor,
    needSaveLevels,
  });

  const cbOnSetsChanged = React.useCallback(
    (setId: string, newSets: IMngSet[]) => {
      onSetsChanged(context, setId, newSets);

      // pulisco i levels -> svuoto i setId che non esistono come sets
      let needSaveLevels = false;
      const setsId = new Set(newSets.map((s) => s.id));
      const newLevels = levelsListItems.map((l) => {
        const notExistSetId = !!l.setId && !setsId.has(l.setId);
        if (notExistSetId) {
          needSaveLevels = true;
          const data: IMngLevel = { ...l, setId: "" };
          return data;
        }
        return l;
      });
      if (needSaveLevels) {
        dispatch({
          type: ACTIONS.DRAFT_LEVELS,
          levels: newLevels,
          fetchs: true,
        });
      }
    },
    [context, levelsListItems, onSetsChanged],
  );
  const cbGetChip = React.useCallback(
    (chip: IMngChipValue, setPayload: IMngSetPayload, shared = false) => {
      try {
        return getChip(chip, setPayload, shared);
      } catch {
        return getChipDefault(chip, colorOwner);
      }
    },
    [getChip, colorOwner],
  );
  const cbOnClickBtnCreate = React.useCallback(() => {
    dispatch({
      type: ACTIONS.INIT_CREATE_STARTED,
      setPayload: DRAFT_PAYLOAD,
    });
  }, []);
  const cbOnClickBtnShared = React.useCallback(() => {
    dispatch({ type: ACTIONS.PANEL_TO_SHARED });
  }, []);
  const cbOnClickBtnLevels = React.useCallback(() => {
    dispatch({ type: ACTIONS.PANEL_TO_LEVELS });
  }, []);
  const cbOnClosePanel = React.useCallback(() => {
    dispatch({ type: ACTIONS.PANEL_TO_HOME });
  }, []);
  const cbOnSelectSet = React.useCallback(
    (setId: string) => {
      cbOnSetsChanged(setId, sets);
    },
    [cbOnSetsChanged, sets],
  );
  const cbOnCreateSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({
        type: ACTIONS.INIT_CREATE_STARTED,
        setId,
        setPayload,
      });
    },
    [],
  );
  const cbOnRemoveSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.INIT_REMOVE_STARTED, setId, setPayload });
    },
    [],
  );
  const cbOnSharedUpsertSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.INIT_SHARED_UPSERT_STARTED, setId, setPayload });
    },
    [],
  );
  const cbOnSharedDeleteSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.INIT_SHARED_DELETE_STARTED, setId, setPayload });
    },
    [],
  );
  const cbEditingShow = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      if (setId !== selectedId) {
        cbOnSetsChanged(setId, sets);
      }
      dispatch({
        type: ACTIONS.PANEL_TO_EDITOR,
        setId,
        setPayload,
      });
    },
    [cbOnSetsChanged, selectedId, sets],
  );
  const cbOnUpdateSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.DRAFT_EDITOR, setId, setPayload });
      const newSets = Array.from(sets);
      const index = newSets.findIndex((s) => s.id === setId);
      const newSet: IMngSet = {
        ...sets[index],
        payload: setPayload,
      };
      newSets.splice(index, 1, newSet);
      cbOnSetsChanged(setId, newSets);
    },
    [cbOnSetsChanged, sets],
  );
  const cbOnUpdateLevel = React.useCallback((levels: IMngLevel[]) => {
    dispatch({ type: ACTIONS.DRAFT_LEVELS, levels });
  }, []);

  React.useEffect(() => {
    (async () => {
      if (open && initialize === Initialize.WAIT) {
        let levelsListItems = [];
        try {
          if (enableLevels) {
            levelsListItems = await getItemsLevels(context);
          }
        } catch {
          onError(ERROR.getLevelslist);
        }
        dispatch({
          type: ACTIONS.INITIALIZE,
          levelsListItems,
        });
      }
    })();
  }, [context, enableLevels, getItemsLevels, initialize, onError, open]);

  React.useEffect(() => {
    if (panel === WINDOW_PANELS.HOME) {
      if (needSaveEditor) {
        dispatch({ type: ACTIONS.INIT_UPDATE_STARTED });
      }
      if (needSaveLevels) {
        dispatch({ type: ACTIONS.INIT_LEVELS_STARTED });
      }
    }
  }, [needSaveEditor, needSaveLevels, panel]);

  React.useEffect(() => {
    (async () => {
      if (initCreate === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_CREATE_LOADING });
          const set: IMngSet = await onCreateSet(context, draftSetPayload);
          const newSets: IMngSet[] = updateSetsAfterCreate(sets, set);
          dispatch({
            type: ACTIONS.INIT_CREATE_STOPPED,
            setId: set.id,
            setPayload: set.payload,
          });
          cbOnSetsChanged(set.id, newSets);
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.create);
        }
      }
    })();
  }, [
    cbOnSetsChanged,
    context,
    draftSetPayload,
    initCreate,
    onCreateSet,
    onError,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initRemove === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_REMOVE_LOADING });
          await onRemoveSet(context, draftSetId);
          const newSets: IMngSet[] = updateSetsAfterRemove(sets, draftSetId);
          const newSlcId = selectedId === draftSetId ? "" : selectedId;
          dispatch({ type: ACTIONS.INIT_REMOVE_STOPPED });
          cbOnSetsChanged(newSlcId, newSets);
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.remove);
        }
      }
    })();
  }, [
    cbOnSetsChanged,
    context,
    draftSetId,
    initRemove,
    onError,
    onRemoveSet,
    selectedId,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initUpdate === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_UPDATE_LOADING });
          const oldSet = sets.find((s) => s.id === draftSetId);
          const setToUpdate: IMngSet = {
            ...oldSet,
            version: oldSet.version + 1,
            payload: draftSetPayload,
            shareType:
              oldSet.shareType === ShareType.SHARE_UPD
                ? ShareType.SHARE_OBS
                : oldSet.shareType,
          };
          const newSet = await onUpdateSet(context, setToUpdate);
          const newSets: IMngSet[] = updateSetsAfterModify(sets, newSet);
          dispatch({ type: ACTIONS.INIT_UPDATE_STOPPED });
          cbOnSetsChanged(draftSetId, newSets);
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.update);
        }
      }
    })();
  }, [
    cbOnSetsChanged,
    context,
    draftSetId,
    draftSetPayload,
    initUpdate,
    onError,
    onUpdateSet,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initSharedUpsert === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_SHARED_UPSERT_LOADING });
          const [newSets, newSet] = updateSetsAfterShare(
            sets,
            draftSetId,
            true,
          );
          await onSharedUpsert(context, newSet.id);
          dispatch({ type: ACTIONS.INIT_SHARED_UPSERT_STOPPED });
          onSetsChanged(context, newSet.id, newSets);
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.shared);
        }
      }
    })();
  }, [
    context,
    draftSetId,
    initSharedUpsert,
    onError,
    onSetsChanged,
    onSharedUpsert,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initSharedDelete === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_SHARED_DELETE_LOADING });
          const [newSets, newSet] = updateSetsAfterShare(
            sets,
            draftSetId,
            false,
          );
          await onSharedDelete(context, newSet.id);
          dispatch({ type: ACTIONS.INIT_SHARED_DELETE_STOPPED });
          onSetsChanged(context, newSet.id, newSets);
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.shared);
        }
      }
    })();
  }, [
    context,
    draftSetId,
    initSharedDelete,
    onError,
    onSetsChanged,
    onSharedDelete,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initLevels === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_LEVELS_LOADING });
          await onLevelsUpdate(context, levelsListItems);
          dispatch({ type: ACTIONS.INIT_LEVELS_STOPPED });
        } catch (err) {
          console.warn(err);
          dispatch({ type: ACTIONS.RESET });
          onError(ERROR.levels);
        }
      }
    })();
  }, [context, initLevels, levelsListItems, onError, onLevelsUpdate]);

  return (
    <CardDraggable
      dragCls={CLS_DRAGING}
      position={{
        top: positionY,
        left: positionX,
      }}
      cardProps={{
        className: classnames({
          [classes.window]: true,
          [classes.windowPanel]: panel !== WINDOW_PANELS.HOME,
          [classes.windowClosed]: !open,
        }),
      }}
    >
      <PanelHome
        colorOwner={colorOwner}
        colorShare={colorShare}
        titleText={titleText}
        titleInfo={titleInfo}
        loadingBool={loadingBool}
        loadingText={loadingText}
        sets={sets}
        selectedId={selectedId}
        chipValues={chipValues}
        onClose={onClose}
        onBtnCreate={cbOnClickBtnCreate}
        onBtnShared={cbOnClickBtnShared}
        onBtnLevels={cbOnClickBtnLevels}
        onSelectSet={cbOnSelectSet}
        onRemoveSet={cbOnRemoveSet}
        onEditorSet={cbEditingShow}
        onSharedUpsertSet={cbOnSharedUpsertSet}
        onSharedDeleteSet={cbOnSharedDeleteSet}
        onCreateSet={cbOnCreateSet}
        getChip={cbGetChip}
        canShared={enableShared}
        canLevels={enableLevels}
        canCreate={canCreate}
      />
      <PanelEditor
        color={colorOwner}
        open={panel === WINDOW_PANELS.EDITOR}
        setId={draftSetId}
        setPayload={draftSetPayload}
        chipValues={chipValues}
        chipGroups={chipGroups}
        onClose={cbOnClosePanel}
        onUpdate={cbOnUpdateSet}
        getChip={cbGetChip}
        chipMaxSlc={chipMaxSlc}
        onError={onError}
      />
      <PanelShared
        color={colorShare}
        open={panel === WINDOW_PANELS.SHARED}
        chipValues={chipValues}
        onClose={cbOnClosePanel}
        onCreateSet={cbOnCreateSet}
        getChip={cbGetChip}
        getUser={getUser}
        getSets={getItemsShared}
        context={context}
        ownerId={ownerId}
        canCreate={canCreate}
        dateFormat={dateFormat}
      />
      <PanelLevels
        color={colorOwner}
        open={panel === WINDOW_PANELS.LEVELS}
        sets={sets}
        items={levelsListItems}
        onClose={cbOnClosePanel}
        onUpdate={cbOnUpdateLevel}
      />
    </CardDraggable>
  );
};

export default WindowMngSets;
