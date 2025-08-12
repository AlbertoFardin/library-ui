import * as React from "react";
import classnames from "classnames";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { createUseStyles } from "react-jss";
import emptyFn from "../../utils/emptyFn";
import { RICHEDITOR_EMPTY_TAG, TOOLBAR } from "./utils/constants";
import {
  getValueFromEditorState,
  getInitEditorStateFromValue,
} from "./utils/draftEditorUtils";
import IEditorWysiwyg from "./IEditorWysiwyg";
import { localization } from "./utils/localization";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import { getFontsFamily, getTheme } from "../../theme";
import { disabledLinkDecorator } from "./decorators/disabledLinkDecorator";

const useStyles = createUseStyles({
  textNoSelectable: {
    "& *": {
      userSelect: "none",
    },
  },
  wrapper: {
    color: getTheme().colors.typography,
    fontSize: "12px",
    fontWeight: "normal",
    fontFamily: [getFontsFamily()[0], "Helvetica", "Arial", "sans-serif"]
      .filter((f) => !!f)
      .join(", "),
    display: "flex",
    flexDirection: "column",
  },
  editor: {
    padding: "0 10px",
    flex: 1,
  },
  toolbar: {
    backgroundColor: getTheme().colors.background,
    border: 0,
    borderBottom: `1px solid ${getTheme().colors.grayBorder}`,
  },
});

const EditorWysiWyg = ({
  className,
  value = RICHEDITOR_EMPTY_TAG,
  readOnly = false,
  onChange = emptyFn,
  onFocus = emptyFn,
  onBlur = emptyFn,
  toolbarClassName,
  editorClassName,
  spellCheck = false,
  stripPastedStyles = false,
  placeholder = "Write...",
  toolbarHidden = false,
  textSelectable = true,
  linkSelectable = true,
}: IEditorWysiwyg) => {
  const customDecorators = linkSelectable ? [] : [disabledLinkDecorator];
  const classes = useStyles({});
  const refEditor = React.useRef(null);
  const [editorState, setEditorState] = React.useState(() =>
    getInitEditorStateFromValue(value),
  );
  const lastValue = React.useRef(getValueFromEditorState(editorState));
  const cbChange = React.useCallback(
    (newEditorState: EditorState) => {
      const currentContent = editorState.getCurrentContent();
      const newContent = newEditorState.getCurrentContent();
      setEditorState(newEditorState);
      if (currentContent !== newContent) {
        const nextValue = getValueFromEditorState(newEditorState);
        if (lastValue.current != nextValue) {
          onChange(nextValue === RICHEDITOR_EMPTY_TAG ? undefined : nextValue);
        }
      }
    },
    [editorState, onChange],
  );
  const cbBlur = React.useCallback(() => {
    onBlur();
  }, [onBlur]);
  const cbFocus = React.useCallback(() => {
    onFocus();
  }, [onFocus]);

  React.useEffect(() => {
    setEditorState(getInitEditorStateFromValue(value));
  }, [value]);

  React.useEffect(() => {
    let tries = 0;
    let frameId: number;

    const tryFocus = () => {
      if (refEditor.current?.editor) {
        refEditor.current.editor.focus();
      } else if (tries < 3) {
        tries += 1;
        frameId = requestAnimationFrame(tryFocus);
      }
    };

    tryFocus();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Editor
      ref={refEditor}
      readOnly={readOnly}
      toolbarHidden={toolbarHidden}
      editorState={editorState}
      onEditorStateChange={cbChange}
      onFocus={cbFocus}
      onBlur={cbBlur}
      placeholder={placeholder}
      toolbar={TOOLBAR}
      wrapperClassName={classnames({
        [classes.wrapper]: true,
        [className]: !!className,
      })}
      toolbarClassName={classnames({
        [classes.toolbar]: true,
        [toolbarClassName]: !!toolbarClassName,
      })}
      editorClassName={classnames({
        [classes.editor]: true,
        [classes.textNoSelectable]: !textSelectable,
        [editorClassName]: !!editorClassName,
      })}
      localization={localization()}
      spellCheck={spellCheck}
      stripPastedStyles={stripPastedStyles}
      customDecorators={customDecorators}
    />
  );
};

export default EditorWysiWyg;
