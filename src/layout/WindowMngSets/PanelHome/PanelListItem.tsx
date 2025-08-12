import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import Text from "../../../core/Text";
import hexToRgbA from "../../../utils/hexToRgbA";
import { IMngChipValue, IMngSetPayload } from "../interfaces";
import Btn from "../../../core/Btn";
import { IChip } from "../../../core/Chip";
import emptyFn from "../../../utils/emptyFn";
import { ERROR_MAX_SETS } from "../constants";
import { getTheme } from "../../../theme";
import { PopoverOrigin } from "../../../core/Popover";
import { ShareType } from "../../../interfaces";
import WindowMngSetCount from "../WindowMngSetCount";

const originAnchor: PopoverOrigin = {
  horizontal: "auto",
  vertical: "auto",
};
const originTransf: PopoverOrigin = {
  horizontal: "auto",
  vertical: "auto",
};
const getShareOpt = (
  shareType: ShareType,
  color: string,
): {
  variant: "bold" | "light";
  tooltip: string;
  color: string;
  title: string;
} => {
  switch (shareType) {
    case ShareType.SHARE_OBS:
      return {
        variant: "bold",
        tooltip: "This set has unsynchronized changes",
        color: getTheme().colors.msgWarn,
        title: "Synchronize this Set?",
      };
    case ShareType.SHARE_UPD:
      return {
        variant: "bold",
        tooltip: "This set is publicly shared",
        color,
        title: "Unshare this Set?",
      };
    case ShareType.PRIVATE:
    default:
      return {
        variant: "light",
        tooltip: "Share this set publicly",
        color,
        title: "Share this Set?",
      };
  }
};

interface IStyles {
  colorOwner: string;
  colorShare: string;
}
const useStyles = createUseStyles({
  listitem: {
    height: 40,
    width: "100%",
    paddingRight: 10,
    flex: 1,
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxSizing: "border-box",
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
  setShareType: ShareType;
  active: boolean;
  chipValues: IMngChipValue[];
  onSelect: (setId: string) => void;
  onRemove: (setId: string, setPayload: IMngSetPayload) => void;
  onEditor: (setId: string, setPayload: IMngSetPayload) => void;
  onSharedUpsert: (setId: string, setPayload: IMngSetPayload) => void;
  onSharedDelete: (setId: string, setPayload: IMngSetPayload) => void;
  onCreate: (setId: string, setPayload: IMngSetPayload) => void;
  getChip: (
    chipValue: IMngChipValue,
    set: IMngSetPayload,
    shared: boolean,
  ) => IChip;
  canShared: boolean;
  canCreate: boolean;
  loading: boolean;
}

const PanelListItem = ({
  colorOwner,
  colorShare,
  setId,
  setPayload,
  setShareType,
  active,
  chipValues,
  onSelect,
  onRemove,
  onEditor,
  onSharedUpsert,
  onSharedDelete,
  onCreate,
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
  const cbSharedUpsert = React.useCallback(() => {
    if (!loading) onSharedUpsert(setId, setPayload);
  }, [loading, onSharedUpsert, setId, setPayload]);
  const cbSharedDelete = React.useCallback(() => {
    if (!loading) onSharedDelete(setId, setPayload);
  }, [loading, onSharedDelete, setId, setPayload]);
  const cbCloned = React.useCallback(() => {
    if (!loading) {
      onCreate("", {
        ...setPayload,
        label: "(clone) " + setPayload.label,
      });
    }
  }, [loading, onCreate, setPayload]);
  const btnVisible = active || menuRemove || menuShared;
  const shareOpt = getShareOpt(setShareType, colorShare);

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
      <WindowMngSetCount
        color={colorOwner}
        setPayload={setPayload}
        chipValues={chipValues}
        getChip={getChip}
      />
      <Text ellipsis children={label} />
      <div style={{ flex: 1 }} />
      <Btn
        color={colorOwner}
        className={classnames({
          [classes.btn]: true,
          [classes.btnVisible]: btnVisible,
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
          [classes.btnVisible]: btnVisible,
        })}
        icon="content_copy"
        onClick={cbCloned}
        tooltip={!canCreate ? ERROR_MAX_SETS : "Clone Set"}
        small
      />
      <Btn
        color={getTheme().colors.msgFail}
        className={classnames({
          [classes.btn]: true,
          [classes.btnVisible]: btnVisible,
        })}
        icon="delete"
        tooltip="Delete Set"
        small
        onClick={onMenuRemoveOpen}
        menu={{
          originAnchor,
          originTransf,
          onClose: onMenuRemoveClose,
          title: "Delete this set?",
          items: [
            {
              id: "y",
              label: "Delete",
              labelStyle: { color: getTheme().colors.msgFail },
              onClick: cbRemove,
            },
            {
              id: "n",
              label: "Cancel",
              onClick: emptyFn,
            },
          ],
        }}
      />
      {!canShared ? null : (
        <Btn
          variant={shareOpt.variant}
          color={shareOpt.color}
          className={classnames({
            [classes.btn]: true,
            [classes.btnVisible]:
              btnVisible || setShareType !== ShareType.PRIVATE,
          })}
          icon="people_alt"
          tooltip={shareOpt.tooltip}
          small
          onClick={onMenuSharedOpen}
          menu={{
            originAnchor,
            originTransf,
            onClose: onMenuSharedClose,
            title: shareOpt.title,
            items: [
              {
                id: "1",
                label: "Share",
                labelStyle: { color: colorShare },
                onClick: cbSharedUpsert,
                hidden: !(setShareType === ShareType.PRIVATE),
              },
              {
                id: "2",
                label: "Share update",
                labelStyle: { color: getTheme().colors.msgWarn },
                onClick: cbSharedUpsert,
                hidden: !(setShareType === ShareType.SHARE_OBS),
              },
              {
                id: "3",
                label: "Unshare",
                labelStyle: { color: getTheme().colors.msgFail },
                onClick: cbSharedDelete,
                hidden: setShareType === ShareType.PRIVATE,
              },
              {
                id: "n",
                label: "Cancel",
                onClick: emptyFn,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default PanelListItem;
