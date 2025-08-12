import { action } from "@storybook/addon-actions";
import { createUseStyles } from "react-jss";
import CellThumbs from "../CellContent/CellThumbs";

const useStyles = createUseStyles({
  header: {
    background: "rgba(0,250,250,0.2)",
    zIndex: 2,
    width: "100%",
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
    width: "100%",
    height: 25,
    position: "absolute",
    bottom: "-12px",
    left: 0,
    display: "flex",
    alignItems: "center",
  },
});
const ThumbChildren = () => {
  const classes = useStyles({});
  return (
    <>
      <div className={classes.header}>
        <span>header</span>
        <div style={{ flex: 1 }} />
        <span>_h1</span>
      </div>
      <div style={{ flex: 1 }} />
      <div className={classes.footer}>
        <span>footer</span>
        <div style={{ flex: 1 }} />
        <span>_f1</span>
      </div>
    </>
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
        previewMouseSensitive: true,
        overlay: {
          icon: "settings",
          text: "CATEGORY_CATEGORY_CATEGORY",
          tooltip: "right click to contextmenu",
        },
        children: <ThumbChildren />,
        contextmenu: {
          title: "Actions",
          items: ["upload", "download"].map((a) => ({
            id: a,
            label: a,
            icon: a,
            onClick: action("contextmenu_onClick:" + a),
          })),
        },
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
