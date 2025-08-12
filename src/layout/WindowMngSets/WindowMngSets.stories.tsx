import WindowMngSets from "./";
import Story from "./Demo";

export default {
  title: "layout/WindowMngSets",
  component: WindowMngSets,
};

export const Default = Story.bind({});

export const Loading = Story.bind({});
Loading.args = {
  loading: true,
  loadingInfinite: true,
};

export const NoSets = Story.bind({});
NoSets.args = {
  sets: [],
};

export const NoChipValues = Story.bind({});
NoChipValues.args = {
  chipValues: [],
};

export const NoChipGroups = Story.bind({});
NoChipGroups.args = {
  chipGroups: [],
};

export const SetInconsistent = Story.bind({});
SetInconsistent.args = {
  sets: [
    {
      id: "1",
      version: 0,
      ownerId: "user_id1",
      updated: 1688714709199,
      created: 1688714709199,
      payload: {
        label: "SetInconsistent",
        items: [{ id: "pippo" }, { id: "pluto", value: "_value_" }],
      },
    },
  ],
};
