import { SerializableParams, serializeObject } from ".";

const addQueryParamsToUrl = (
  base: string,
  params: SerializableParams,
): string => {
  const obj: SerializableParams = { ...params };
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined || obj[k] === null) delete obj[k];
  });
  if (Object.keys(obj).length === 0) return base;
  const hasQuery = base.includes("?");
  const separator = hasQuery ? "&" : "?";
  return base + separator + serializeObject(obj);
};

export default addQueryParamsToUrl;
