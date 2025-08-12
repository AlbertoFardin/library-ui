import * as React from "react";
import { action } from "@storybook/addon-actions";
import { v4 as uuidv4 } from "uuid";
import WindowMngSets, {
  IMngChipGroup,
  IMngChipValue,
  IMngSet,
  IMngSetUser,
  IMngSetPayload,
  IMngLevel,
} from "./";
import { ShareType, ISortOrder } from "../../interfaces";
import { IChip } from "../../core/Chip";
import InputBoolean from "../../stories/InputBoolean";
import CardDemo from "../../stories/CardDemo";
import InputText from "../../stories/InputText";

const urlImage = "./images/square_128/test_image1.jpeg";
const urlImage2 = "./images/square_128/test_image2.jpeg";
const urlImage3 = "./images/square_128/test_image3.jpeg";

const getChip = (
  chip: IMngChipValue,
  set: IMngSetPayload,
  shared: boolean,
): IChip => {
  const setItem = (set.items || []).find((c) => c.id === chip.id);
  const setSort = (set.itemsSort || []).find((c) => c.id === chip.id);
  const c: IChip = {
    id: chip.id,
    label: chip.label,
    tooltip: chip.tooltip,
    mandatory: chip.mandatory,
    color: "#f0f",
  };

  if (!shared && !!setSort) {
    c.iconRight =
      setSort.order === ISortOrder.ASC ? "arrow_upward" : "arrow_downward";
    c.tooltip = "tooltip_sort";
  }

  if (!shared && !!setItem && !!setItem.value) {
    c.iconRight = "library_add_check";
    c.disabled = true;
    c.tooltip = "tooltip_value";
  }
  return c;
};
const onSharedDelete = async (...c): Promise<void> => {
  action("SHARE_delete")(c);
  console.log("SHARE_delete", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
const onSharedUpsert = async (...c): Promise<void> => {
  action("SHARE_upsert")(c);
  console.log("SHARE_upsert", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
const onCreateSet = async (
  context: string,
  setPayload: IMngSetPayload,
): Promise<IMngSet> => {
  const c = { context, setPayload };
  action("onCreateSet")(c);
  console.log("onCreateSet", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return {
    id: uuidv4(),
    payload: setPayload,
    version: 0,
    ownerId: "user_id1",
    updated: new Date().getTime(),
    created: new Date().getTime(),
    shareType: ShareType.PRIVATE,
  };
};
const onRemoveSet = async (context: string, setId: string): Promise<void> => {
  const c = { context, setId };
  action("onRemoveSet")(c);
  console.log("onRemoveSet", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};
const onUpdateSet = async (context: string, set: IMngSet): Promise<IMngSet> => {
  const c = { context, set };
  action("onUpdateSet")(c);
  console.log("onUpdateSet", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  const newSet: IMngSet = {
    ...set,
    updated: new Date().getTime(),
  };
  return newSet;
};
const DELAY = 1500;
const USERS: IMngSetUser[] = [
  {
    id: "owner_id",
    name: "owner_id",
    avatar: "",
    avatarIcon: "person",
    avatarText: "O",
  },
  {
    id: "user_id",
    name: "Donatella",
    avatar: urlImage,
    avatarIcon: "person",
    avatarText: "D",
  },
  {
    id: "user_id1",
    name: "Maria",
    avatar: urlImage,
    avatarIcon: "person",
    avatarText: "M",
  },
  {
    id: "user_id2",
    name: "Elisa",
    avatar: urlImage2,
    avatarIcon: "person",
    avatarText: "E",
  },
  {
    id: "user_id3",
    name: "Fabrizia",
    avatar: urlImage3,
    avatarIcon: "person",
    avatarText: "F",
  },
  {
    id: "user_id4",
    name: "Giulia",
    avatar: "",
    avatarIcon: "person",
    avatarText: "G",
  },
];
const LEVELS: IMngLevel[] = [
  {
    id: "a",
    label: "Products",
    setId: "2",
  },
  {
    id: "b",
    label: "Colors",
    setId: "",
  },
  {
    id: "c",
    label: "Sizes",
    setId: "1",
  },
];
const SHARED: IMngSet[] = [
  {
    id: "1",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Set valued",
      items: [{ id: "2" }, { id: "5", value: "_value_" }],
    },
  },
  {
    id: "2",
    version: 0,
    ownerId: "user_id2",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Set sorted",
      items: [{ id: "1" }, { id: "2" }, { id: "5" }, { id: "sconoooo" }],
      itemsSort: [{ id: "2", order: ISortOrder.ASC }],
    },
  },
  {
    id: "3",
    version: 0,
    ownerId: "user_id2",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Mio set bellissimo",
      items: [
        { id: "7" },
        { id: "4" },
        { id: "2" },
        { id: "32" },
        { id: "5" },
        { id: "6" },
      ],
    },
  },
  {
    id: "1_more_recent",
    version: 0,
    ownerId: "user_id2",
    updated: new Date().getTime(),
    created: 1688714709199,
    payload: {
      label: "Set aggiornatissimo",
      items: [{ id: "2" }, { id: "5" }],
    },
  },
  {
    id: "1_owner",
    version: 0,
    ownerId: "owner_id",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Set owner",
      items: [{ id: "2" }, { id: "5" }],
    },
  },
  {
    id: "4",
    version: 0,
    ownerId: "user_id3",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Brand Ovs, Coi, Moncler, Cucinelli, Zara, Disegual",
      items: [{ id: "1" }, { id: "7" }, { id: "4" }, { id: "2" }],
    },
  },
  {
    id: "5",
    version: 0,
    ownerId: "user_id3",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Quello che uso sempre",
      items: [{ id: "1" }, { id: "7" }, { id: "4" }, { id: "2" }],
    },
  },
  {
    id: "6",
    version: 0,
    ownerId: "user_id4",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "clienti e supporto",
      items: [{ id: "1" }, { id: "7" }, { id: "4" }, { id: "2" }],
    },
  },
];
const SETS: IMngSet[] = [
  {
    id: "1",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "MySet with valued",
      items: [
        { id: "2" },
        { id: "5", value: "_value_" },
        { id: "THIS_ID_NOT_EXIST_MUST_DISCARD" },
      ],
    },
  },
  {
    id: "2",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "MySet with sorting",
      items: [{ id: "1" }, { id: "2" }, { id: "5" }, { id: "sconoooo" }],
      itemsSort: [
        { id: "2", order: ISortOrder.ASC },
        { id: "4", order: ISortOrder.ASC },
        { id: "7", order: ISortOrder.ASC },
      ],
    },
  },
  {
    id: "s_1",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.SHARE_OBS,
    payload: {
      label: "MySet shared obsolete",
      items: [
        { id: "7" },
        { id: "4" },
        { id: "2" },
        { id: "32" },
        { id: "5" },
        { id: "6" },
      ],
    },
  },
  {
    id: "s_2",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.SHARE_UPD,
    payload: {
      label: "MySet shared updated",
      items: [
        { id: "7" },
        { id: "4" },
        { id: "2" },
        { id: "32" },
        { id: "5" },
        { id: "6" },
      ],
    },
  },
  {
    id: "4",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "Brand Ovs, Coi, Moncler, Cucinelli, Zara, Disegual",
      items: [{ id: "1" }, { id: "7" }, { id: "4" }, { id: "2" }],
    },
  },
  {
    id: "5",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "Prodotti ecommerce Moncler",
      items: [
        { id: "7" },
        { id: "4" },
        { id: "2" },
        { id: "546" },
        { id: "56" },
        { id: "7" },
        { id: "8" },
        { id: "4" },
        { id: "3" },
      ],
    },
  },
  {
    id: "6",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "Nameset",
      items: [{ id: "1" }, { id: "2" }],
    },
  },
  {
    id: "7",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "Free saleline",
      items: [{ id: "7" }, { id: "4" }, { id: "8" }, { id: "4" }, { id: "3" }],
    },
  },
  {
    id: "xxx8",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx81",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx812",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx8123",
    version: 0,
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    shareType: ShareType.PRIVATE,
    payload: {
      label: "",
      items: [],
    },
  },
];
const CHIP_VALUES: IMngChipValue[] = [
  {
    id: "1",
    label: "Product",
    groupId: "1",
    mandatory: true,
  },
  {
    id: "2",
    label: "Type",
    groupId: "1",
  },
  {
    id: "3a",
    label: "Start Date",
    groupId: "2",
    mandatory: true,
  },
  {
    id: "3b",
    label: "End Date",
    groupId: "2",
    mandatory: true,
  },
  {
    id: "3",
    label: "Date Online",
    groupId: "2",
  },
  {
    id: "4",
    label: "Detail Code",
    groupId: "3",
  },
  {
    id: "444",
    label: "Description Online",
    groupId: "3",
    mandatory: true,
  },
  {
    id: "5",
    label: "Color",
    groupId: "1",
  },
  {
    id: "6",
    label: "Model Description",
    groupId: "1",
  },
  {
    id: "7",
    label: "Saleline Code",
    groupId: "1",
    mandatory: true,
  },
  {
    id: "8",
    label: "Macro Category",
    groupId: "1",
  },
  {
    id: "9",
    label: "Season",
    groupId: "1",
  },
  {
    id: "10",
    label: "Publish",
    groupId: "1",
  },
  {
    id: "mela",
    label: "mela",
    groupId: "fff",
  },
  {
    id: "banana",
    label: "banana",
    groupId: "fff",
  },
  {
    id: "arancia",
    label: "arancia",
    groupId: "fff",
  },
  {
    id: "pomodoro",
    label: "pomodoro",
    groupId: "fff",
  },
  {
    id: "melanzana",
    label: "melanzana",
    groupId: "fff",
  },
  {
    id: "zucchina",
    label: "zucchina",
    groupId: "fff",
  },
  {
    id: "insalata",
    label: "insalata",
    groupId: "fff",
  },
  {
    id: "radicchio",
    label: "radicchio",
    groupId: "fff",
  },
  {
    id: "uva",
    label: "uva",
    groupId: "fff",
  },
  {
    id: "gatto",
    label: "gatto",
  },
];
const CHIP_GROUPS: IMngChipGroup[] = [
  {
    id: "1",
    label: "Grouping",
  },
  {
    id: "2",
    label: "MONITORING",
  },
  {
    id: "3",
    label:
      "Group column with a title label very very long, it should show the tooltip",
  },
  {
    id: "fff",
    label: "Vegetali",
  },
];
const getItemsShared = async (c): Promise<IMngSet[]> => {
  action("getItemsShared")(c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return SHARED;
};
const getItemsLevels = async (c): Promise<IMngLevel[]> => {
  action("getItemsLevels")(c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
  return LEVELS;
};
const getUser = (userId: string): IMngSetUser => {
  try {
    return USERS.find((u) => u.id === userId);
  } catch (err) {
    console.error({ userId }, err);
    return {
      id: userId,
      name: "SCONOSCIUTO",
      avatar: "",
      avatarIcon: "",
      avatarText: "SC",
    };
  }
};

const onLevelsUpdate = async (
  context: string,
  levels: IMngLevel[],
): Promise<void> => {
  const c = { context, levels };
  action("onLevelsUpdate")(c);
  console.log("onLevelsUpdate", c);
  await new Promise((resolve) => setTimeout(resolve, DELAY));
};

const Demo = (p) => {
  const {
    loading = false,
    sets: initSetsItems = SETS,
    chipValues = CHIP_VALUES,
    chipGroups = CHIP_GROUPS,
  } = p;

  const [enableShared, setEnableShared] = React.useState(true);
  const [enableLevels, setEnableLevels] = React.useState(true);
  const [open, setOpen] = React.useState(true);
  const [sets, setSets] = React.useState(initSetsItems);
  const [selectedId, setSelectedId] = React.useState(
    !!initSetsItems.length ? initSetsItems[0].id : "",
  );

  const onClose = React.useCallback(() => setOpen(false), []);
  const onSetsChanged = React.useCallback(
    (context: string, slcId: string, sets: IMngSet[]) => {
      const c = { context, slcId, sets };
      action("onSetsChanged")(c);
      console.log("onSetsChanged", c);
      setSets(sets);
      setSelectedId(slcId);
    },
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "inherit" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1 }} />
        <WindowMngSets
          open={open}
          sets={sets}
          chipMaxSlc={25}
          chipValues={chipValues}
          chipGroups={chipGroups}
          selectedId={selectedId}
          titleText="WindowMngSets"
          titleInfo="info"
          positionX={25}
          positionY={25}
          ownerId="owner_id"
          context="context_id"
          loading={loading}
          onClose={onClose}
          onRemoveSet={onRemoveSet}
          onCreateSet={onCreateSet}
          onUpdateSet={onUpdateSet}
          onSetsChanged={onSetsChanged}
          getUser={getUser}
          getChip={getChip}
          onError={action("onError")}
          enableShared={enableShared}
          onSharedUpsert={onSharedUpsert}
          onSharedDelete={onSharedDelete}
          getItemsShared={getItemsShared}
          enableLevels={enableLevels}
          onLevelsUpdate={onLevelsUpdate}
          getItemsLevels={getItemsLevels}
        />
        <CardDemo>
          <InputBoolean label="open" value={open} onChange={setOpen} />
          <InputBoolean
            label="enableLevels"
            value={enableLevels}
            onChange={setEnableLevels}
          />
          <InputBoolean
            label="enableShared"
            value={enableShared}
            onChange={setEnableShared}
          />
          <InputText disabled label="loading" value={JSON.stringify(loading)} />
          <InputText
            disabled
            label="slcSet id"
            value={JSON.stringify(selectedId)}
          />
          <InputText
            disabled
            label="slcSet label"
            value={JSON.stringify(
              sets.find((s) => s.id === selectedId)?.payload.label || "",
            )}
          />
          <InputText
            disabled
            label="slcSet items"
            value={JSON.stringify(
              sets.find((s) => s.id === selectedId)?.payload.items || [],
            )}
          />
        </CardDemo>
      </div>
    </div>
  );
};

export default Demo;
