import * as React from "react";
import Divider from "../Divider";
import InputBoolean from "../../stories/InputBoolean";
import { action } from "@storybook/addon-actions";
import { v4 as uuidv4 } from "uuid";
import Text from "../Text";
import annotationsStart from "./DemoMockAnnotation";
import ImageAnnotation, {
  FreehandSelector,
  IAnnotation,
  OvalSelector,
  PointSelector,
  RectangleSelector,
} from ".";
import { IUserMock, IUserType } from "../../utils/getUser";
import CardDemo from "../../stories/CardDemo";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Pupilla_del_gatto.jpg";
const urlImage = "./images/width_128/test_image1.jpeg";
const urlImage2 = "./images/width_128/test_image2.jpeg";
const urlImage3 = "./images/width_128/test_image3.jpeg";
const urlImage4 = "./images/width_128/test_image4.jpeg";

const users: IUserMock[] = [
  {
    type: IUserType.USER,
    id: "_id1",
    avatar: urlImage,
    avatarIcon: "person",
    avatarText: "LR",
    name: "Laura Rossi",
    firstName: "Laura",
    lastName: "Rossi",
  },
  {
    type: IUserType.USER,
    id: "_id2",
    avatar: urlImage2,
    avatarIcon: "person",
    avatarText: "MD",
    name: "Marta Draghi",
    firstName: "Marta",
    lastName: "Draghi",
  },
  {
    type: IUserType.USER,
    id: "_id3",
    avatar: urlImage3,
    avatarIcon: "person",
    avatarText: "ET",
    name: "Elisa Tommasi",
    firstName: "Elisa",
    lastName: "Tommasi",
  },
  {
    type: IUserType.USER,
    id: "_id4",
    avatar: urlImage4,
    avatarIcon: "person",
    avatarText: "GS",
    name: "Genoveffa Strudel",
    firstName: "Genoveffa",
    lastName: "Strudel",
  },
];
const COLORS = [
  "#9A26ED",
  "#1EC8A0",
  "#F2D822",
  "#ED3A69",
  "#002BFF",
  "#1A1A1A",
];

const ImageAnnotationDemo = () => {
  const myUserId = users[0].id;
  const [selector, setSelector] = React.useState(PointSelector.TYPE);
  const [readOnly, setReadOnly] = React.useState(false);
  const [colorsEnabled, setColorsEnabled] = React.useState(true);
  const [colors, setColors] = React.useState(COLORS as string[]);
  const [annotations, setAnnotations] = React.useState(
    annotationsStart as IAnnotation[],
  );
  const [loading, setLoading] = React.useState(false);
  const [resolvable, setResolvable] = React.useState(true);
  const annotationsMod = annotations.map((a: IAnnotation) => {
    // can edit only my annotation
    const itIsMe = a.user.id === myUserId;
    return {
      ...a,
      editable: {
        color: true,
        resolved: resolvable,
        value: itIsMe,
        delete: itIsMe,
      },
    };
  });
  const onAnnotationChange = (
    actionLabel: string,
    ann: IAnnotation,
    anns: IAnnotation[],
  ) => {
    const fixArrayForDemo = anns.map((a: IAnnotation) => {
      const aId = a.data.id;
      return aId
        ? a
        : {
            ...a,
            data: {
              ...a.data,
              id: uuidv4(),
            },
          };
    });
    setAnnotations(fixArrayForDemo);
    action(actionLabel)(ann, anns);
  };

  const onSlcPoint = React.useCallback(
    () => setSelector(PointSelector.TYPE),
    [],
  );
  const onSlcFreehand = React.useCallback(
    () => setSelector(FreehandSelector.TYPE),
    [],
  );
  const onSlcRectangle = React.useCallback(
    () => setSelector(RectangleSelector.TYPE),
    [],
  );
  const onSlcOval = React.useCallback(() => setSelector(OvalSelector.TYPE), []);

  const cbonCreate = React.useCallback((changed, newArray) => {
    onAnnotationChange("onCreate", changed, newArray);
  }, []);
  const cbonDelete = React.useCallback((changed, newArray) => {
    onAnnotationChange("onDelete", changed, newArray);
  }, []);
  const cbonEdited = React.useCallback((changed, newArray) => {
    onAnnotationChange("onEdited", changed, newArray);
  }, []);
  const cbonReadOnly = React.useCallback((b) => {
    setReadOnly(b);
  }, []);
  const cbonColors = React.useCallback((b) => {
    setColors(b ? COLORS : [COLORS[0]]);
  }, []);
  const cbonColorsEnabled = React.useCallback((b) => {
    setColorsEnabled(b);
  }, []);
  const cbonLoading = React.useCallback((b) => {
    setLoading(b);
  }, []);
  const cbonResolvable = React.useCallback((b) => {
    setResolvable(b);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ImageAnnotation
          annotations={annotationsMod}
          annotationEditable={{
            color: true,
            resolved: true,
            value: true,
            delete: true,
          }}
          loading={loading}
          colors={colors}
          colorsEnabled={colorsEnabled}
          readOnly={readOnly}
          imageUrl={imageUrl}
          selector={selector}
          users={users}
          userId={myUserId}
          onCreate={cbonCreate}
          onDelete={cbonDelete}
          onEdited={cbonEdited}
        />
      </div>
      <CardDemo>
        <InputBoolean
          onChange={cbonReadOnly}
          value={readOnly}
          label="ReadOnly"
        />
        <InputBoolean
          onChange={cbonColors}
          value={colors.length > 1}
          label="Colors"
        />
        <InputBoolean
          onChange={cbonColorsEnabled}
          value={colorsEnabled}
          label="ColorsEnabled"
        />
        <InputBoolean onChange={cbonLoading} value={loading} label="Loading" />
        <InputBoolean
          onChange={cbonResolvable}
          value={resolvable}
          label="Resolvable"
        />
        <Divider style={{ margin: "10px 0 20px 0", width: "100%" }} />
        <Text
          style={{ margin: "10px 15px" }}
          size={2}
          weight="bolder"
          children="Annotation Selector"
        />
        <InputBoolean
          label="PointSelector"
          value={selector === PointSelector.TYPE}
          onChange={onSlcPoint}
        />
        <InputBoolean
          label="FreehandSelector"
          value={selector === FreehandSelector.TYPE}
          onChange={onSlcFreehand}
        />
        <InputBoolean
          label="RectangleSelector"
          value={selector === RectangleSelector.TYPE}
          onChange={onSlcRectangle}
        />
        <InputBoolean
          label="OvalSelector"
          value={selector === OvalSelector.TYPE}
          onChange={onSlcOval}
        />
      </CardDemo>
    </div>
  );
};

export default ImageAnnotationDemo;
