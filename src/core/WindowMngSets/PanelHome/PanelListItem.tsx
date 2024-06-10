import * as React from "react";
import Text from "../../Text";
import { createUseStyles } from "react-jss";
import hexToRgbA from "../../../utils/hexToRgbA";
import { IMngChipValue, IMngSetPayload } from "../interfaces";
import classnames from "classnames";
import Btn from "../../Btn";
import { IChip } from "../../Chip";
import emptyFn from "../../../utils/emptyFn";
import SetCount from "../SetCount";
import { ERROR_MAX_SETS } from "../constants";
import { getTheme } from "../../../theme";
import { PopoverOrigin } from "../../Popover";

const originAnchor: PopoverOrigin = {
  horizontal: "right",
  vertical: "bottom",
};
const originTransf: PopoverOrigin = {
  horizontal: "right",
  vertical: "top",
};

interface IStyles {
  colorOwner: string;
  colorShare: string;
}
const useStyles = createUseStyles({
  listitem: {
    height: 40,
    width: "-webkit-fill-available",
    paddingRight: 10,
    flex: 1,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: ({ colorOwner }: IStyles) => colorOwner,
    backgroundColor: getTheme().colors.background,
    "&:hover": {
      backgroundColor: getTheme().colors.mousehover,
      "& $btn": {
        transform: "scale(1)",
      },
    },
  },
  listitemSelected: {
    backgroundColor: ({ colorOwner }: IStyles) =>
      hexToRgbA(colorOwner, 0.15) + " !important",
  },
  listitemToRemove: {
    backgroundColor: hexToRgbA(getTheme().colors.msgFail, 0.15) + " !important",
  },
  listitemToShared: {
    backgroundColor: ({ colorShare }: IStyles) =>
      hexToRgbA(colorShare, 0.15) + " !important",
  },
  btn: {
    transform: "scale(0)",
  },
  btnVisible: {
    transform: "scale(1) !important",
  },
});

interface IPanelListItem {
  colorOwner: string;
  colorShare: string;
  setId: string;
  setPayload: IMngSetPayload;
  shared: boolean;
  active: boolean;
  chipValues: IMngChipValue[];
  onSelect: (setId: string) => void;
  onRemove: (setId: string, setPayload: IMngSetPayload) => void;
  onCloned: (setId: string, setPayload: IMngSetPayload) => void;
  onEditor: (setId: string, setPayload: IMngSetPayload) => void;
  onShared: (setId: string, setPayload: IMngSetPayload) => void;
  getChip: (chipValue: IMngChipValue, set: IMngSetPayload) => IChip;
  canShared: boolean;
  canCreate: boolean;
  loading: boolean;
}

const PanelListItem = ({
  colorOwner,
  colorShare,
  setId,
  setPayload,
  shared,
  active,
  chipValues,
  onSelect,
  onRemove,
  onCloned,
  onEditor,
  onShared,
  getChip,
  canShared,
  canCreate,
  loading,
}: IPanelListItem) => {
  const classes = useStyles({
    colorOwner,
    colorShare,
  });
  const { label } = setPayload;

  const [menuRemove, setMenuRemove] = React.useState(false);
  const onMenuRemoveOpen = React.useCallback(() => {
    setMenuRemove(true);
  }, []);
  const onMenuRemoveClose = React.useCallback(() => {
    setMenuRemove(false);
  }, []);
  const [menuShared, setMenuShared] = React.useState(false);
  const onMenuSharedOpen = React.useCallback(() => {
    setMenuShared(true);
  }, []);
  const onMenuSharedClose = React.useCallback(() => {
    setMenuShared(false);
  }, []);

  const cbSelect = React.useCallback(() => {
    if (!loading) onSelect(setId);
  }, [loading, onSelect, setId]);
  const cbRemove = React.useCallback(() => {
    if (!loading) onRemove(setId, setPayload);
  }, [loading, onRemove, setId, setPayload]);
  const cbEditor = React.useCallback(() => {
    if (!loading) onEditor(setId, setPayload);
  }, [loading, onEditor, setId, setPayload]);
  const cbShared = React.useCallback(() => {
    if (!loading) onShared(setId, setPayload);
  }, [loading, onShared, setId, setPayload]);
  const cbCloned = React.useCallback(() => {
    if (!loading) {
      onCloned(setId, {
        ...setPayload,
        label: "(clone) " + setPayload.label,
      });
    }
  }, [loading, onCloned, setId, setPayload]);

  return (
    <div
      role="presentation"
      className={classnames({
        [classes.listitem]: true,
        [classes.listitemSelected]: active,
        [classes.listitemToRemove]: menuRemove,
        [classes.listitemToShared]: menuShared,
      })}
      onClick={cbSelect}
    >
      <SetCount
        color={colorOwner}
        setPayload={setPayload}
        chipValues={chipValues}
        getChip={getChip}
      />
      <Text ellipsis weight="bolder" children={label} />
      <div style={{ flex: 1 }} />
      <Btn
        color={colorOwner}
        className={classnames({
          [classes.btn]: true,
          [classes.btnVisible]: active,
        })}
        icon="edit"
        onClick={cbEditor}
        tooltip="Edit Set"
        small
      />
      <Btn
        disabled={!canCreate}
        color={colorOwner}
        className={classnames({
          [classes.btn]: true,
          [classes.btnVisible]: active,
        })}
        icon="content_copy"
        onClick={cbCloned}
        tooltip={!canCreate ? ERROR_MAX_SETS : "Clone Set"}
        small
      />
      <Btn
        color={colorOwner}
        className={classnames({
          [classes.btn]: true,
          [classes.btnVisible]: active,
        })}
        icon="delete"
        tooltip="Delete Set"
        small
        onClick={onMenuRemoveOpen}
        menu={{
          originAnchor,
          originTransf,
          onClose: onMenuRemoveClose,
          title: "Are you sure?",
          items: [
            {
              id: "n",
              label: "Cancel",
              onClick: emptyFn,
            },
            {
              id: "y",
              label: "Delete",
              labelStyle: { color: getTheme().colors.msgFail },
              onClick: cbRemove,
            },
          ],
        }}
      />
      {!canShared ? null : (
        <Btn
          variant={shared ? "bold" : "light"}
          color={colorShare}
          className={classnames({
            [classes.btn]: true,
            [classes.btnVisible]: active || shared,
          })}
          icon="people_alt"
          tooltip={[
            "Share Set, a shared Set can be found",
            "and cloned by all users, you will",
            "continue to retain ownership of this",
            "group and all of its features",
          ]}
          small
          onClick={onMenuSharedOpen}
          menu={{
            originAnchor,
            originTransf,
            onClose: onMenuSharedClose,
            title: "Change share status?",
            items: [
              {
                id: "n",
                label: "Cancel",
                onClick: emptyFn,
              },
              {
                id: "y",
                label: shared ? "Unshare" : "Share",
                labelStyle: { color: colorShare },
                onClick: cbShared,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default PanelListItem;
