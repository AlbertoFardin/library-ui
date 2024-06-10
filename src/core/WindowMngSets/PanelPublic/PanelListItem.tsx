import * as React from "react";
import * as moment from "moment";
import Avatar from "../../Avatar";
import Text from "../../Text";
import { createUseStyles } from "react-jss";
import {
  IMngSet,
  IMngChipValue,
  IMngSetUser,
  IMngSetPayload,
} from "../interfaces";
import { IChip } from "../../Chip";
import SetCount from "../SetCount";
import hexToRgbA from "../../../utils/hexToRgbA";
import emptyFn from "../../../utils/emptyFn";
import Btn from "../../Btn";
import { ERROR_MAX_SETS } from "../constants";
import { getTheme } from "../../../theme";

interface IStyles {
  color: string;
}
const useStyles = createUseStyles({
  listitem: {
    height: 40,
    width: "-webkit-fill-available",
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
  onClick: (setId: string) => void;
  getChip: (chipValue: IMngChipValue, setPayload: IMngSetPayload) => IChip;
  getUser: (userId: string) => IMngSetUser;
  canCreate: boolean;
  dateFormat: string;
}

const PanelListItem = ({
  color,
  set,
  chipValues,
  onClick,
  getChip,
  getUser,
  canCreate,
  dateFormat,
}: IPanelListItem) => {
  const classes = useStyles({ color });

  const { id, payload, updated, ownerId } = set;
  const { label } = payload;
  const user = getUser(ownerId);
  const onSelect = React.useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <div className={classes.listitem}>
      <SetCount
        color={color}
        setPayload={payload}
        chipValues={chipValues}
        getChip={getChip}
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
      <Btn
        disabled={!canCreate}
        style={{ marginLeft: 10 }}
        color={color}
        icon="download"
        tooltip={!canCreate ? ERROR_MAX_SETS : "Import Set"}
        small
        menu={{
          title: "Import this set?",
          items: [
            {
              id: "n",
              label: "Cancel",
              onClick: emptyFn,
            },
            {
              id: "y",
              label: "Clone",
              labelStyle: { color },
              onClick: onSelect,
            },
          ],
        }}
      />
    </div>
  );
};

export default PanelListItem;
