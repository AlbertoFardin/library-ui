import * as React from "react";

const style: React.CSSProperties = {
  position: "absolute",
  margin: "auto",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
  outline: "none",
  zIndex: 1,
};

export interface IInputFile {
  acceptFiles?: string;
  directory?: string;
  multiple?: boolean;
  onChangeInput: (event) => void;
  disabled?: boolean;
}

const InputFile = ({
  acceptFiles = "*",
  directory,
  multiple = false,
  onChangeInput,
  disabled,
}: IInputFile) => {
  const onClick = React.useCallback((event) => {
    event.stopPropagation();
  }, []);

  if (disabled) return null;

  return (
    <input
      title={directory ? "Select folder" : "Select file"}
      type={directory ? undefined : "file"}
      accept={acceptFiles}
      {...{
        directory,
        webkitdirectory: directory,
      }}
      multiple={multiple}
      onClick={onClick}
      onChange={onChangeInput}
      style={style}
    />
  );
};

export default InputFile;
