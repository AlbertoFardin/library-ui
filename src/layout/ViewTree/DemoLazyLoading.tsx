import * as React from "react";
import ViewTree, { IViewTreeItem } from "./";
import { Initialize } from "../../interfaces";
import { SelectType } from "../../core/Checkbox";

const mockItems: IViewTreeItem[] = [
  {
    id: "folder1",
    label: "Folder 1",
    parent: null,
    icon: "folder",
    hasChildren: true,
  },
  {
    id: "folder2",
    label: "Folder 2",
    parent: null,
    icon: "folder",
    hasChildren: true,
  },
  {
    id: "folder3",
    label: "Folder 3",
    parent: null,
    icon: "folder",
    hasChildren: true,
  },
  {
    id: "folder4",
    label: "Folder 4",
    parent: null,
    icon: "folder",
    hasChildren: true,
  },
  {
    id: "folder5",
    label: "Folder 5",
    parent: null,
    icon: "folder",
    hasChildren: true,
  },
];

enum ACTIONS {
  INIT_GETDATA_STARTED = "INIT_GETDATA_STARTED",
  INIT_GETDATA_LOADING = "INIT_GETDATA_LOADING",
  INIT_GETDATA_STOPPED = "INIT_GETDATA_STOPPED",
  SELECT = "SELECT",
  EXPAND = "EXPAND",
}
interface IFolder {
  id: string;
  name: string;
}

interface IReducerState {
  initGetData: Initialize;
  idsToLoad: string[];
  idsLoaded: string[];
  selected: string[];
  expanded: string[];
  items: IViewTreeItem[];
}

const reducerInitState: IReducerState = {
  initGetData: Initialize.NONE,
  idsToLoad: [],
  idsLoaded: [],
  selected: [],
  expanded: [],
  items: mockItems,
};

const reducer = (state: IReducerState, action): IReducerState => {
  const newState = { ...state };
  switch (action.type) {
    case ACTIONS.INIT_GETDATA_STARTED:
      newState.initGetData = Initialize.START;
      return newState;
    case ACTIONS.INIT_GETDATA_LOADING:
      newState.initGetData = Initialize.WAIT;
      return newState;
    case ACTIONS.INIT_GETDATA_STOPPED: {
      const folders: IFolder[] = action.files;
      const parent = String(action.parent);
      newState.initGetData = Initialize.NONE;

      newState.idsToLoad = newState.idsToLoad.filter((i) => i !== parent);

      const idsLoaded = Array.from(newState.idsLoaded);
      idsLoaded.push(parent);
      newState.idsLoaded = idsLoaded;

      const expanded = Array.from(newState.expanded);
      expanded.push(parent);
      newState.expanded = expanded;

      if (folders.length > 0) {
        const items = Array.from(newState.items);
        folders.forEach((f) => {
          items.push({
            id: f.id,
            parent,
            label: f.name,
            hasChildren: true,
          });
        });
        newState.items = items;
      } else {
        newState.items = newState.items.map((i) => ({
          ...i,
          hasChildren: i.id === parent ? false : i.hasChildren,
        }));
      }
      return newState;
    }
    case ACTIONS.SELECT:
      newState.selected = [action.id];
      return newState;
    case ACTIONS.EXPAND: {
      const id: string = action.id;
      const isLoaded = newState.idsLoaded.some((i) => i === id);
      if (isLoaded) {
        const expanded = Array.from(newState.expanded);
        const indexToRemove = expanded.findIndex((i) => i === id);
        if (indexToRemove === -1) {
          expanded.push(id);
        } else {
          expanded.splice(indexToRemove, 1);
        }
        newState.expanded = expanded;
      } else {
        const idsToLoad = Array.from(newState.idsToLoad);
        idsToLoad.push(id);
        newState.idsToLoad = idsToLoad;
      }
      return newState;
    }
    default:
      return newState;
  }
};

const TreeViewDemo = () => {
  const [state, dispatch] = React.useReducer(reducer, reducerInitState);
  const { initGetData, idsToLoad, selected, expanded, items } =
    state as IReducerState;
  const onToggle = React.useCallback((id: string) => {
    dispatch({ type: ACTIONS.EXPAND, id });
  }, []);
  const onClick = React.useCallback((id: string) => {
    dispatch({ type: ACTIONS.SELECT, id });
  }, []);

  React.useEffect(() => {
    if (initGetData === Initialize.NONE && idsToLoad.length > 0) {
      dispatch({ type: ACTIONS.INIT_GETDATA_STARTED });
    }
  }, [idsToLoad.length, initGetData]);

  React.useEffect(() => {
    if (initGetData === Initialize.START) {
      (async () => {
        dispatch({ type: ACTIONS.INIT_GETDATA_LOADING });

        setTimeout(() => {
          const parent = idsToLoad[0];
          const files: IFolder[] = [1, 2, 3].map((n) => ({
            id: parent + "/" + n,
            name: parent + "/" + n,
          }));
          dispatch({
            type: ACTIONS.INIT_GETDATA_STOPPED,
            files,
            parent,
          });
        }, 1500);
      })();
    }
  }, [idsToLoad, initGetData]);

  return (
    <ViewTree
      style={{ margin: 20 }}
      items={items.map((i) => ({
        ...i,
        icon: i.hasChildren ? "folder" : "folder_open",
        loading: idsToLoad.some((id) => id === i.id),
      }))}
      selectType={SelectType.RADIO}
      expanded={expanded}
      selected={selected}
      onToggle={onToggle}
      onClick={onClick}
    />
  );
};

export default TreeViewDemo;
