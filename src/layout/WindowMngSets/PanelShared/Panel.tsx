import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import PanelToolbar from "./PanelToolbar";
import { Slide } from "../../../core/Transitions";
import {
  IMngChipValue,
  IMngSet,
  IMngSetUser,
  IMngSetPayload,
} from "../interfaces";
import { WINDOW_HEIGHT_MAX } from "../constants";
import Placeholder from "../../../core/Placeholder";
import { getTheme } from "../../../theme";
import PanelListItem from "./PanelListItem";
import List from "../../../core/List";
import { IChip } from "../../../core/Chip";
import FieldSearch from "../../../core/InputSearch";
import Text from "../../../core/Text";
import reducer, { ACTIONS, reducerInitState, InputType } from "./reducer";
import { Initialize } from "../../../interfaces";
import inLoading from "../../../utils/inLoading";

const INPUT_TYPE_LABEL = {
  [InputType.LABEL]: "Set's label",
  [InputType.OWNER]: "Set's owner",
};
const getMenuIcon = (id: InputType, slc: InputType) => {
  const active = id === slc;
  return {
    id,
    label: INPUT_TYPE_LABEL[id],
    active,
    icon: active ? "radio_button_checked" : "radio_button_unchecked",
    styleIcon: active ? { color: getTheme().colors.theme1 } : {},
  };
};
interface IStyles {
  color: string;
}
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
    padding: 15,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  list: {
    position: "relative",
    borderRadius: getTheme().borderRadius,
    border: `1px solid ${getTheme().colors.grayBorder}`,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    minHeight: 0,
    "& ul": {
      flex: 1,
      overflow: "auto",
      padding: 0,
      borderTop: `1px solid ${getTheme().colors.grayBorder}`,
      borderBottomRightRadius: getTheme().borderRadius,
      borderBottomLeftRadius: getTheme().borderRadius,
    },
  },
  listFocused: {
    borderColor: ({ color }: IStyles) => `${color} !important`,
    outline: ({ color }: IStyles) => `1px solid ${color}`,
  },
  listLabel: {
    position: "absolute",
    transform: "translate(8px, -9px) scale(0.75)",
    transformOrigin: "top left",
    top: 0,
    left: 0,
    background: getTheme().colors.background,
    zIndex: 1,
    padding: "0 7px",
  },
  listLabelFocused: {
    color: ({ color }: IStyles) => color,
  },
  listSearch: {
    width: "inherit",
    padding: "10px 6px",
    border: 0,
  },
});

interface IPanel {
  color: string;
  open: boolean;
  context: string;
  ownerId: string;
  chipValues: IMngChipValue[];
  getUser: (userId: string) => IMngSetUser;
  getChip: (
    chipValue: IMngChipValue,
    setPayload: IMngSetPayload,
    shared?: boolean,
  ) => IChip;
  getSets: (context: string) => Promise<IMngSet[]>;
  onClose: () => void;
  onCreateSet: (setId: string, setPayload: IMngSetPayload) => void;
  canCreate: boolean;
  dateFormat: string;
}

const Panel = ({
  color,
  open,
  context,
  ownerId,
  chipValues,
  getUser,
  getChip,
  getSets,
  onClose,
  onCreateSet,
  canCreate,
  dateFormat,
}: IPanel) => {
  const classes = useStyles({ color });

  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { init, sets, inputType, inputValue, inputFocus } = state;

  const loading = inLoading(init);

  const onRefresh = React.useCallback(() => {
    dispatch({ type: ACTIONS.INIT_STARTED });
  }, []);
  const onInputType = React.useCallback((_, id) => {
    dispatch({ type: ACTIONS.INPUT_TYPE, value: id });
  }, []);
  const onInputValue = React.useCallback((value: string) => {
    dispatch({ type: ACTIONS.INPUT_VALUE, value });
  }, []);
  const onInputFocus = React.useCallback(() => {
    dispatch({ type: ACTIONS.INPUT_FOCUS, value: true });
  }, []);
  const onInputBlur = React.useCallback(() => {
    dispatch({ type: ACTIONS.INPUT_FOCUS, value: false });
  }, []);
  const onCreate = React.useCallback(
    (id: string) => {
      const oldPayload: IMngSetPayload = sets.find((s) => s.id === id).payload;
      const newPayload: IMngSetPayload = {
        label: `(imported) ${oldPayload.label}`,
        items: oldPayload.items.map((a) => ({ id: a.id })),
      };
      onCreateSet(id, newPayload);
    },
    [sets, onCreateSet],
  );
  const itemsFound = sets
    .sort((a, b) => {
      // ordino i sets per data di aggiornamento
      if (a.updated > b.updated) return -1;
      if (a.updated < b.updated) return +1;
      return 0;
    })
    .filter((s) => {
      // filtro i sets non miei
      return s.ownerId !== ownerId;
    })
    .filter((s) => {
      // filtro i set che matchano con l'input
      const { ownerId, payload } = s;
      const label = payload.label;
      const attr =
        inputType === InputType.LABEL ? label : getUser(ownerId).name;
      const vLabel = attr.toLocaleLowerCase();
      const vInput = inputValue.toLocaleLowerCase();
      return vLabel.includes(vInput);
    });

  React.useEffect(() => {
    (async () => {
      if (init === Initialize.START) {
        dispatch({ type: ACTIONS.INIT_LOADING });
        const sets: IMngSet[] = await getSets(context);
        dispatch({ type: ACTIONS.INIT_STOPPED, sets });
      }
    })();
  }, [context, getSets, init]);

  React.useEffect(() => {
    if (open === true) {
      dispatch({ type: ACTIONS.INIT_STARTED });
    }
  }, [open]);

  return (
    <Slide open={open} className={classes.panel} direction="left">
      <PanelToolbar
        onClose={onClose}
        onRefresh={onRefresh}
        loading={loading}
        color={color}
      />
      <div className={classes.content}>
        <div
          className={classnames({
            [classes.list]: true,
            [classes.listFocused]: inputFocus,
          })}
        >
          <Text
            className={classnames({
              [classes.listLabel]: true,
              [classes.listLabelFocused]: inputFocus,
            })}
            children="List of public Sets"
          />
          <FieldSearch
            color={color}
            className={classes.listSearch}
            value={inputValue}
            onChange={onInputValue}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            placeholder={`Search by ${INPUT_TYPE_LABEL[inputType]}`}
            buttonInput={{
              style: { marginRight: 2 },
              disabled: false,
              menu: {
                title: "Search by",
                items: [
                  {
                    onClick: onInputType,
                    ...getMenuIcon(InputType.LABEL, inputType),
                  },
                  {
                    onClick: onInputType,
                    ...getMenuIcon(InputType.OWNER, inputType),
                  },
                ],
              },
            }}
          />
          <List>
            <Placeholder
              open={loading || !itemsFound.length}
              spinner={loading}
              background={loading}
              icon="people_alt"
              label="No public Sets found"
            />
            {itemsFound.map((set) => (
              <PanelListItem
                key={set.id}
                set={set}
                chipValues={chipValues}
                color={color}
                getChip={getChip}
                getUser={getUser}
                onCreate={onCreate}
                canCreate={canCreate}
                dateFormat={dateFormat}
              />
            ))}
          </List>
        </div>
      </div>
    </Slide>
  );
};

export default Panel;
