import * as React from "react";
import { Portal } from "react-portal";

const nodePortal =
  document.getElementById("app") ||
  document.getElementById("root") ||
  document.getElementById("storybook-root") ||
  undefined;

export interface IPortal {
  node?: HTMLElement;
  children: JSX.Element | React.ReactNode;
}
const MyPortal = ({ node = nodePortal, children }: IPortal) => (
  <Portal node={node} children={children} />
);

export default MyPortal;
