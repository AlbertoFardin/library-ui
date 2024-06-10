import * as React from "react";
import { createUseStyles } from "react-jss";
import PanelToolbar from "./PanelToolbar";
import Card from "../../Card";
import { Slide } from "../../Transitions";
import {
  IMngChipValue,
  IMngSet,
  IMngSetUser,
  IMngSetPayload,
} from "../interfaces";
import { WINDOW_HEIGHT_MAX } from "../constants";
import Placeholder from "../../Placeholder";
import { getTheme } from "../../../theme";
import PanelListItem from "./PanelListItem";
import List from "../../List";
import { IChip } from "../../Chip";
import FieldSearch from "../../FieldSearch";
import classnames from "classnames";
import Text from "../../Text";

enum InputType {
  LABEL = "LABEL",
  OWNER = "OWNER",
}
const INPUT_TYPE_LABEL = {
  [InputType.LABEL]: "Label",
  [InputType.OWNER]: "Owner",
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
    position: "absolute",
    width: "-webkit-fill-available",
    height: WINDOW_HEIGHT_MAX,
    zIndex: 1,
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    width: "inherit",
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
    margin: 10,
    border: 0,
  },
});

interface IPanel {
  color: string;
  open: boolean;
  loading: boolean;
  ownerId: string;
  items: IMngSet[];
  chipValues: IMngChipValue[];
  getUser: (userId: string) => IMngSetUser;
  getChip: (chipValue: IMngChipValue, setPayload: IMngSetPayload) => IChip;
  onClose: () => void;
  onImportSet: (setPayload: IMngSetPayload) => void;
  onRefresh: () => void;
  canCreate: boolean;
  dateFormat: string;
}

const Panel = ({
  color,
  open,
  loading,
  ownerId,
  items,
  chipValues,
  getUser,
  getChip,
  onClose,
  onImportSet,
  onRefresh,
  canCreate,
  dateFormat,
}: IPanel) => {
  const classes = useStyles({ color });
  const [inputType, setInputType] = React.useState(InputType.LABEL);
  const [inputValue, setInputValue] = React.useState("");
  const [inputFocus, setInputFocus] = React.useState(false);

  const onInputType = React.useCallback((event, id) => {
    setInputType(id);
  }, []);
  const onInputFocus = React.useCallback(() => {
    setInputFocus(true);
  }, []);
  const onInputBlur = React.useCallback(() => {
    setInputFocus(false);
  }, []);
  const onSelect = React.useCallback(
    (id: string) => {
      const oldPayload = items.find((s) => s.id === id).payload;
      const newPayload = {
        ...oldPayload,
        label: `(import) ${oldPayload.label}`,
      };
      onImportSet(newPayload);
    },
    [items, onImportSet],
  );
  const itemsFound = items
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

  return (
    <Slide open={open} direction="left">
      <Card className={classes.panel} elevation={0}>
        <PanelToolbar
          onClose={onClose}
          onRefresh={onRefresh}
          loading={loading}
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
              children="Sets shared by other users"
            />
            <Placeholder
              open={loading || !itemsFound.length}
              spinner={loading}
              icon="people_alt"
              label="No public Sets found"
            />
            <FieldSearch
              color={color}
              className={classes.listSearch}
              value={inputValue}
              onChange={setInputValue}
              onBlur={onInputBlur}
              onFocus={onInputFocus}
              placeholder={`Search by ${INPUT_TYPE_LABEL[inputType]}`}
              button={{
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
            {!itemsFound.length ? null : (
              <List>
                {itemsFound.map((set) => (
                  <PanelListItem
                    key={set.id}
                    set={set}
                    chipValues={chipValues}
                    color={color}
                    getChip={getChip}
                    onClick={onSelect}
                    getUser={getUser}
                    canCreate={canCreate}
                    dateFormat={dateFormat}
                  />
                ))}
              </List>
            )}
          </div>
        </div>
      </Card>
    </Slide>
  );
};

export default Panel;
