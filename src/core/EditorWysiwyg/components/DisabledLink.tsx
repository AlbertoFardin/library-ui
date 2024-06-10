import * as React from "react";
import { ContentState } from "draft-js";

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  return false;
};

interface IDisabledLinkProps {
  contentState: ContentState;
  entityKey: string;
  children: React.ReactNode;
}
const DisabledLink: React.FunctionComponent<IDisabledLinkProps> = ({
  contentState,
  entityKey,
  children,
}) => (
  <a
    href={contentState.getEntity(entityKey).getData().url}
    onClick={handleLinkClick}
    target="_blank"
    rel="noreferrer"
    children={children}
  />
);

export default DisabledLink;
