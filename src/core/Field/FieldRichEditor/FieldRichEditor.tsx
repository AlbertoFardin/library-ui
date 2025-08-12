import * as React from "react";
import { getTheme } from "../../../theme";
import useStyles from "../utils/useStyles";
import EditorWysiwyg, { RICHEDITOR_EMPTY_TAG } from "../../EditorWysiwyg";
import { IDecoratedField, IModalField } from "../utils/fieldInterfaces";
import DecoratedModalField from "../utils/DecoratedModalField";
import emptyFn from "../../../utils/emptyFn";
import {
  defaultPlaceholder,
  defaultPlaceholderDisabled,
} from "../utils/fieldConstants";

export interface IFieldRichEditor extends IDecoratedField, IModalField {}

const FieldRichEditor = (props: IFieldRichEditor) => {
  const {
    color = getTheme().colors.theme1,
    value: propValue,
    readOnly = false,
    labelModal = "Editor",
    placeholder = defaultPlaceholder,
    placeholderDisabled = defaultPlaceholderDisabled,
    onChange = emptyFn,
    onMouseOver = emptyFn,
    onMouseLeave = emptyFn,
    ...otherProps
  } = props;
  const classes = useStyles({ color });
  const modalEnabled = !readOnly;
  const [value, setValue] = React.useState(propValue || RICHEDITOR_EMPTY_TAG);
  const [draftValue, setDraftValue] = React.useState(value);

  React.useEffect(() => {
    const newValue = propValue || RICHEDITOR_EMPTY_TAG;
    setValue(newValue);
    setDraftValue(newValue);
  }, [propValue]);

  const onClose = React.useCallback(
    (confirm: boolean) => {
      if (confirm === true) {
        setValue(draftValue);
        if (onChange) {
          onChange(draftValue);
        }
      }
    },
    [draftValue, onChange],
  );

  const onDraftChange = React.useCallback((newValue: string) => {
    setDraftValue(newValue);
  }, []);

  const renderBodyFieldElement = React.useCallback(() => {
    return (
      <EditorWysiwyg
        placeholder={readOnly ? placeholderDisabled : placeholder}
        toolbarHidden
        readOnly
        value={value}
        textSelectable={false}
        linkSelectable={false}
      />
    );
  }, [value, readOnly, placeholderDisabled, placeholder]);

  const renderBodyModalElement = React.useCallback(() => {
    return (
      <EditorWysiwyg
        placeholder={placeholder}
        value={value}
        onChange={onDraftChange}
      />
    );
  }, [placeholder, value, onDraftChange]);

  return (
    <DecoratedModalField
      {...otherProps}
      color={color}
      value={value}
      labelModal={labelModal}
      bodyfieldElement={renderBodyFieldElement}
      bodyModalElement={renderBodyModalElement}
      readOnly={readOnly}
      modalEnabled={modalEnabled}
      modalContentClassName={classes.editorWysiwygInModal}
      modalSuggestion="Click to open in editor"
      onClose={onClose}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    />
  );
};

export default FieldRichEditor;
