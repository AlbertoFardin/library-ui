import * as React from "react";
import * as moment from "moment";
import { createUseStyles } from "react-jss";
import Avatar from "../../../core/Avatar";
import Text from "../../../core/Text";
import {
  IMngSet,
  IMngChipValue,
  IMngSetUser,
  IMngSetPayload,
} from "../interfaces";
import { IChip } from "../../../core/Chip";
import hexToRgbA from "../../../utils/hexToRgbA";
import emptyFn from "../../../utils/emptyFn";
import Btn from "../../../core/Btn";
import { ERROR_MAX_SETS } from "../constants";
import { getTheme } from "../../../theme";
import WindowMngSetCount from "../WindowMngSetCount";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  listitem: {
    height: 40,
    width: "100%",
    boxSizing: "border-box",
    paddingRight: 10,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
    },
  },
  listitemSelected: {
    backgroundColor: ({ color }: IStyles) => hexToRgbA(color, 0.15),
  },
});

interface IPanelListItem {
  color: string;
  set: IMngSet;
  chipValues: IMngChipValue[];
  getChip: (chipValue: IMngChipValue, setPayload: IMngSetPayload) => IChip;
  getUser: (userId: string) => IMngSetUser;
  onCreate: (setId: string) => void;
  canCreate: boolean;
  dateFormat: string;
}

const PanelListItem = ({
  color,
  set,
  chipValues,
  getChip,
  getUser,
  onCreate,
  canCreate,
  dateFormat,
}: IPanelListItem) => {
  const classes = useStyles({ color });

  const { id, payload, updated, ownerId } = set;
  const { label } = payload;
  const user = getUser(ownerId);
  const cbOnCreate = React.useCallback(() => {
    onCreate(id);
  }, [id, onCreate]);

  return (
    <div className={classes.listitem}>
      <WindowMngSetCount
        color={color}
        setPayload={payload}
        chipValues={chipValues}
        getChip={getChip}
        shared={true}
      />
      <Text ellipsis weight="bolder" children={label} />
      <div style={{ flex: 1 }} />
      <Avatar
        style={{ margin: "0 10px" }}
        src={user.avatar}
        icon={user.avatarIcon}
        text={user.avatarText}
        tooltip={user.name}
      />
      <Text size={0} children={moment(updated).format(dateFormat)} />
      <div style={{ minWidth: 10 }} />
      <Btn
        disabled={!canCreate}
        color={color}
        icon="download"
        tooltip={!canCreate ? ERROR_MAX_SETS : "Import Set"}
        small
        menu={{
          title: "Import this set?",
          items: [
            {
              id: "y",
              label: "Import",
              labelStyle: { color },
              onClick: cbOnCreate,
            },
            {
              id: "n",
              label: "Cancel",
              onClick: emptyFn,
            },
          ],
        }}
      />
    </div>
  );
};

export default PanelListItem;
