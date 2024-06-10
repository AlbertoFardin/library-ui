import * as React from "react";
import Toolbar from "../Toolbar";
import Divider from "../Divider";
import Text from "../Text";
import { action } from "@storybook/addon-actions";
import Btn from "../Btn";
import WindowMngSets, {
  IMngChipGroup,
  IMngChipValue,
  IMngSet,
  IMngSetUser,
  IMngSetPayload,
} from "./";
import { ISortOrder } from "../../interfaces";
import { IChip } from "../Chip";
import { v4 as uuidv4 } from "uuid";

const urlImage = "./images/square_128/test_image1.jpeg";
const urlImage2 = "./images/square_128/test_image2.jpeg";
const urlImage3 = "./images/square_128/test_image3.jpeg";

const getChip = (chip: IMngChipValue, set: IMngSetPayload): IChip => {
  const setItem = (set.items || []).find((c) => c.id === chip.id);
  const setSort = (set.itemSorts || []).find((c) => c.id === chip.id);
  const c: IChip = {
    id: chip.id,
    label: chip.label,
    tooltip: chip.tooltip,
    mandatory: chip.mandatory,
    color: "#f0f",
  };

  if (!!setSort) {
    c.iconRight =
      setSort.order === ISortOrder.ASC ? "arrow_upward" : "arrow_downward";
    c.disabled = true;
    c.tooltip = "tooltip_sort";
  }

  if (!!setItem && !!setItem.value) {
    c.iconRight = "library_add_check";
    c.disabled = true;
    c.tooltip = "tooltip_value";
  }
  return c;
};
const USERS: IMngSetUser[] = [
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
const SETS_PUBLIC: IMngSet[] = [
  {
    id: "1",
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
    ownerId: "user_id2",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Set sorted",
      items: [{ id: "1" }, { id: "2" }, { id: "5" }, { id: "sconoooo" }],
      itemSorts: [{ id: "2", order: ISortOrder.ASC }],
    },
  },
  {
    id: "3",
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
    ownerId: "owner_id",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Set owner NOT_TO_SHOW",
      items: [{ id: "2" }, { id: "5" }],
    },
  },
  {
    id: "4",
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
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "MySet with valued",
      items: [{ id: "2" }, { id: "5", value: "_value_" }],
    },
  },
  {
    id: "2",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "MySet with sorting",
      items: [{ id: "1" }, { id: "2" }, { id: "5" }, { id: "sconoooo" }],
      itemSorts: [{ id: "2", order: ISortOrder.ASC }],
    },
  },
  {
    id: "3",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "blablabla",
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
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Brand Ovs, Coi, Moncler, Cucinelli, Zara, Disegual",
      items: [{ id: "1" }, { id: "7" }, { id: "4" }, { id: "2" }],
    },
  },
  {
    id: "5",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
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
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Nameset",
      items: [{ id: "1" }, { id: "2" }],
    },
  },
  {
    id: "7",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "Free saleline",
      items: [{ id: "7" }, { id: "4" }, { id: "8" }, { id: "4" }, { id: "3" }],
    },
  },
  {
    id: "xxx8",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx81",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx812",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
    payload: {
      label: "",
      items: [],
    },
  },
  {
    id: "xxx8123",
    ownerId: "user_id1",
    updated: 1688714709199,
    created: 1688714709199,
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
const getSharedSets = async (context: string): Promise<IMngSet[]> => {
  action("onSharedSet")(context);
  console.log("onSharedSet", context);
  return SETS_PUBLIC;
};
const getUser = (userId: string) => USERS.find((u) => u.id === userId);

const onSharedSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onSharedSet")(c);
  console.log("onSharedSet", c);
};
const onRemoveSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onRemoveSet")(c);
  console.log("onRemoveSet", c);
};
const onUpdateSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<void> => {
  const c = { context, setId, setPayload };
  action("onUpdateSet")(c);
  console.log("onUpdateSet", c);
};
const onCreateSet = async (
  context: string,
  setId: string,
  setPayload: IMngSetPayload,
): Promise<IMngSet> => {
  const c = { context, setId, setPayload };
  action("onCreateSet")(c);
  console.log("onCreateSet", c);
  return {
    id: uuidv4(),
    payload: setPayload,
    ownerId: "user_id1",
    updated: new Date().getTime(),
    created: 1688714709199,
  };
};

const Demo = (p) => {
  const {
    loading = false,
    sets: initSetsItems = SETS,
    chipValues = CHIP_VALUES,
    chipGroups = CHIP_GROUPS,
  } = p;

  const [btnImport, setBtnImport] = React.useState(true);
  const onBtnImport = React.useCallback(() => {
    setBtnImport(!btnImport);
  }, [btnImport]);

  const [win, setWin] = React.useState(true);
  const onOpen = React.useCallback(() => {
    setWin(true);
  }, []);
  const onClose = React.useCallback(() => {
    action("onClose")();
    setWin(false);
  }, []);

  const [sets, setSets] = React.useState(initSetsItems);
  const [selectedId, setSelectedId] = React.useState(
    !!initSetsItems.length ? initSetsItems[0].id : "",
  );

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
    <>
      <Toolbar>
        <Btn
          variant="bold"
          label={btnImport ? "WITH IMPORT" : "NO IMPORT"}
          onClick={onBtnImport}
        />
        <Btn variant="bold" label="OPEN WINDOW" onClick={onOpen} />
        {!loading ? null : (
          <Text
            weight="bolder"
            style={{ color: "red", margin: 10 }}
            children="Loading..."
          />
        )}
      </Toolbar>
      <Divider />
      <Toolbar>
        {JSON.stringify({
          id: selectedId,
        })}
      </Toolbar>
      <Toolbar>
        {JSON.stringify({
          label: sets.find((s) => s.id === selectedId)?.payload.label || "",
        })}
      </Toolbar>
      <Toolbar>
        {JSON.stringify({
          items: sets.find((s) => s.id === selectedId)?.payload.items || [],
        })}
      </Toolbar>
      <WindowMngSets
        loading={loading}
        sets={sets}
        chipMaxSlc={25}
        chipValues={chipValues}
        chipGroups={chipGroups}
        selectedId={selectedId}
        open={win}
        titleText="WindowMngSets"
        titleInfo="info"
        positionX={25}
        positionY={200}
        ownerId="owner_id"
        context="context_id"
        onClose={onClose}
        onSharedSet={onSharedSet}
        onRemoveSet={onRemoveSet}
        onCreateSet={onCreateSet}
        onUpdateSet={onUpdateSet}
        onSetsChanged={onSetsChanged}
        getUser={getUser}
        getChip={getChip}
        getSharedSets={btnImport ? getSharedSets : undefined}
        onError={action("onError")}
      />
    </>
  );
};

export default Demo;
