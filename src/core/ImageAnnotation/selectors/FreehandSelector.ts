import calcIsInsideFreehand from "../utils/calcIsInsideFreehand";
import getCoordPercentage from "../utils/getCoordPercentage";
import getSelectionRect from "../utils/getSelectionRect";

const TYPE = "FREEHAND";

let tempPoints = [];

const addPoint = (p) => {
  tempPoints = tempPoints.concat(p);
};

const clearStore = () => {
  tempPoints = [];
};

const area = (geometry) => {
  const rect = getSelectionRect(geometry.points);
  return (rect.right - rect.left) * (rect.bottom - rect.top);
};

const methods = {
  onClick(annotation) {
    return annotation;
  },
  onMouseDown(annotation, event) {
    clearStore();
    const p = getCoordPercentage(event);
    addPoint(p);

    if (!annotation.selection) {
      return {
        ...annotation,
        geometry: {
          type: TYPE,
          points: [...tempPoints],
          x: p.x,
          y: p.y,
        },
        selection: {
          mode: "EDITING",
          anchorX: p.x,
          anchorY: p.y,
        },
      };
    }
    return annotation;
  },
  onMouseMove(annotation, event) {
    if (!annotation.selection) {
      return annotation;
    }
    const p = getCoordPercentage(event);
    addPoint(p);

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        points: [...tempPoints],
      },
    };
  },
  onMouseUp(annotation, event) {
    if (!annotation.selection) {
      return annotation;
    }
    const p = getCoordPercentage(event);
    addPoint(p);

    switch (annotation.selection.mode) {
      case "SELECTING":
        return {
          ...annotation,
          geometry: {
            ...annotation.geometry,
            type: TYPE,
            points: [...tempPoints],
            x: tempPoints[tempPoints.length - 1].x,
            y: tempPoints[tempPoints.length - 1].y,
          },
          selection: {
            ...annotation.selection,
            showEditor: true,
            mode: "EDITING",
          },
        };
      case "EDITING":
        return {
          ...annotation,
          selection: {
            ...annotation.selection,
            showEditor: true,
          },
        };
      default:
        break;
    }
    return annotation;
  },
};

export default {
  TYPE,
  intersects: calcIsInsideFreehand,
  area,
  methods,
};
