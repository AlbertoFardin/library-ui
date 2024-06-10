import * as React from "react";

// map to avoid mix of text and special key
// example: if "toCatch: KeyMap.Alt + 'o'"
// ❌ "Alto" / ✅ "Alt" + "o"
export const KeyMap = {
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowRight: "→",
  ArrowLeft: "←",
  Alt: "|[ALT]|",
  Meta: "|[CMD]",
  Escape: "|[ESC]|",
  Shift: "|[SHIFT]|",
  CapsLock: "|[CAPSLOCK]|",
};
export interface IListener {
  toCatch: string;
  onCatch: () => void;
}
export interface ICatchCode {
  listeners: IListener[];
  children;
}

const registeredTyped: { [toCatch: string]: string } = {};
const registeredListeners: Array<{ id: string; listener }> = [];

const registerListener = ({ toCatch, onCatch }: IListener): boolean => {
  const found = registeredListeners.find((x) => x.id === toCatch) !== undefined;
  if (found) return false;

  const keydownHandle = (event) => {
    if (document.activeElement !== document.body) return null;

    const key = event.key;
    const k = Object.keys(KeyMap).find((a) => a === key);
    const typed = registeredTyped[toCatch] || "";
    const newTyped = typed + String(!!k ? KeyMap[k] : key.toLocaleUpperCase());
    const codUp = String(toCatch).toLocaleUpperCase();
    if (newTyped === codUp) {
      onCatch();
      registeredTyped[toCatch] = "";
    } else {
      const n = newTyped.length;
      const isCode = codUp.substr(0, n) === newTyped.substr(0, n);
      registeredTyped[toCatch] = isCode ? newTyped : "";
    }
  };

  window.addEventListener("keydown", keydownHandle);
  registeredListeners.push({
    id: toCatch,
    listener: keydownHandle,
  });
  return true;
};

const unregisterListener = ({ toCatch }: IListener): boolean => {
  const foundIndex = registeredListeners.findIndex((x) => x.id === toCatch);
  if (foundIndex < 0) return false;

  window.removeEventListener(
    "keydown",
    registeredListeners[foundIndex].listener,
  );
  registeredListeners.splice(foundIndex, 1);
  return true;
};

const CatchCode = ({ listeners, children }: ICatchCode) => {
  React.useEffect(() => {
    listeners.forEach((l) => registerListener(l));

    return () => {
      listeners.forEach((l) => unregisterListener(l));
    };
  }, [listeners]);

  return children;
};

export default CatchCode;
