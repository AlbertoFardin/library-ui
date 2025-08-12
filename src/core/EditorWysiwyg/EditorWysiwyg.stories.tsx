import { action } from "@storybook/addon-actions";
import EditorWysiwyg, { RICHEDITOR_EMPTY_TAG } from ".";

const value =
  '<p>See this link to <a href="https://draftjs.org/" target="_self">DraftJs Doc/</a>' +
  '<p>See this link to <a href="https://jpuri.github.io/react-draft-wysiwyg/#/demo" target="_self">DraftJs Demo/</a>' +
  "<br/><br/><br/>" +
  "<strong>Lorem ipsum dolor</strong> <em>sit amet, consectetur adipiscing elit.</em>&nbsp;</p><ul>  <li>Vivamus accumsan lectus ut libero vulputate.</li></ul><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p><p>Elementum felis aliquet. Fusce non tincidunt turpis, sit amet tincidunt magna. Nulla nec aliquam diam, eget gravida nisi. Nulla facilisis, dui lacinia sodales tristique, tellus magna bibendum enim, a tincidunt justo urna sit amet leo. Nulla facilisis nibh nec purus tempor, eu rutrum purus convallis. In sollicitudin velit urna, vitae iaculis justo fermentum in. Nam finibus augue nec elit varius, quis ultricies felis suscipit. Integer ac gravida risus. Sed vel urna vel mauris pellentesque interdum.</p>";

export default {
  title: "core/EditorWysiwyg",
  component: EditorWysiwyg,
  args: {
    style: { border: "1px solid #f00" },
    onChange: action("onChange"),
    onBlur: action("onBlur"),
    onFocus: action("onFocus"),
    value,
  },
};

const EditorStory = (args) => (
  <div style={{ border: "1px solid #f00" }}>
    <EditorWysiwyg {...args} />
  </div>
);
export const Editor = EditorStory.bind({});

export const Empty = EditorStory.bind({});
Empty.args = {
  value: RICHEDITOR_EMPTY_TAG,
};

export const ReadOnly = EditorStory.bind({});
ReadOnly.args = {
  readOnly: true,
};
