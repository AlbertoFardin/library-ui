/* eslint-disable react/jsx-no-bind */

import * as React from "react";
import Divider from "../../Divider";
import Popover from "../../Popover";
import { createUseStyles } from "react-jss";
import Btn from "../../Btn";
import { FieldMentions } from "../../Field";
import { IAnnotation, IAnnotationData } from "../interfaces";
import { draftId } from "../reducer";
import SelectorColor from "./SelectorColor";
import ToolbarUser from "./ToolbarUser";
import { getTheme } from "../../../theme";
import { IUserMock } from "../../../utils/getUser";

const Flex1 = () => <div style={{ flex: 1 }} />;
const useStyle = createUseStyles({
  paper: {
    padding: 10,
    overflow: "visible",
  },
  toolbar: {
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    margin: 0,
    padding: 0,
  },
  divider: {
    margin: "10px 0",
  },
  resolvedButton: {
    margin: "0 0 0 25px",
  },
  fieldtextarea: {
    margin: "15px 0",
    width: 250,
    flex: 1,
  },
});

interface IImageAnnotationPopover {
  anchorPosition?: { top: number; left: number };
  annotation: IAnnotation;
  annotationOriginal: IAnnotation;
  colors?: string[];
  open?: boolean;
  onClose: () => void;
  onChange: (a: IAnnotationData, mentions: IUserMock[]) => void;
  onConfirm: (a: IAnnotationData, close?: boolean) => void;
  onDelete: () => void;
  readOnly?: boolean;
  users: IUserMock[];
}

const ImageAnnotationPopover = ({
  anchorPosition = { top: 0, left: 0 },
  annotation,
  annotationOriginal,
  colors = ["#ff0000"],
  open,
  onClose,
  onChange,
  onConfirm,
  onDelete,
  readOnly = false,
  users,
}: IImageAnnotationPopover) => {
  const classes = useStyle({});
  const [valueInEditing, setValueInEditing] = React.useState(false);
  const annotationId = annotation.data.id;
  const { editable, mentions } = annotation;
  const isDraft = annotationId === draftId;
  const inCreating = isDraft;
  const cbOnChange = React.useCallback(
    (t: string, newMentions: IUserMock[]) => {
      if (t !== annotation.data.value) {
        onChange({ value: t }, newMentions);
      }
    },
    [annotation.data.value, onChange],
  );
  const cbClose = React.useCallback(() => {
    if (!valueInEditing) onClose();
  }, [onClose, valueInEditing]);

  React.useEffect(() => {
    if (!open) setValueInEditing(false);
  }, [open]);

  return (
    <Popover
      open={open}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={cbClose}
      className={classes.paper}
    >
      {!!editable && (editable.color || editable.resolved) ? (
        <>
          <div className={classes.toolbar}>
            {editable.color && colors.length > 1 ? (
              <SelectorColor
                colors={colors}
                annotation={annotation}
                onClick={(c) => {
                  if (!isDraft) {
                    const dateUpdated = new Date().getTime();
                    const changes = { color: c, dateUpdated };
                    onChange(changes, mentions);
                    onConfirm(changes);
                  } else {
                    onChange({ color: c }, mentions);
                  }
                }}
              />
            ) : null}
            <Flex1 />
            {editable.resolved && !isDraft ? (
              <Btn
                label="Resolved"
                labelPosition="left"
                className={classes.resolvedButton}
                icon={
                  annotation.data.resolved
                    ? "check_box"
                    : "check_box_outline_blank"
                }
                onClick={() => {
                  const changes = { resolved: !annotation.data.resolved };
                  onChange(changes, mentions);
                  onConfirm(changes);
                }}
              />
            ) : null}
          </div>
          <Divider className={classes.divider} />
        </>
      ) : null}

      <ToolbarUser annotation={annotation} />

      <FieldMentions
        users={users}
        readOnly={!valueInEditing && (readOnly || !inCreating)}
        autoFocus={inCreating}
        value={annotation.data.value}
        className={classes.fieldtextarea}
        onChange={cbOnChange}
      />
      {isDraft || readOnly ? null : (
        <div className={classes.toolbar}>
          {!!editable && editable.delete && !valueInEditing ? (
            <Btn
              color={getTheme().colors.msgFail}
              icon="delete"
              tooltip="Delete annotation"
              onClick={onDelete}
            />
          ) : null}
          <Flex1 />
          {!!editable && editable.value && !valueInEditing ? (
            <Btn
              color={getTheme().colors.msgSucc}
              label="EDIT"
              onClick={() => setValueInEditing(true)}
              variant="bold"
            />
          ) : null}
          {valueInEditing ? (
            <Btn
              color={getTheme().colors.msgSucc}
              label="SAVE"
              onClick={() => {
                const dateUpdated = new Date().getTime();
                setValueInEditing(false);
                onChange({ dateUpdated }, mentions);
                onConfirm({ dateUpdated });
              }}
              variant="bold"
            />
          ) : null}
          {valueInEditing ? (
            <Btn
              label="CANCEL"
              onClick={() => {
                setValueInEditing(false);
                onChange({ value: annotationOriginal.data.value }, mentions);
              }}
              variant="bold"
            />
          ) : null}
        </div>
      )}
      {!inCreating ? null : (
        <div className={classes.toolbar}>
          <Flex1 />
          <Btn
            disabled={!annotation.data.value}
            color={getTheme().colors.msgSucc}
            label="POST"
            onClick={() =>
              onConfirm({ dateCreated: new Date().getTime() }, true)
            }
            variant="bold"
          />
          <Btn label="CANCEL" onClick={onClose} variant="bold" />
        </div>
      )}
    </Popover>
  );
};

export default ImageAnnotationPopover;
