import * as React from "react";
import { Portal } from "react-portal";

const nodePortal =
  document.getElementById("app") ||
  document.getElementById("root") ||
  document.getElementById("storybook-root") ||
  undefined;

export interface IPortal {
  children: JSX.Element | React.ReactNode;
}
const MyPortal = ({ children }: IPortal) => (
  <Portal node={nodePortal} children={children} />
);

export default MyPortal;
