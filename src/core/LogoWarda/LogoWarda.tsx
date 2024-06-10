import * as React from "react";
import BtnBase from "../BtnBase";
import { ILogoWarda } from ".";
import { Weight } from "./ILogoWarda";
import Light from "./weight/light";
import Medium from "./weight/medium";
import Regular from "./weight/regular";

const LogoWarda = ({
  className,
  style,
  color = "#000",
  height = 50,
  onClick,
  weight = Weight.medium,
  width = 150,
}: ILogoWarda) => (
  <BtnBase
    className={className}
    style={{
      width,
      height,
      boxSizing: "content-box",
      cursor: onClick ? "pointer" : "default",
      ...style,
    }}
    onClick={onClick}
  >
    {(() => {
      const p = { width, height, color };
      switch (weight) {
        case Weight.light:
          return <Light {...p} />;
        case Weight.regular:
          return <Regular {...p} />;
        default:
          return <Medium {...p} />;
      }
    })()}
  </BtnBase>
);

LogoWarda.Weight = Weight;

export default LogoWarda;
