import * as React from "react";
import { getFontWeight, getFontsFamily } from "../theme";

const setTextBold = (
  textBld: string,
  textAll: string,
  style?: React.CSSProperties,
  font = 0,
): JSX.Element => {
  const normBld = textBld.toLowerCase();
  const normAll = textAll.toLowerCase();
  const resultIndex = normAll.indexOf(normBld);
  let result = null;
  let firstPart = null;
  let middlePart = null;
  let endPart = null;
  let indexFinal = null;

  if (resultIndex !== -1) {
    indexFinal = resultIndex + textBld.length;
    firstPart = textAll.substr(0, resultIndex);
    middlePart = (
      <span
        style={{
          fontWeight: getFontWeight(getFontsFamily()[font], "bolder"),
          ...style,
        }}
        children={textAll.substr(resultIndex, textBld.length)}
      />
    );
    endPart = textAll.substr(indexFinal, textAll.length - indexFinal);
    result = (
      <>
        {firstPart}
        {middlePart}
        {endPart}
      </>
    );
  } else {
    result = textAll;
  }
  return result;
};

export default setTextBold;
