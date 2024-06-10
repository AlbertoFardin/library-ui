import { IUserMock } from "../../utils/getUser";
import { IAnnotation, IAnnotationEditable, ISelectors } from "./interfaces";

interface IImageAnnotation {
  /** Array of annotation
   *
   * IAnnotation is the annotation interface with :
   *
   * - data: IAnnotationData;
   * - geometry?: IAnnotationGeometry;
   * - editable: IAnnotationEditable;
   * - selection?: IAnnotationSelection;
   * - user: IUser;
   * - mentions: IUser[];
   */
  annotations?: IAnnotation[];
  /** What user can editable in an annotation
   *
   * is an object composed by:
   *
   * - color: if true, the user can change annotation color
   * - resolved: if true, the user can set "resolved check"
   * - value: if true, the user can edit the annotation message
   * - delete": if true, the user can delete his annotation
   */
  annotationEditable: IAnnotationEditable;
  /** Component's CSS classes */
  className?: string;
  /** Array of color used default is selected the first */
  colors?: string[];
  /** If true, in annotation */
  colorsEnabled?: boolean;
  /** Image uri */
  imageUrl: string;
  /** If true, show a spinner and loading mask */
  loading?: boolean;
  /** Callback fired when create an annotation */
  onCreate?: (
    annotationCreated: IAnnotation,
    annotationsUpdated: IAnnotation[],
  ) => void;
  /** Callback fired when delete an annotation */
  onDelete?: (
    annotationDelete: IAnnotation,
    annotationsUpdated: IAnnotation[],
  ) => void;
  /** Callback fired when edit an annotation */
  onEdited?: (
    annotationChanged: IAnnotation,
    annotationsUpdated: IAnnotation[],
  ) => void;
  /** If true, you can't create new annotations */
  readOnly?: boolean;
  /** Component's Selector used to render annotation points */
  selectors?: ISelectors[];
  /** Selector selected */
  selector?: string;
  /** Component's CSS style */
  style?: React.CSSProperties;
  /** Array of users */
  users: IUserMock[];
  /** Your user id */
  userId: string;
}

export default IImageAnnotation;
