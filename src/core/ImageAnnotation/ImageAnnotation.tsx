import * as React from "react";
import concat from "lodash-es/concat";
import isEmpty from "lodash-es/isEmpty";
import without from "lodash-es/without";
import Annotation from "@warda/react-image-annotation";
import Placeholder from "../Placeholder";
import emptyFn from "../../utils/emptyFn";
import AnnotationPopover from "./AnnotationPopover";
import getCursor from "./getCursor";
import getSelector from "./getSelector";
import { IAnnotation, IAnnotationData } from "./interfaces";
import * as s from "./selectors";
import getAnnotationFromPoint from "./utils/getAnnotationFromPoint";
import getCoordPercentage from "./utils/getCoordPercentage";
import IImageAnnotation from "./IImageAnnotation";
import CatchCode, { KeyMap, IListener } from "../CatchCode";
import { reducer, reducerInitState, ACTION, draftId } from "./reducer";
import { IUserMock } from "../../utils/getUser";

const ImageAnnotation = ({
  className,
  style,
  annotations: allAnnotations = [],
  annotationEditable = {
    color: false,
    resolved: false,
    value: false,
    delete: false,
  },
  colors = ["#ff0000"],
  colorsEnabled = false,
  imageUrl,
  loading = false,
  onCreate = emptyFn,
  onDelete = emptyFn,
  onEdited = emptyFn,
  readOnly = false,
  selector = s.PointSelector.TYPE,
  selectors = [
    s.OvalSelector,
    s.PointSelector,
    s.RectangleSelector,
    s.FreehandSelector,
  ],
  users,
  userId,
}: IImageAnnotation) => {
  const user = users.find(({ id }) => id === userId);
  const annotationDefault = React.useMemo(
    () => ({
      data: { id: draftId },
      editable: annotationEditable,
      user,
      mentions: [],
      geometry: {
        type: "",
        x: 0,
        y: 0,
      },
    }),
    [annotationEditable, user],
  );

  const divRef = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const {
    annotationOpen,
    annotationValue,
    mousehoverId,
    writing,
    imageWidth,
    imageHeight,
    imageLoading,
  } = state;

  const annotation: IAnnotation = annotationValue || annotationDefault;
  const annotationId = annotation.data.id;
  const annotationIsDraft = annotationId === draftId;
  const annotations = allAnnotations.reduce((acc, cur: IAnnotation) => {
    // check if component have selector to show annotation TYPE
    const haveType = !!selectors.find((sel) => sel.TYPE === cur.geometry.type);
    if (haveType && !!cur.data.id) acc.push(cur);
    return acc;
  }, []);
  let popoverPosition = { left: 0, top: 0 };
  const onChange = React.useCallback(
    (value: IAnnotation) => {
      // fix because Freehand fire "onChange" on "onMouseMove"
      if (value.geometry.type) {
        dispatch({
          type: ACTION.ANNOTATION,
          value,
          writing: selector !== s.FreehandSelector.TYPE,
        });
      }
    },
    [selector],
  );
  const renderOverlay = React.useCallback(() => {
    // override default component
    return null;
  }, []);
  const renderEditor = React.useCallback(() => {
    return null;
  }, []);
  const renderContent = React.useCallback((a) => {
    dispatch({ type: ACTION.MOUSEHOVER, id: a.annotation.data.id });
    // override default component
    return null;
  }, []);
  const renderHighlight = React.useCallback(
    (a) => {
      const ann: IAnnotation = a.annotation;
      const annId = ann.data.id;
      const annResolved = ann.data.resolved;
      const annColor = ann.data.color;
      const annMousehover = annId === mousehoverId;
      return getSelector({
        key: a.key,
        annotation: ann,
        color:
          colorsEnabled && (!annResolved || annMousehover)
            ? annColor || colors[0]
            : "#9a9a9a",
        imageWidth,
        imageHeight,
        active: writing || annResolved ? false : annMousehover,
      });
    },
    [colors, colorsEnabled, imageHeight, imageWidth, mousehoverId, writing],
  );
  const renderSelector = React.useCallback(
    (a) => {
      const ann: IAnnotation = a.annotation;
      const annColor = ann.data.color;
      return getSelector({
        key: a.key,
        annotation: ann,
        color: annColor || colors[0],
        imageWidth,
        imageHeight,
        active: true,
      });
    },
    [colors, imageHeight, imageWidth],
  );
  const onClick = React.useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      // check if user click an annotation selector
      const mousePoint = getCoordPercentage(event);
      const annotationClicked = getAnnotationFromPoint(mousePoint, annotations);

      if (!!annotationClicked && !writing) {
        // user want READ an annotation
        dispatch({
          type: ACTION.ANNOTATION,
          open: true,
          value: annotationClicked,
        });
      } else {
        // user want WRITE an annotation
        if (
          (selector === s.FreehandSelector.TYPE &&
            !isEmpty(annotation.geometry.points) &&
            annotation.geometry.points.length > 5) ||
          selector === s.PointSelector.TYPE
        ) {
          dispatch({
            type: ACTION.ANNOTATION,
            open: true,
            value: {
              ...annotation,
              data: {
                ...annotation.data,
                id: draftId,
                color: colors[0],
                value: "",
              },
              geometry: {
                ...annotation.geometry,
                type: selector,
                ...mousePoint,
              },
            },
          });
        } else {
          dispatch({ type: ACTION.ANNOTATION });
        }
      }
    },
    [annotation, annotations, colors, selector, writing],
  );
  const onAnnotationClose = React.useCallback(() => {
    dispatch({ type: ACTION.ANNOTATION_CLOSE });
  }, []);
  const onAnnotationChange = React.useCallback(
    (a: IAnnotationData, mentions: IUserMock[]) => {
      dispatch({
        type: ACTION.ANNOTATION,
        value: {
          ...annotation,
          mentions,
          data: {
            ...annotation.data,
            ...a,
          },
        },
      });
    },
    [annotation],
  );
  const onAnnotationConfirm = React.useCallback(
    (a: IAnnotationData, close = false) => {
      const ann = {
        user: annotation.user,
        mentions: annotation.mentions,
        geometry: annotation.geometry,
        editable: annotation.editable,
        data: {
          ...annotation.data,
          ...a,
        },
      };
      const annIndex = annotations.findIndex(
        ({ data }: IAnnotation) => annotationId === data.id,
      );
      const newAnns = concat([], annotations);

      if (annotationIsDraft) {
        // is a new annotation, so add it
        newAnns.push(ann);
        onCreate(ann, newAnns);
      } else {
        // is a exist annotation, so edit it
        newAnns.splice(annIndex, 1, ann);
        onEdited(ann, newAnns);
      }

      if (close) {
        dispatch({ type: ACTION.ANNOTATION_CLOSE });
      }
    },
    [
      annotation.data,
      annotation.editable,
      annotation.geometry,
      annotation.mentions,
      annotation.user,
      annotationId,
      annotationIsDraft,
      annotations,
      onCreate,
      onEdited,
    ],
  );
  const onAnnotationDelete = React.useCallback(() => {
    const newAnns = without(annotations, annotation);
    onDelete(annotation, newAnns);
    dispatch({ type: ACTION.ANNOTATION_CLOSE });
  }, [annotation, annotations, onDelete]);
  const getImageSize = React.useCallback((event) => {
    const pathImg = event.composedPath()[0];
    const imgWidth = pathImg.width;
    const imgHeight = pathImg.height;
    const boxWidth = divRef.current?.clientWidth || 0;
    const boxHeight = divRef.current?.clientHeight || 0;
    // adapt to container size, keeeping the image ratio, no matter the image natural size
    const offPerc = Math.min(boxWidth / imgWidth, boxHeight / imgHeight);
    dispatch({
      type: ACTION.IMAGE_SIZE,
      w: imgWidth * offPerc,
      h: imgHeight * offPerc,
    });
  }, []);
  const listeners: IListener[] = React.useMemo(() => {
    const l: IListener[] = [
      { toCatch: KeyMap.Escape, onCatch: onAnnotationClose },
    ];
    return l;
  }, [onAnnotationClose]);

  if (!!divRef && !!divRef.current) {
    const rect = divRef.current.getBoundingClientRect();
    const annY = (imageHeight / 100) * annotation.geometry.y;
    const annX = (imageWidth / 100) * annotation.geometry.x;
    let top = 0;
    let left = 0;
    if (annY <= imageHeight / 2) {
      // position top
      top = annY + rect.top + 15;
    } else {
      // position bottom
      top = annY - rect.top - 3;
    }
    if (annX <= imageWidth / 2) {
      // position left
      left = annX - rect.left + 230;
    } else {
      // position right
      left = annX + rect.left - 40;
    }
    popoverPosition = { top, left };
  }

  React.useEffect(() => {
    if (!annotationDefault) {
      dispatch({ type: ACTION.ANNOTATION_DEFAULT, value: annotationDefault });
    }
  }, [annotationDefault]);

  React.useEffect(() => {
    if (imageUrl) {
      dispatch({ type: ACTION.IMAGE_INIT });
      const imageHtml = new Image();
      imageHtml.src = imageUrl;
      imageHtml.addEventListener("load", getImageSize);
      imageHtml.addEventListener("error", getImageSize);
    }
  }, [getImageSize, imageUrl]);

  return (
    <CatchCode listeners={listeners}>
      <div
        ref={divRef}
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageLoading ? null : (
          <>
            <Annotation
              src={imageUrl}
              annotations={annotations}
              selectors={selectors}
              type={selector}
              value={annotation}
              renderOverlay={renderOverlay}
              onChange={onChange}
              // override default component
              renderEditor={renderEditor}
              renderContent={renderContent}
              renderHighlight={renderHighlight}
              renderSelector={renderSelector}
              onClick={onClick}
              disableAnnotation={readOnly}
              className={className}
              style={{
                ...style,
                width: imageWidth,
                height: imageHeight,
                cursor: getCursor(selector, readOnly),
              }}
            />
            <AnnotationPopover
              users={users}
              open={annotationOpen}
              anchorPosition={popoverPosition}
              colors={colors}
              readOnly={readOnly}
              annotation={annotation}
              annotationOriginal={annotations.find(
                ({ data: { id } }: IAnnotation) => id === annotationId,
              )}
              onClose={onAnnotationClose}
              onChange={onAnnotationChange}
              onConfirm={onAnnotationConfirm}
              onDelete={onAnnotationDelete}
            />
          </>
        )}
        <Placeholder
          open={loading || imageLoading}
          spinner
          spinnerColor="#fff"
        />
      </div>
    </CatchCode>
  );
};

export default ImageAnnotation;
