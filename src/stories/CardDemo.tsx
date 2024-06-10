import * as React from "react";
import Card from "../core/Card";
import List from "../core/List";
import { getTheme } from "../theme";

export const CardDemo = ({
  children,
}: {
  children?: JSX.Element | React.ReactNode;
}) => (
  <Card
    elevation={5}
    style={{
      backgroundColor: getTheme().colors.mousehover,
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      margin: 25,
      width: "fit-content",
      padding: 0,
    }}
  >
    <List
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
      children={children}
    />
  </Card>
);

export default CardDemo;
