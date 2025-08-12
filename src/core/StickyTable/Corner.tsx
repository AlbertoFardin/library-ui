import { IRendererCorner } from "./IStickyTable";

const Corner = ({ width, height, top, left, zIndex }: IRendererCorner) => (
  <div
    style={{
      position: "sticky",
      width: 0,
      height: 0,
      top,
      left,
      zIndex,
    }}
  >
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        width,
        height,
      }}
    />
  </div>
);

export default Corner;
