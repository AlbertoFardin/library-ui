import * as React from "react";
import * as OpenSeadragon from "openseadragon";
import getNavIcons from "./utils/getNavIcons";
import emptyFn from "../../utils/emptyFn";

export interface IReactSeadragon {
  tileSources;
  retry?: number;
  onLoading?: () => void;
  onLoadSucc?: () => void;
  onLoadFail?: () => void;
  ajaxHeaders?: HeadersInit;
}
const ReactSeadragon = ({
  tileSources,
  retry = 1,
  onLoading = emptyFn,
  onLoadSucc = emptyFn,
  onLoadFail = emptyFn,
  ajaxHeaders,
}: IReactSeadragon) => {
  const refViewer = React.useRef<OpenSeadragon.Viewer>(null);
  const refAnchor = React.useRef<HTMLDivElement>(null);
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    let viewer: OpenSeadragon.Viewer | null = null;
    if (tileSources && retry) {
      onLoading();
      viewer = OpenSeadragon({
        // SEECOMM-7584
        // drawer: OpenSeadragon.WebGLDrawer,
        // drawer: OpenSeadragon.CanvasDrawer,
        drawer: OpenSeadragon.HTMLDrawer,
        crossOriginPolicy: false,
        ajaxWithCredentials: false,
        loadTilesWithAjax: !!ajaxHeaders,
        ajaxHeaders,
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
        immediateRender: false,
        prefixUrl: false,
        tileSources,
        element: refAnchor.current,
        navImages: getNavIcons(),
      });
      refViewer.current = viewer;

      const handleLoadFail = () => {
        if (viewer) {
          // Pulisci gli items e la cache.
          viewer.world.resetItems();
          viewer.imageLoader.clear();

          // Incrementa i tentativi, se permesso.
          if (attempt < retry) {
            setAttempt((prev) => prev + 1);
          } else {
            onLoadFail(); // Chiama la callback di fallimento.
          }
        }
      };
      viewer.addHandler("open", onLoadSucc);
      viewer.addHandler("open-failed", onLoadFail);
      viewer.addHandler("tile-load-failed", handleLoadFail);
    }
    return () => {
      if (refViewer.current) {
        refViewer.current.destroy();
        refViewer.current = null;
      }
    };
  }, [
    ajaxHeaders,
    onLoadFail,
    onLoadSucc,
    onLoading,
    retry,
    tileSources,
    attempt,
  ]);

  return <div ref={refAnchor} style={{ flex: 1 }} />;
};

export default React.memo(ReactSeadragon);
