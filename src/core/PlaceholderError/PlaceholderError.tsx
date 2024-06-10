import * as React from "react";
import Icon from "../Icon";
import Text from "../Text";
import { getTheme } from "../../theme";

export interface IPlaceholderError {
  title?: string;
  messages?: string[];
  children?: JSX.Element | React.ReactNode;
  zIndex?: number;
}

const PlaceholderError = ({
  title = "An unexpected error occurred",
  messages = [],
  children,
  zIndex = 1,
}: IPlaceholderError) => (
  <div
    style={{
      zIndex,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    }}
  >
    <Icon
      style={{ fontSize: 70, color: getTheme().colors.theme1 }}
      children="live_help"
    />
    <br />
    <Text
      weight="bolder"
      size={2}
      children={String(title)}
      style={{
        maxWidth: 650,
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    />
    <br />
    {messages.map((t: string, i: number) => (
      <Text key={i} children={String(t)} />
    ))}
    {!messages.length ? null : <br />}
    <Text children="If the error persists, please contact" />
    <Text
      children={
        <>
          <span children="the service provider at " />
          <a
            style={{ color: getTheme().colors.theme1 }}
            target="_blank"
            rel="noreferrer"
            href={`mailto:support@warda.it`}
            children="support@warda.it"
          />
        </>
      }
    />
    <br />
    {children}
  </div>
);

export default PlaceholderError;
