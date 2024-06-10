import {
  formatBoldSrc,
  formatClearSrc,
  formatItalicSrc,
  formatListBulletedSrc,
  formatListNumberedSrc,
  formatUnderLinedSrc,
  insertLinkSrc,
  linkOffSrc,
  redoSrc,
  strikethroughSSrc,
  titleSrc,
  undoSrc,
} from "./icons";

export const RICHEDITOR_EMPTY_TAG = "<p></p>";

export const TOOLBAR = {
  options: ["blockType", "inline", "list", "link", "remove", "history"],

  blockType: {
    inDropdown: false,
    options: ["H2"],
    H2: {
      icon: titleSrc,
      className: undefined,
      title: "H2",
    },
  },

  inline: {
    inDropdown: false,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      // "monospace",
      // "superscript",
      // "subscript",
    ],
    bold: {
      icon: formatBoldSrc,
      className: undefined,
      title: "Bold",
    },
    italic: {
      icon: formatItalicSrc,
      className: undefined,
      title: "Italic",
    },
    underline: {
      icon: formatUnderLinedSrc,
      className: undefined,
      title: "Underline",
    },
    Strikethrough: {
      icon: strikethroughSSrc,
      className: undefined,
      title: "Strikethrough",
    },
  },

  list: {
    inDropdown: false,
    options: ["unordered", "ordered"],
    unordered: {
      icon: formatListBulletedSrc,
      className: undefined,
      title: "UL",
    },
    ordered: {
      icon: formatListNumberedSrc,
      className: undefined,
      title: "OL",
    },
  },
  link: {
    inDropdown: false,
    options: ["link", "unlink"],
    link: {
      icon: insertLinkSrc,
      className: undefined,
      title: "Link",
    },
    unlink: {
      icon: linkOffSrc,
      className: undefined,
      title: "Unlink",
    },
  },
  remove: {
    title: "Clear",
    icon: formatClearSrc,
    className: undefined,
  },
  history: {
    inDropdown: false,
    className: undefined,
    options: ["undo", "redo"],
    undo: {
      icon: undoSrc,
      className: undefined,
      title: "undo",
    },
    redo: {
      icon: redoSrc,
      className: undefined,
      title: "Redo",
    },
  },
};
