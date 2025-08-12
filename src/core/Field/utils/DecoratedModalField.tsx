import * as React from "react";
import classnames from "classnames";
import emptyFn from "../../../utils/emptyFn";
import { getLabels } from "../Label";
import { getTheme } from "../../../theme";
import useStyles from "./useStyles";
import { ACTIONS, initReducerState, reducer } from "./reducer";
import Modal from "../../Modal";
import Btn from "../../Btn";
import { IDecoratedField, IModalField } from "./fieldInterfaces";
import AdornmentIcon from "./AdornmentIcon";
import AdornmentAvatar from "./AdornmentAvatar";
import FieldMenu from "./FieldMenu";
import Tooltip from "../../Tooltip";

export interface IDecoratedModalField<
  TFieldProps = NonNullable<unknown>,
  TModalProps = NonNullable<unknown>,
> extends IDecoratedField,
    IModalField {
  bodyfieldElement: (props: TFieldProps) => JSX.Element;
  bodyModalElement: (props: TModalProps) => JSX.Element;
  onClose?: (confirm: boolean) => void;
}

const DecoratedModalField = <TFieldProps, TModalProps>({
  bodyfieldElement,
  bodyModalElement,
  readOnly = false,
  modalContentClassName,
  label,
  labelModal,
  modalSuggestion,
  modalEnabled = true,
  color = getTheme().colors.theme1,
  className,
  style,
  adornmentIcon,
  adornmentIconTooltip,
  adornmentIconColor,
  adornmentAvatar,
  adornmentAvatarText,
  adornmentAvatarIcon,
  adornmentAvatarTooltip,
  adornmentElement,
  menu,
  menuVisibled,
  menuDisabled,
  menuOnHover,
  menuOnClose,
  onClose,
  onMouseOver = emptyFn,
  onMouseLeave = emptyFn,
  ...otherProps
}: IDecoratedModalField) => {
  const [state, dispatch] = React.useReducer(reducer, initReducerState);
  const { inputHover, modalOpen } = state;

  const cbOnMouseLeave = React.useCallback(() => {
    onMouseLeave();
    dispatch({ type: ACTIONS.MOUSE_LEAVE });
  }, [onMouseLeave]);
  const cbOnMouseOver = React.useCallback(() => {
    onMouseOver();
    dispatch({ type: ACTIONS.MOUSE_HOVER });
  }, [onMouseOver]);

  const onModalOpen = React.useCallback(() => {
    dispatch({ type: ACTIONS.MODAL_OPEN });
  }, []);

  const onModalClose = React.useCallback(() => {
    if (!!onClose) onClose(false);
    dispatch({ type: ACTIONS.MODAL_CLOSE });
  }, [onClose]);

  const onModalConfirm = React.useCallback(() => {
    if (!!onClose) onClose(true);
    dispatch({ type: ACTIONS.MODAL_CLOSE });
  }, [onClose]);

  const tooltipTitle = modalEnabled ? modalSuggestion : null;
  const classes = useStyles({ color, modalEnabled });
  return (
    <div
      className={classnames({
        [classes.field]: true,
        [classes.fieldCanHover]: !readOnly,
        [classes.fieldDisabled]: readOnly,
        [className]: !!className,
      })}
      style={{ minHeight: 122, ...style }}
      onMouseOver={cbOnMouseOver}
      onMouseLeave={cbOnMouseLeave}
      onFocus={emptyFn}
    >
      {getLabels(label)}
      <AdornmentIcon
        adornmentIcon={adornmentIcon}
        adornmentIconColor={adornmentIconColor}
        adornmentIconTooltip={adornmentIconTooltip}
      />
      <AdornmentAvatar
        adornmentAvatar={adornmentAvatar}
        adornmentAvatarText={adornmentAvatarText}
        adornmentAvatarIcon={adornmentAvatarIcon}
        adornmentAvatarTooltip={adornmentAvatarTooltip}
      />
      {!!adornmentElement ? (
        <div className={classes.adornmentElement} children={adornmentElement} />
      ) : (
        <>
          <div
            role="presentation"
            className={classes.bodyField}
            onClick={modalEnabled ? onModalOpen : undefined}
          >
            <Tooltip title={tooltipTitle} place="left">
              <div className={classes.bodyFieldElement}>
                {bodyfieldElement(otherProps as TFieldProps)}
              </div>
            </Tooltip>
            <FieldMenu
              color={color}
              menu={menu}
              menuVisibled={menuVisibled}
              menuDisabled={menuDisabled}
              menuOnHover={menuOnHover}
              menuOnClose={menuOnClose}
              inputHover={inputHover}
              readOnly={readOnly}
            />
          </div>

          {modalEnabled ? (
            <Modal
              title={labelModal}
              open={modalOpen}
              onClose={onModalClose}
              contentClassName={modalContentClassName}
              content={bodyModalElement(otherProps as TModalProps)}
              actions={
                <>
                  <div style={{ flex: 1 }} />
                  {readOnly ? (
                    <Btn variant="bold" label="CLOSE" onClick={onModalClose} />
                  ) : (
                    <>
                      <Btn
                        variant="bold"
                        label="CANCEL"
                        onClick={onModalClose}
                      />
                      <Btn
                        variant="bold"
                        color={getTheme().colors.msgSucc}
                        label="CONFIRM"
                        onClick={onModalConfirm}
                      />
                    </>
                  )}
                </>
              }
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default DecoratedModalField;
