// Basically a rehash of https://github.com/bvaughn/react-window with position: sticky

// Definizione della funzione per ottenere tutte le proprietà tranne "data" e "virtual"
const getAllButData = (obj) => {
  const keys = Object.keys(obj).filter(
    (key) => key !== "data" && key !== "virtual",
  );
  return JSON.stringify(keys.map((key) => obj[key]));
};

// Virtual and Data are values that get passed to our various sub-elements. They are large objects. I don't want to
// deeply compare each object when it's time to check if we should re-render. So deep equal everything but those two.
// We'll do a shallow check on data. Virtual is a little particular (vertical headers only care if the row sub-object
// changes; no need to re-render if column virtual data changes) so we leave that comparison to the parent.
const allButDataAndVirtualEqual = (prev, next) => {
  return getAllButData(prev) === getAllButData(next);
};

export default allButDataAndVirtualEqual;
