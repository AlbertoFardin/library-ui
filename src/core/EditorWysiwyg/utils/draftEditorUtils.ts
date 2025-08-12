import {
  convertFromRaw,
  convertToRaw,
  ContentState,
  EditorState,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import htmlToDraft from "html-to-draftjs";
import { RICHEDITOR_EMPTY_TAG } from "./constants";

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}

const stateToHTMLOptions = {
  entityStyleFn: (entity) => {
    const entityType = entity.get("type").toLowerCase();
    if (entityType === "link") {
      const data = entity.getData();
      return {
        element: "a",
        attributes: {
          href: data.url,
          target: data.targetOption,
        },
        /*style: {
          // Put styles here...
        }, */
      };
    }
    return undefined;
  },
};

export function cleanHtml(html: string) {
  const s = replaceAll(html, "\n", "");
  return s === "<p><br></p>" ? RICHEDITOR_EMPTY_TAG : s;
}

function getHtmlFromEditorState(editorState: EditorState) {
  const html = stateToHTML(editorState.getCurrentContent(), stateToHTMLOptions); // draftToHtml(convertToRaw(editorState.getCurrentContent()));
  return cleanHtml(html);
}

const getContentStateFromFragmentHtmlString = (
  fragmentHtml: string,
): ContentState => {
  if (fragmentHtml || fragmentHtml === null) {
    // NOTE: htmlToDraft() è usata al posto di convertFromHTML() di draftjs
    // perché quest'ultima elimina i caratteri <br>
    const blocksFromHTML = htmlToDraft(
      fragmentHtml !== null ? fragmentHtml : RICHEDITOR_EMPTY_TAG,
    );
    return ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
  } else {
    return ContentState.createFromText(fragmentHtml);
  }
};

export const getInitEditorStateFromValue = (value: string) => {
  const contentState = getContentStateFromFragmentHtmlString(value);
  const valueRawMuiEditor = JSON.stringify(convertToRaw(contentState));
  return valueRawMuiEditor
    ? EditorState.createWithContent(
        convertFromRaw(JSON.parse(valueRawMuiEditor)),
      )
    : EditorState.createEmpty();
};

export const getValueFromEditorState = (editorState: EditorState) => {
  if (editorState !== null) {
    const value = getHtmlFromEditorState(editorState);
    return value;
  } else {
    console.error("try to get value from editor state invalid!");
    return null;
  }
};
