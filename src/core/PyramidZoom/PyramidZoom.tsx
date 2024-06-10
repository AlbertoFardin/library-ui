import * as React from "react";
import ReactSeadragon from "./ReactSeadragon";
import { IPyramidZoom } from "./interfaces";

const PyramidZoom = ({ src, getSrcFirmed, colors }: IPyramidZoom) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tileSources, setTileSources] = React.useState("" as any);

  React.useEffect(() => {
    (async () => {
      try {
        if (!src) throw "no src";
        const srcFirmed = await getSrcFirmed(src);
        const xml = await fetch(srcFirmed, { method: "GET" });
        const xmlText = await xml.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, "text/xml");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const docImage = doc.getElementsByTagName("Image")[0] as any;
        const { TileSize, Overlap, Format, xmlns } = docImage.attributes;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const docSize = doc.getElementsByTagName("Size")[0] as any;
        const { Width, Height } = docSize.attributes;
        setTileSources({
          Image: {
            xmlns: xmlns.value,
            Url: src.replace(
              /([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/,
              "$1_files/",
            ),
            Format: Format.value,
            Overlap: Overlap.value,
            TileSize: TileSize.value,
            Size: {
              Height: Height.value,
              Width: Width.value,
            },
          },
        });
      } catch (error) {
        console.error("Failed to set Tile Sources: ", error);
      }
    })();
  }, [getSrcFirmed, src]);

  return <ReactSeadragon tileSources={tileSources} colors={colors} />;
};

export default PyramidZoom;
