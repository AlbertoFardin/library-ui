import * as React from "react";
import { action } from "@storybook/addon-actions";
import ViewBlockAsset, { LayoutType } from ".";
import InputButton from "../../stories/InputButton";
import InputBoolean from "../../stories/InputBoolean";
import InputSelect from "../../stories/InputSelect";
import CardDemo from "../../stories/CardDemo";
import { IPopoverListItem } from "../../core/PopoverList";
import AssetExtension from "../../core/AssetExtension";
import { CheckBoxType } from "../../core/AssetCheckbox";

const getSize = (
  layout: LayoutType,
): {
  width: number;
  previewWidth: number;
  previewHeight: number;
} => {
  switch (layout) {
    case 1:
      return {
        width: 220,
        previewWidth: 200,
        previewHeight: 150,
      };
    case 2:
      return {
        width: 260,
        previewWidth: 260,
        previewHeight: 160,
      };
    default:
      return {
        width: 100,
        previewWidth: 50,
        previewHeight: 50,
      };
  }
};
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
  const [icon, setIcon] = React.useState<boolean>(true);
  const [checkbox, setCheckbox] = React.useState<CheckBoxType>("mousehover");
  const [preview, setPreview] = React.useState<{
    srcUrl: string;
    mimeType: string;
    placeholderIcon?: string;
    placeholderIconStyle?: React.CSSProperties;
    placeholderIconClassName?: string;
    placeholderLabel?: string;
    placeholderLabelStyle?: React.CSSProperties;
    placeholderLabelClassName?: string;
    placeholderLabelRequired?: boolean;
  }>({
    srcUrl: "./images/width_128/test_image1.jpeg",
    mimeType: "image/jpeg",
  });
  const [selected, setSelected] = React.useState(false);
  const [menu, setMenu] = React.useState(true);
  const [extEnabled, setExtEnabled] = React.useState(true);
  const [layout, setLayout] = React.useState<LayoutType>(1);
  const setPreviewImage1 = React.useCallback(() => {
    setPreview({
      srcUrl: "./images/width_128/test_image1.jpeg",
      mimeType: "image/jpeg",
    });
  }, []);
  const setPreviewImage2 = React.useCallback(() => {
    setPreview({
      srcUrl: "./images/width_128/test_image2.jpeg",
      mimeType: "image/jpeg",
    });
  }, []);
  const setPreviewVideo = React.useCallback(() => {
    setPreview({
      srcUrl: "./video/width_128/test_video.mp4",
      mimeType: "video/mp4",
    });
  }, []);
  const setPreviewUnknow = React.useCallback(() => {
    setPreview({
      srcUrl: "./xxx.png",
      mimeType: "image/jpeg",
      placeholderIcon: "help",
      placeholderIconStyle: { fontSize: 50 },
    });
  }, []);
  const setPreviewNull = React.useCallback(() => {
    setPreview(null);
  }, []);
  const handleLayoutCheckbox = React.useCallback((v: string) => {
    setCheckbox(v as CheckBoxType);
  }, []);
  const handleLayoutChange = React.useCallback((v: string) => {
    setLayout(Number(v) as LayoutType);
  }, []);
  const assetExtension = preview?.mimeType ? (
    <AssetExtension
      mimeType={preview?.mimeType}
      style={
        layout === 1
          ? { position: "absolute", bottom: 10, right: 10 }
          : { position: "absolute", top: 15, right: 10 }
      }
    />
  ) : null;

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
          width={getSize(layout).width}
          preview={{
            previewWidth: getSize(layout).previewWidth,
            previewHeight: getSize(layout).previewHeight,
            ...preview,
          }}
          contextmenu={menu ? contextmenu : undefined}
          onClick={action("onClick")}
          onCheck={action("onCheck")}
          onContextMenu={action("onContextMenu")}
          onDoubleClick={action("onDoubleClick")}
          selected={selected}
          label={label}
          checkbox={checkbox}
          icon={icon ? "folder" : null}
          layout={layout}
        >
          {extEnabled && assetExtension}
        </ViewBlockAsset>
      </div>
      <CardDemo>
        <InputBoolean label="icon folder" value={icon} onChange={setIcon} />

        <InputBoolean
          label="selected"
          value={selected}
          onChange={setSelected}
        />
        <InputBoolean
          label="asset extension"
          value={extEnabled}
          onChange={setExtEnabled}
        />
        <InputSelect
          onChange={handleLayoutCheckbox}
          value={checkbox}
          label="checkbox"
          options={["none", "mousehover", "always"].map((id) => ({
            id,
            label: id,
          }))}
        />
        <InputSelect
          onChange={handleLayoutChange}
          value={String(layout)}
          label="layout"
          options={["1", "2"].map((id) => ({ id, label: id }))}
        />
        <InputBoolean label="contextmenu" value={menu} onChange={setMenu} />
        <InputButton label="Set Preview Image 1" onChange={setPreviewImage1} />
        <InputButton label="Set Preview Image 2" onChange={setPreviewImage2} />
        <InputButton label="Set Preview Video" onChange={setPreviewVideo} />
        <InputButton label="Set Preview Unknow" onChange={setPreviewUnknow} />
        <InputButton label="Set Preview Null" onChange={setPreviewNull} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
