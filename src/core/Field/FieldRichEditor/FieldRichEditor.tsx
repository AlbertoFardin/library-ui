import * as React from "react";
import classnames from "classnames";
import emptyFn from "../../../utils/emptyFn";
import { getTheme } from "../../../theme";
import Btn from "../../Btn";
import BtnMenu from "../utils/BtnMenu";
import { getLabels } from "../Label";
import IFieldRichEditor from "./IFieldRichEditor";
import useStyles from "../utils/useStyles";
import EditorWysiwyg from "../../EditorWysiwyg";
import Modal from "../../Modal";
import { reducer, reducerInitState, ACTIONS } from "./reducer";

const FieldRichEditor = ({
  color = getTheme().colors.theme1,
  value,
  onChange = emptyFn,
  readOnly = false,
  className,
  style,
  label,
  labelModal,
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
  adornmentAvatar,
  adornmentAvatarTooltip,
  adornmentElement,
  menu = [],
  menuVisibled,
  menuDisabled,
  menuOnHover = true,
  menuOnClose = emptyFn,
  placeholder = "Write...",
  placeholderDisabled = "No value",
}: IFieldRichEditor) => {
  const classes = useStyles({ color });
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { inputHover, modalOpen, modalDraft } = state;

  const onMouseLeave = React.useCallback(() => {
    dispatch({ type: ACTIONS.MOUSE_LEAVE });
  }, []);
  const onMouseEnter = React.useCallback(() => {
    dispatch({ type: ACTIONS.MOUSE_HOVER });
  }, []);
  const onModalClose = React.useCallback(() => {
    dispatch({ type: ACTIONS.MODAL_CLOSE });
  }, []);
  const onModalOpen = React.useCallback(() => {
    dispatch({ type: ACTIONS.MODAL_OPEN, value });
  }, [value]);
  const onModalConfirm = React.useCallback(() => {
    onChange(modalDraft);
    dispatch({ type: ACTIONS.MODAL_CLOSE });
  }, [modalDraft, onChange]);
  const onDraftChange = React.useCallback((value: string) => {
    dispatch({ type: ACTIONS.DRAFT_CHANGE, value });
  }, []);
  const menuRenderDefault = React.useMemo(() => {
    if (readOnly) return null;
    const width = !!menu.length ? 35 : 0;
    return <div style={{ width, height: 0, alignSelf: "end" }} />;
  }, [menu.length, readOnly]);

  return (
    <>
      <div
        className={classnames({
          [classes.field]: true,
          [classes.fieldCanHover]: !readOnly,
          [classes.fieldDisabled]: readOnly,
          [className]: !!className,
        })}
        style={{ minHeight: 122, ...style }}
        onMouseOver={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={emptyFn}
      >
        {getLabels(label)}
        {!adornmentIcon ? null : (
          <Btn
            className={classes.adornmentIcon}
            icon={adornmentIcon}
            iconStyle={{ color: adornmentIconColor }}
            tooltip={adornmentIconTooltip}
          />
        )}
        {!adornmentAvatar ? null : (
          <Btn
            className={classes.adornmentAvatar}
            avatar={adornmentAvatar}
            tooltip={adornmentAvatarTooltip}
          />
        )}
        {!!adornmentElement ? (
          <div
            className={classes.adornmentElement}
            children={adornmentElement}
          />
        ) : (
          <>
            <div
              role="presentation"
              className={classes.editorWysiwygOnClick}
              onClick={!readOnly ? onModalOpen : undefined}
            >
              <EditorWysiwyg
                className={classes.editorWysiwygReadOnly}
                placeholder={readOnly ? placeholderDisabled : placeholder}
                toolbarHidden
                readOnly
                value={value}
                textSelectable={false}
                linkSelectable={false}
              />
            </div>
            <BtnMenu
              color={color}
              className={classes.menuPosRelative}
              onClose={menuOnClose}
              inputHover={inputHover || menuVisibled}
              items={menu}
              disabled={menuDisabled}
              visibleOnHover={menuOnHover}
              renderDefault={menuRenderDefault}
            />
          </>
        )}
      </div>
      <Modal
        title={labelModal || "Editor"}
        open={modalOpen}
        onClose={onModalClose}
        content={
          <EditorWysiwyg
            className={classes.editorWysiwygInModal}
            placeholder={placeholder}
            value={value}
            onChange={onDraftChange}
          />
        }
        actions={
          <>
            <div style={{ flex: 1 }} />
            <Btn variant="bold" label="CANCEL" onClick={onModalClose} />
            <Btn
              variant="bold"
              color={getTheme().colors.msgSucc}
              label="CONFIRM"
              onClick={onModalConfirm}
            />
          </>
        }
      />
    </>
  );
};

export default FieldRichEditor;
