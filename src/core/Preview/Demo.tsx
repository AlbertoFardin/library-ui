import * as React from "react";
import { action } from "@storybook/addon-actions";
import Preview from "./Preview";
import CardDemo from "../../stories/CardDemo";
import InputText from "../../stories/InputText";
import InputButton from "../../stories/InputButton";
import InputBoolean from "../../stories/InputBoolean";

const srcImg1A =
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Pupilla_del_gatto.jpg?version=OLD";
const srcImg1B =
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Pupilla_del_gatto.jpg?version=NEW";
const srcImg2 =
  "https://upload.wikimedia.org/wikipedia/commons/6/69/Canis_lupus_laying_in_grass.jpg";
const srcVid1 =
  "https://videos.pexels.com/video-files/7484641/7484641-hd_1080_1920_24fps.mp4";
const srcVid2 =
  "https://videos.pexels.com/video-files/7492891/7492891-uhd_2560_1440_25fps.mp4";

const DemoPreview = () => {
  const [mousehover, setMousehover] = React.useState(false);
  const [srcUrl, setSrcUrl] = React.useState(srcImg1A);
  const [mimeType, setMimetype] = React.useState("image/png");
  const onSetImg1A = React.useCallback(() => {
    setSrcUrl(srcImg1A);
    setMimetype("image/png");
  }, []);
  const onSetImg1B = React.useCallback(() => {
    setSrcUrl(srcImg1B);
    setMimetype("image/png");
  }, []);
  const onSetImg2 = React.useCallback(() => {
    setSrcUrl(srcImg2);
    setMimetype("image/png");
  }, []);
  const onSetVid1 = React.useCallback(() => {
    setSrcUrl(srcVid1);
    setMimetype("video/mp4");
  }, []);
  const onSetVid2 = React.useCallback(() => {
    setSrcUrl(srcVid2);
    setMimetype("video/mp4");
  }, []);

  const protocol = window.location.protocol; // Es: 'https:' o 'http:'
  const host = window.location.hostname; // Es: 'www.example.com' (senza la porta)
  const port = window.location.port;
  const baseUrl = `${protocol}//${host}${port ? `:${port}` : ""}`;

  const onSetUnknown = React.useCallback(() => {
    setSrcUrl(`${baseUrl}/sb-common-assets/fonts.css`);
    setMimetype("text/css");
  }, [baseUrl]);

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
          onLoadFail={action("onLoadFail")}
          onLoadSucc={action("onLoadSucc")}
          placeholderIcon="settings"
          placeholderLabel="settings"
          srcUrl={srcUrl}
          mimeType={mimeType}
          mousehover={mousehover}
          previewHeight={400}
          previewWidth={400}
        />
      </div>
      <CardDemo>
        <InputText label="SrcUrl" value={srcUrl} onChange={setSrcUrl} />
        <InputButton
          label="set IMG_1 with querystring 'version OLD'"
          onChange={onSetImg1A}
        />
        <InputButton
          label="set IMG_1 with querystring 'version NEW'"
          onChange={onSetImg1B}
        />
        <InputButton label="set IMG_2" onChange={onSetImg2} />
        <InputButton label="set VIDEO_1" onChange={onSetVid1} />
        <InputButton label="set VIDEO_2" onChange={onSetVid2} />
        <InputButton label="set CSS" onChange={onSetUnknown} />
        <InputText label="mimeType" value={mimeType} onChange={setMimetype} />
        <InputBoolean
          label="mousehover"
          value={mousehover}
          onChange={setMousehover}
        />
      </CardDemo>
    </div>
  );
};

export default DemoPreview;
