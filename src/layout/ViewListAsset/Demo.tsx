import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewListAsset from ".";
import InputButton from "../../stories/InputButton";
import InputBoolean from "../../stories/InputBoolean";
import CardDemo from "../../stories/CardDemo";
import { IPreview } from "../../core/Preview";
import { IPopoverListItem } from "../../core/PopoverList";
import Card from "../../core/Card";

const previewWidth = 70;
const previewHeight = 70;
const label = "abcdefghilmnopqrstuvz1234567890_abcdefghilmnopqrstuvz1234567890";
const contextmenu: IPopoverListItem[] = ["download", "upload", "help"].map(
  (icon) => ({
    id: icon,
    icon,
    label: "item_" + icon,
    onClick: action("onClick menu item_" + icon),
  }),
);

const DemoFieldText = () => {
  const [preview, setPreview] = React.useState<IPreview>({
    previewWidth,
    previewHeight,
    srcUrl: "./images/width_128/test_image1.jpeg",
    mimeType: "image/jpeg",
  });
  const [selected, setSelected] = React.useState(false);
  const [menu, setMenu] = React.useState(true);
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
        <Card style={{ overflow: "hidden" }}>
          <ViewListAsset
            color="#f00"
            width={300}
            height={80}
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
        </Card>
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
        <InputBoolean label="contextmenu" value={menu} onChange={setMenu} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
