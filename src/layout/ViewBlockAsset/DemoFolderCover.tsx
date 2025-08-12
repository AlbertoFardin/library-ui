import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewBlockAsset from ".";
import InputBoolean from "../../stories/InputBoolean";
import CardDemo from "../../stories/CardDemo";
import { IPreview } from "../../core/Preview";
import { IPopoverListItem } from "../../core/PopoverList";

const contextmenu: IPopoverListItem[] = ["download", "upload", "help"].map(
  (icon) => ({
    id: icon,
    icon,
    label: "item_" + icon,
    onClick: action("onClick menu item_" + icon),
  }),
);
const width = 260;
const preview: IPreview = {
  previewWidth: 260,
  previewHeight: 160,
  srcUrl: "./images/square_128/folder_cover.png",
  mimeType: "image/png",
};

const DemoFieldText = () => {
  const [selected, setSelected] = React.useState(false);
  const label =
    "abcdefghilmnopqrstuvz1234567890_abcdefghilmnopqrstuvz1234567890";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        height: "inherit",
      }}
    >
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
          width={width}
          preview={preview}
          contextmenu={contextmenu}
          onClick={action("onClick")}
          onCheck={action("onCheck")}
          onContextMenu={action("onContextMenu")}
          onDoubleClick={action("onDoubleClick")}
          selected={selected}
          label={label}
          checkbox="always"
          icon="folder"
          layout={2}
        />
      </div>
      <CardDemo>
        <InputBoolean
          label="selected"
          value={selected}
          onChange={setSelected}
        />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
