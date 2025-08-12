import ViewerJson from "./ViewerJson";

export default {
  title: "core/ViewerJson",
  component: ViewerJson,
  parameters: {
    docs: {
      description: {
        component:
          "This component use https://www.npmjs.com/package/react-json-view \nSee react-json-view demo see https://mac-s-g.github.io/react-json-view/demo/dist/",
      },
    },
  },
};

const jsonObject = {
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Springfield",
  },
  hobbies: ["Reading", "Traveling", "Gaming"],
  isAdmin: false,
};

const Story = (args) => <ViewerJson {...args} />;

export const DefaultView = Story.bind({});
DefaultView.args = {
  value: JSON.stringify(jsonObject),
};

export const InvalidJsonView = Story.bind({});
InvalidJsonView.args = {
  value: "invalid json",
};

export const JsonizedBoolean = Story.bind({});
JsonizedBoolean.args = {
  value: "true",
};

export const JsonizedBooleans = Story.bind({});
JsonizedBooleans.args = {
  value: "[true,false]",
};

export const JsonizedString = Story.bind({});
JsonizedString.args = {
  value:
    '"\\"{\\\\\\"eu\\\\\\":\\\\\\"19,99\\\\\\",\\\\\\"us\\\\\\":\\\\\\"24,99\\\\\\",\\\\\\"ru\\\\\\":{\\\\\\"full\\\\\\":\\\\\\"499\\\\\\",\\\\\\"discount\\\\\\":\\\\\\"399\\\\\\"}}\\""',
};

export const LongValidJson = Story.bind({});
LongValidJson.args = {
  value:
    '{"productId":"1A3LP00812F","colorId":"149","priceList":[{"currencyId":"EUR","storeId":"010026","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010028","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010029","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010037","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010038","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010040","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010071","priceValues":[{"priceTypeId":2,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"020068","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"030049","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"140039","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"160046","priceValues":[{"priceTypeId":1,"value":184.0000000000}]}]}',
};

export const LongInvalidJson = Story.bind({});
LongInvalidJson.args = {
  value:
    '{"productId":"1A3LP00812F","colorId":"149","priceList":[{"currencyId":"EUR","storeId":"010026","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010028","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010029","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010037","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010038","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010040","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"010071","priceValues":[{"priceTypeId":2,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"020068","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"030049","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"140039","priceValues":[{"priceTypeId":1,"value":184.0000000000}]},{"currencyId":"EUR","storeId":"160046","priceValues":[{"priceTypeId":1,"value":184.0000000000}]}]',
};
