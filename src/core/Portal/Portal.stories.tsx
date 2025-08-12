import Portal from "./Portal";
import Text from "../Text";

export default {
  title: "core/Portal",
  component: Portal,
};

const ExampleStory = () => (
  <>
    <Text size={3}>div_with_text_1</Text>
    <Text size={3}>div_with_text_2</Text>
    <Text size={3}>
      <div>
        div_with_text_3
        <Portal>
          <div style={{ border: "1px solid #f00" }}>
            <Text size={3}>
              Portal allows you to hang a certain element in the root node of
              the application from wherever it is defined
            </Text>
            <Text size={3}>
              This Portal with border red is defined inside div 3
            </Text>
          </div>
        </Portal>
      </div>
    </Text>
    <Text size={3}>div_with_text_4</Text>
    <Text size={3}>div_with_text_5</Text>
  </>
);
export const Example = ExampleStory.bind({});
