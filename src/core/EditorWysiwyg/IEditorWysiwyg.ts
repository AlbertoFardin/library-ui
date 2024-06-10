interface IEditorWysiwyg {
  /** component wrapper CSS classes */
  className?: string;
  /** The value of the input element */
  value?: string;
  /** If true, the input element is in read only */
  readOnly?: boolean;
  /** disable text selection  */
  textSelectable?: boolean;
  /** disable link selection  */
  linkSelectable?: boolean;
  /** Callback fired when the value is changed */
  onChange?: (s: string | undefined) => void;
  /** Callback fired when the input was focused */
  onFocus?: () => void;
  /** Callback fired when the input was blured */
  onBlur?: () => void;
  /** component toolbar CSS classes */
  toolbarClassName?: string;
  /** component editor CSS classes */
  editorClassName?: string;
  /** If true, spell check */
  spellCheck?: boolean;
  /** If true, strip pasted styles in input */
  stripPastedStyles?: boolean;
  /** The short hint displayed in the input before the user enters a value */
  placeholder?: string;
  /** If true, the toolbar is hidden */
  toolbarHidden?: boolean;
}
export default IEditorWysiwyg;
