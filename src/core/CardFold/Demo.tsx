import * as React from "react";
import CardFold from ".";
import { getTheme } from "../../theme";
import hexToRgbA from "../../utils/hexToRgbA";
import InputBoolean from "../../stories/InputBoolean";
import InputText from "../../stories/InputText";
import InputNumber from "../../stories/InputNumber";
import CardDemo from "../../stories/CardDemo";

const CardFoldDemo = () => {
  const [color, setColor] = React.useState(getTheme().colors.msgInfo);
  const [open, setOpen] = React.useState(true);
  const [size, setSize] = React.useState(15);
  const [radius, setRadius] = React.useState(15);
  const [anchorX, setAnchorX] = React.useState("left" as "left" | "right");
  const [anchorY, setAnchorY] = React.useState("top" as "top" | "bottom");

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            alignSelf: "center",
            border: "1px solid #000",
            borderRadius: size,
            position: "relative",
            background: hexToRgbA(color, 0.25),
            width: 120,
            height: 120,
          }}
        >
          <CardFold
            color={color}
            open={open}
            size={size}
            radius={radius}
            anchorX={anchorX}
            anchorY={anchorY}
          />
        </div>
      </div>

      <CardDemo>
        <InputBoolean
          label={`OPEN ${open ? "ON" : "OFF"}`}
          value={open}
          onChange={setOpen}
        />
        <InputText label="color (hex)" value={color} onChange={setColor} />
        <InputText
          label="anchorX (left | right)"
          value={anchorX}
          onChange={setAnchorX}
        />
        <InputText
          label="anchorY (top | bottom)"
          value={anchorY}
          onChange={setAnchorY}
        />
        <InputNumber label="size" value={size} onChange={setSize} />
        <InputNumber label="radius" value={radius} onChange={setRadius} />
      </CardDemo>
    </div>
  );
};

export default CardFoldDemo;
