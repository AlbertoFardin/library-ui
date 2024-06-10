import * as React from "react";
import { action } from "@storybook/addon-actions";
import CellThumbs from "../CellContent/CellThumbs";
import BtnBase from "../../BtnBase";
import Text from "../../Text";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { IThumbnailButton } from "../interfaces";
import { getTheme } from "../../../theme";
import hexToRgbA from "../../../utils/hexToRgbA";

const useStyles = createUseStyles({
  thumbBtn: {
    borderRadius: getTheme().borderRadius,
    transition: "250ms background-color",
    width: "-webkit-fill-available",
    height: "-webkit-fill-available",
    position: "absolute",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  thumbBtnMenuOpen: {
    borderColor: getTheme().colors.theme1,
  },
  thumbBtnSelected: {
    backgroundColor: hexToRgbA(getTheme().colors.theme1, 0.2),
  },
  label: {
    color: getTheme().colors.background,
    textAlign: "center",
    margin: "0 15px",
  },
  header: {
    background: "rgba(0,250,250,0.2)",
    zIndex: 2,
    width: "-webkit-fill-available",
    height: 25,
    position: "absolute",
    top: "-12px",
    left: 0,
    display: "flex",
    alignItems: "center",
  },
  footer: {
    background: "rgba(250,0,250,0.2)",
    zIndex: 2,
    width: "-webkit-fill-available",
    height: 25,
    position: "absolute",
    bottom: "-12px",
    left: 0,
    display: "flex",
    alignItems: "center",
  },
});
const ThumbButton = ({
  disabled,
  onClick,
  onDoubleClick,
  mousehover,
}: IThumbnailButton) => {
  const classes = useStyles({});
  return (
    <BtnBase
      className={classnames({
        [classes.thumbBtn]: true,
        [classes.thumbBtnSelected]: mousehover,
      })}
      disabled={disabled}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={classes.header}>
        <span>header</span>
        <div style={{ flex: 1 }} />
        <span>_h1</span>
      </div>
      <div style={{ flex: 1 }} />
      {!mousehover ? null : (
        <Text
          weight="bolder"
          size={3}
          className={classes.label}
          children="CATEGORY"
        />
      )}
      <div style={{ flex: 1 }} />
      <div className={classes.footer}>
        <span>footer</span>
        <div style={{ flex: 1 }} />
        <span>_f1</span>
      </div>
    </BtnBase>
  );
};

const CellThumbnailsStory = () => (
  <CellThumbs
    value={[
      {
        id: "_id1",
        previewMimeType: "image/jpeg",
        previewSrcUrl: "./images/original/test_image1.jpeg",
      },
      {
        id: "_id2",
        previewMimeType: "image/jpeg",
        previewSrcUrl: "./images/original/test_image2.jpeg",
        Button: ThumbButton,
      },
      {
        id: "_id3",
        previewMimeType: "video/mp4",
        previewSrcUrl: "./video/original/test_video.mp4",
      },
      {
        id: "_id4",
        previewMimeType: "image/jpeg",
        previewSrcUrl: "./xxx",
        placeholderLabel: "PP",
        placeholderIcon: "image",
      },
    ]}
    columnIndex={0}
    rowIndex={1}
    selected={false}
    disabled={false}
    highligh={false}
    style={{ width: 700, height: 200, border: "1px solid #f00" }}
    onClick={action("onClick")}
    onContextMenu={action("onContextMenu")}
    contextmenu={[]}
    thumbnailSize={150}
  />
);
export default CellThumbnailsStory;
