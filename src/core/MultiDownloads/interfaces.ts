export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

export interface IMultiDownloadsItem {
  id: string;
  loading?: boolean;
  error?: boolean;
  tooltip?: string;
  name: string;
  url: string;
  onClick?: () => void;
}

export interface IMultiDownloads {
  /** Component CSS classes */
  className?: string;
  /** Array di items renderizzati nel componente, composti da:
   *
   * - **id**: identificativo univoco dell'item.
   * - **loading**?: show spinner
   * - **name**: item label
   * - **url**: item url to download
   * - **onClick**?: Callback fire onClick, if not define download start automaticaly
   * */
  items?: IMultiDownloadsItem[];
  /** Callback fire on click button "X" */
  onClose?: () => void;
  /** Component visibility. If false, the component will not render */
  open?: boolean;
  /** component CSS style */
  style?: React.CSSProperties;
  /** Callback on click button "copy url", if not value not see the button */
  onCopyUrlToClipboard?: (url: string) => void;
  /** Specifies where to open the linked document (default "_self") */
  linkTarget?: LinkTarget;
}
