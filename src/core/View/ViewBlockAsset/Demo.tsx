import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewBlockAsset from ".";
import InputButton from "../../../stories/InputButton";
import InputBoolean from "../../../stories/InputBoolean";
import CardDemo from "../../../stories/CardDemo";
import { IPreview } from "../../Preview";
import { IPopoverListItem } from "../../PopoverList";

const previewWidth = 150;
const previewHeight = 100;
const label = "abcdefghilmnopqrstuvz1234567890_abcdefghilmnopqrstuvz1234567890";
const contextmenu: IPopoverListItem[] = [
  {
    id: "1",
    label: "item_1",
    onClick: action("onClick menu item_0"),
  },
  {
    id: "2",
    label: "item_2",
    onClick: action("onClick menu item_1"),
  },
  {
    id: "3",
    label: "item_3",
    onClick: action("onClick menu item_2"),
  },
];

const DemoFieldText = () => {
  const [preview, setPreview] = React.useState<IPreview>({
    previewWidth,
    previewHeight,
    srcUrl: "./images/width_128/test_image1.jpeg",
    mimeType: "image/jpeg",
  });
  const [selected, setSelected] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const setPreviewImage1 = React.useCallback(() => {
    setPreview({
      previewWidth,
      previewHeight,
      srcUrl: "./images/width_128/test_image1.jpeg",
      mimeType: "image/jpeg",
    });
  }, []);
  const setPreviewImage2 = React.useCallback(() => {
    setPreview({
      previewWidth,
      previewHeight,
      srcUrl: "./images/width_128/test_image2.jpeg",
      mimeType: "image/jpeg",
    });
  }, []);
  const setPreviewVideo = React.useCallback(() => {
    setPreview({
      previewWidth,
      previewHeight,
      srcUrl: "./video/width_128/test_video.mp4",
      mimeType: "video/mp4",
    });
  }, []);
  const setPreviewUnknow = React.useCallback(() => {
    setPreview({
      previewWidth,
      previewHeight,
      srcUrl: "./xxx.png",
      mimeType: "image/jpeg",
      placeholderIcon: "help",
      placeholderIconStyle: { fontSize: 50 },
    });
  }, []);
  const setPreviewNull = React.useCallback(() => {
    setPreview(null);
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
        <ViewBlockAsset
          color="#f00"
          width={170}
          preview={preview}
          contextmenu={menu ? contextmenu : undefined}
          onClick={action("onClick")}
          onCheck={action("onCheck")}
          onContextMenu={action("onContextMenu")}
          onDoubleClick={action("onDoubleClick")}
          selected={selected}
          label={label}
          icon="folder"
        />
      </div>
      <CardDemo>
        <InputButton label="Set Preview Image 1" onChange={setPreviewImage1} />
        <InputButton label="Set Preview Image 2" onChange={setPreviewImage2} />
        <InputButton label="Set Preview Video" onChange={setPreviewVideo} />
        <InputButton label="Set Preview Unknow" onChange={setPreviewUnknow} />
        <InputButton label="Set Preview Null" onChange={setPreviewNull} />
        <InputBoolean
          label="selected"
          value={selected}
          onChange={setSelected}
        />
        <InputBoolean label="menu" value={menu} onChange={setMenu} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
