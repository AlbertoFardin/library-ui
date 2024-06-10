import * as React from "react";
import { useMemo } from "react";
import * as OpenSeadragon from "openseadragon";
import Placeholder from "../Placeholder";
import { getTheme } from "../../theme";
import { INavIconColors } from "./interfaces";
import { getNavIconColorsFromTheme, getNavIcons } from "./utils/getNavIcons";

export interface IReactSeadragon {
  tileSources;
  colors?: INavIconColors;
}

const ReactSeadragon = ({ tileSources, colors }: IReactSeadragon) => {
  const refViewer = React.useRef<OpenSeadragon.Viewer>(null);
  const refAnchor = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const onOpen = React.useCallback(() => setOpen(true), []);

  const theme = getTheme();
  const navImages = useMemo(() => {
    const navColors = !!colors ? colors : getNavIconColorsFromTheme(theme);
    return getNavIcons(navColors);
  }, [colors, theme]);

  React.useEffect(() => {
    refViewer.current = OpenSeadragon({
      ajaxWithCredentials: false,
      crossOriginPolicy: false,
      defaultZoomLevel: 0,
      gestureSettingsMouse: {
        scrollToZoom: true,
        clickToZoom: true,
        dblClickToZoom: true,
        pinchToZoom: true,
      },
      minZoomImageRatio: 1,
      maxZoomPixelRatio: 1,
      navigatorPosition: "TOP_RIGHT",
      navigatorHeight: "100px",
      navigatorWidth: "130px",
      referenceStripScroll: "vertical",
      showFullPageControl: false,
      showNavigator: true,
      showNavigationControl: true,
      showHomeControl: true,
      visibilityRatio: 1,
      loadTilesWithAjax: false,
      immediateRender: false,
      useCanvas: false, // fix SEECOMM-6134 ma flasha una volta
      tileSources,
      element: refAnchor.current,
      prefixUrl: false,
      navImages: navImages,
    });
    refViewer.current.addHandler("open", onOpen);
    return () => {
      refViewer.current.destroy();
      refViewer.current = null;
      setOpen(false);
    };
  }, [navImages, onOpen, tileSources]);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <Placeholder
        open={!open}
        spinner
        spinnerColor={getTheme().colors.background}
      />
      <div ref={refAnchor} style={{ flex: 1 }} />
    </div>
  );
};

export default React.memo(ReactSeadragon);
