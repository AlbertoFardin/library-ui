import * as React from "react";
import { action } from "@storybook/addon-actions";
import Preview from "./Preview";
import CardDemo from "../../stories/CardDemo";
import InputText from "../../stories/InputText";
import InputButton from "../../stories/InputButton";

const src1 =
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Pupilla_del_gatto.jpg";
const src2 = "https://upload.wikimedia.org/wikipedia/commons/8/84/Dog_nose.jpg";

const DemoFieldText = () => {
  const [srcUrl, setSrcUrl] = React.useState(src1);
  const onSetSrc1 = React.useCallback(() => {
    setSrcUrl(src1);
  }, []);
  const onSetSrc2 = React.useCallback(() => {
    setSrcUrl(src2);
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
        <Preview
          style={{
            border: "1px solid #f00",
            margin: 25,
          }}
          onClick={action("onClick")}
          onDoubleClick={action("onDoubleClick")}
          onLoadError={action("onLoadError")}
          onLoadSuccess={action("onLoadSuccess")}
          placeholderIcon="settings"
          placeholderLabel="settings"
          srcUrl={srcUrl}
          previewHeight={400}
          previewWidth={400}
          mimeType="image/png"
        />
      </div>
      <CardDemo>
        <InputText label="SrcUrl" value={srcUrl} onChange={setSrcUrl} />
        <InputButton label="set srcUrl1" onChange={onSetSrc1} />
        <InputButton label="set srcUrl2" onChange={onSetSrc2} />
      </CardDemo>
    </div>
  );
};

export default DemoFieldText;
