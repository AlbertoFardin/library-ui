import {
  getInitEditorStateFromValue,
  getValueFromEditorState,
} from "../utils/draftEditorUtils";

test("verify idenpontecy getContentStateFromFragmentHtmlString & getHtmlStringFromContentState", () => {
  {
    const tagBr = "<p></p>";

    expect(getValueFromEditorState(getInitEditorStateFromValue(tagBr))).toEqual(
      tagBr,
    );
  }
  {
    const tagBr = "<p>ciao</p>";

    expect(getValueFromEditorState(getInitEditorStateFromValue(tagBr))).toEqual(
      tagBr,
    );
  }
  {
    const tagBr = "<p><br></p>";

    expect(getValueFromEditorState(getInitEditorStateFromValue(tagBr))).toEqual(
      "<p></p>",
    );
  }
});
