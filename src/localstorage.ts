interface ILocalstorage {
  getItem: <T>(key: string) => T | null;
  setItem: (key: string, value: string | number | boolean) => void;
  removeItem: (key: string) => void;
}

let localstorage: ILocalstorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  localstorage = {} as ILocalstorage;
  localstorage.getItem = (key: string) => {
    return localstorage[key] ? localstorage[key] : null;
  };
  localstorage.setItem = (key: string, value: string | number | boolean) => {
    localstorage[key] = value;
  };
  localstorage.removeItem = (item: string) => {
    delete localstorage[item];
  };
} else {
  localstorage = localStorage as ILocalstorage;
}

const parseValue = <T>(v): T => {
  try {
    return JSON.parse(v) as T;
  } catch {
    return v as T;
  }
};

export const localstorageGetItem = <T>(key: string, fallback?: T): T => {
  try {
    const value = localstorage[key];
    if (value == null) {
      throw "no_value";
    }
    const v = parseValue<T>(value);
    return v;
  } catch {
    return fallback;
  }
};

export const localstorageRemoveItem = (key: string): void => {
  localstorage.removeItem(key);
};

export const localstorageSetItem = <T>(key: string, value: T): T => {
  const stringified = JSON.stringify(value);
  localstorage.setItem(key, stringified);
  return value;
};

export default localstorage;
