import ImageCompare, { IImageCompare } from "./ImageCompare";

const args: IImageCompare = {
  width: 400,
  height: 400,
  backgroundColor: "#fafafa",
  style: {
    margin: 20,
    border: "1px solid #f00",
  },
  element1: (
    <img
      alt="x1"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Cats_Eye_004.jpg/1024px-Cats_Eye_004.jpg"
    />
  ),
  element2: (
    <img
      alt="x2"
      src="https://images.squarespace-cdn.com/content/v1/5ea80e849fc8330db174eec1/1690897577375-KV7QC0CYHW3TB9N44Y6V/cat+eye+1.jpg"
    />
  ),
};

export default {
  title: "core/ImageCompare",
  component: ImageCompare,
  args,
};

const Story = (args) => <ImageCompare {...args} />;

export const Example = Story.bind({});

export const ElementsUndefined = Story.bind({});
ElementsUndefined.args = {
  element2: undefined,
};
