import * as React from "react";
import CardDraggable from "../CardDraggable";
import { createUseStyles } from "react-jss";
import { IChip } from "../Chip";
import {
  IWindowMngSets,
  IMngChipValue,
  WINDOW_PANELS,
  IMngSetUser,
  IMngSetPayload,
  IMngSet,
} from "./interfaces";
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT_MIN,
  WINDOW_HEIGHT_MAX,
  CLS_DRAGING,
  MAX_SET_COUNT,
  DRAFT_PAYLOAD,
  ERROR_UPDATE,
  ERROR_SHARE,
  ERROR_GET_SHARE,
} from "./constants";
import PanelHome from "./PanelHome";
import PanelEditor from "./PanelEditor";
import PanelPublic from "./PanelPublic";
import classnames from "classnames";
import {
  getLoadingData,
  updateSetsAfterCreate,
  updateSetsAfterModify,
  updateSetsAfterRemove,
} from "./functions";
import reducer, { ACTIONS, reducerInitState } from "./reducer";
import { DATE_FORMAT, Initialize } from "../../interfaces";
import emptyFn from "../../utils/emptyFn";
import { getTheme } from "../../theme";

const useStyles = createUseStyles({
  window: {
    width: WINDOW_WIDTH,
    "min-height": WINDOW_HEIGHT_MIN,
    "max-height": WINDOW_HEIGHT_MAX,
  },
  windowPanel: {
    height: WINDOW_HEIGHT_MAX,
    "min-height": WINDOW_HEIGHT_MAX,
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

const WindowMngSets = ({
  colorOwner = getTheme().colors.theme1,
  colorShare = getTheme().colors.theme2,
  open,
  titleText,
  titleInfo,
  positionX = 0,
  positionY = 0,
  loading,
  ownerId,
  sets,
  selectedId,
  chipMaxSlc = 1000,
  chipValues,
  chipGroups,
  context,
  onClose,
  onSharedSet,
  onCreateSet,
  onRemoveSet,
  onUpdateSet,
  onSetsChanged,
  getChip,
  getSharedSets,
  getUser = getUserDefault,
  onError = emptyFn,
  dateFormat = DATE_FORMAT,
}: IWindowMngSets) => {
  const classes = useStyles({});

  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    initCreate,
    initRemove,
    initUpdate,
    initShared,
    initCloned,
    panel,
    sharedListInit,
    sharedListSets,
    draftSetId,
    draftSetPayload,
  } = state;

  const canCreate = sets.length <= MAX_SET_COUNT;
  const [loadingBool, loadingText] = getLoadingData({
    loading,
    initCreate,
    initRemove,
    initUpdate,
    initShared,
    initCloned,
  });

  const cbGetChip = React.useCallback(
    (chip: IMngChipValue, setPayload: IMngSetPayload) => {
      try {
        return getChip(chip, setPayload);
      } catch {
        return getChipDefault(chip, colorOwner);
      }
    },
    [getChip, colorOwner],
  );
  const cbClickBtnCreate = React.useCallback(() => {
    dispatch({
      type: ACTIONS.INIT_CREATE_STARTED,
      setPayload: DRAFT_PAYLOAD,
    });
  }, []);
  const cbClickBtnImport = React.useCallback(() => {
    dispatch({ type: ACTIONS.PANEL_TO_PUBLIC });
  }, []);
  const cbReturnToHome = React.useCallback(() => {
    dispatch({ type: ACTIONS.PANEL_TO_HOME });
  }, []);
  const cbSelectSet = React.useCallback(
    (setId: string) => {
      onSetsChanged(context, setId, sets);
    },
    [context, onSetsChanged, sets],
  );
  const cbImportSet = React.useCallback((setPayload: IMngSetPayload) => {
    dispatch({
      type: ACTIONS.INIT_CREATE_STARTED,
      setPayload,
    });
  }, []);
  const cbClonedSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({
        type: ACTIONS.INIT_CLONED_STARTED,
        setId,
        setPayload,
      });
    },
    [],
  );
  const cbRemoveSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.INIT_REMOVE_STARTED, setId, setPayload });
    },
    [],
  );
  const cbSharedSet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.INIT_SHARED_STARTED, setId, setPayload });
    },
    [],
  );
  const onModifySet = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      dispatch({ type: ACTIONS.EDITOR_DRAFT, setId, setPayload });
      const newSets = Array.from(sets);
      const index = newSets.findIndex((s) => s.id === setId);
      const newSet: IMngSet = {
        ...sets[index],
        updated: new Date().getTime(),
        payload: setPayload,
      };
      newSets.splice(index, 1, newSet);
      onSetsChanged(context, setId, newSets);
    },
    [context, onSetsChanged, sets],
  );
  const cbEditingShow = React.useCallback(
    (setId: string, setPayload: IMngSetPayload) => {
      if (setId !== selectedId) {
        onSetsChanged(context, setId, sets);
      }
      dispatch({
        type: ACTIONS.PANEL_TO_EDITOR,
        setId,
        setPayload,
      });
    },
    [context, onSetsChanged, selectedId, sets],
  );
  const cbRefreshSharedSets = React.useCallback(() => {
    dispatch({ type: ACTIONS.INIT_SHARED_LIST_STARTED });
  }, []);

  React.useEffect(() => {
    (async () => {
      if (open) {
        if (!!getSharedSets && sharedListInit === Initialize.NONE) {
          dispatch({ type: ACTIONS.INIT_SHARED_LIST_STARTED });
        } else {
          dispatch({ type: ACTIONS.INIT_SHARED_LIST_BLOCK });
        }
      }
    })();
  }, [getSharedSets, open, sharedListInit]);

  React.useEffect(() => {
    (async () => {
      if (sharedListInit === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_SHARED_LIST_LOADING });
          const items = await getSharedSets(context);
          dispatch({ type: ACTIONS.INIT_SHARED_LIST_STOPPED, items });
        } catch {
          onError(ERROR_GET_SHARE);
        }
      }
    })();
  }, [context, getSharedSets, onError, sharedListInit]);

  React.useEffect(() => {
    (async () => {
      if (initCreate === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_CREATE_LOADING });
          const set: IMngSet = await onCreateSet(context, "", draftSetPayload);
          const newSets: IMngSet[] = updateSetsAfterCreate(sets, set);
          dispatch({
            type: ACTIONS.INIT_CREATE_STOPPED,
            setId: set.id,
            setPayload: set.payload,
          });
          onSetsChanged(context, set.id, newSets);
        } catch {
          onError("Unable create a new Set, please refresh and retry");
        }
      }
    })();
  }, [
    context,
    draftSetPayload,
    initCreate,
    onCreateSet,
    onError,
    onSetsChanged,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initCloned === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_CLONED_LOADING });
          const set: IMngSet = await onCreateSet(context, "", draftSetPayload);
          const newSets: IMngSet[] = updateSetsAfterCreate(sets, set);
          dispatch({ type: ACTIONS.INIT_CLONED_STOPPED });
          onSetsChanged(context, set.id, newSets);
        } catch {
          onError("Unable create a new Set, please refresh and retry");
        }
      }
    })();
  }, [
    context,
    draftSetPayload,
    initCloned,
    onCreateSet,
    onError,
    onSetsChanged,
    selectedId,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initRemove === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_REMOVE_LOADING });
          const set = sets.find((s) => s.id === draftSetId);
          await onRemoveSet(context, draftSetId, draftSetPayload);
          const newSets: IMngSet[] = updateSetsAfterRemove(sets, set);
          const newSlcId = selectedId === draftSetId ? "" : selectedId;
          dispatch({ type: ACTIONS.INIT_REMOVE_STOPPED });
          onSetsChanged(context, newSlcId, newSets);
        } catch {
          onError("Unable update the Set, please refresh and retry");
        }
      }
    })();
  }, [
    context,
    draftSetId,
    draftSetPayload,
    initRemove,
    onError,
    onRemoveSet,
    onSetsChanged,
    selectedId,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initUpdate === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_UPDATE_LOADING });
          const set = sets.find((s) => s.id === draftSetId);
          await onUpdateSet(context, draftSetId, draftSetPayload);
          const newSets: IMngSet[] = updateSetsAfterModify(sets, set);
          dispatch({ type: ACTIONS.INIT_UPDATE_STOPPED });
          onSetsChanged(context, draftSetId, newSets);
        } catch {
          onError(ERROR_UPDATE);
        }
      }
    })();
  }, [
    context,
    draftSetId,
    draftSetPayload,
    initUpdate,
    onError,
    onSetsChanged,
    onUpdateSet,
    sets,
  ]);

  React.useEffect(() => {
    (async () => {
      if (initShared === Initialize.START) {
        try {
          dispatch({ type: ACTIONS.INIT_SHARED_LOADING });
          const set = sets.find((s) => s.id === draftSetId);
          await onSharedSet(context, draftSetId, draftSetPayload);
          dispatch({ type: ACTIONS.INIT_SHARED_STOPPED, set });
        } catch {
          onError(ERROR_SHARE);
        }
      }
    })();
  }, [
    context,
    draftSetId,
    draftSetPayload,
    initShared,
    onError,
    onSharedSet,
    sets,
  ]);

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
        onBtnCreate={cbClickBtnCreate}
        onBtnImport={cbClickBtnImport}
        onSelectSet={cbSelectSet}
        onRemoveSet={cbRemoveSet}
        onClonedSet={cbClonedSet}
        onEditorSet={cbEditingShow}
        onSharedSet={cbSharedSet}
        getChip={cbGetChip}
        sharedSets={sharedListSets}
        canShared={!!getSharedSets}
        canCreate={canCreate}
      />
      <PanelEditor
        color={colorOwner}
        open={panel === WINDOW_PANELS.EDITOR}
        setId={draftSetId}
        setPayload={draftSetPayload}
        chipValues={chipValues}
        chipGroups={chipGroups}
        onClose={cbReturnToHome}
        onModifySet={onModifySet}
        getChip={cbGetChip}
        chipMaxSlc={chipMaxSlc}
        onError={onError}
      />
      <PanelPublic
        color={colorShare}
        open={panel === WINDOW_PANELS.SHARED}
        loading={sharedListInit === Initialize.LOADING}
        items={sharedListSets}
        chipValues={chipValues}
        onClose={cbReturnToHome}
        onImportSet={cbImportSet}
        onRefresh={cbRefreshSharedSets}
        getChip={cbGetChip}
        getUser={getUser}
        ownerId={ownerId}
        canCreate={canCreate}
        dateFormat={dateFormat}
      />
    </CardDraggable>
  );
};

export default WindowMngSets;
