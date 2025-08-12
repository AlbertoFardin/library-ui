import { SerializableParams } from ".";

const serializeObject = (obj: SerializableParams, prefix?: string): string => {
  const str = Object.keys(obj).reduce<string[]>((acc, p) => {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];

      if (v !== null && typeof v === "object") {
        if (Array.isArray(v)) {
          v.forEach((item, index) => {
            acc.push(
              typeof item === "object" && item !== null
                ? serializeObject(item as SerializableParams, `${k}[${index}]`)
                : `${encodeURIComponent(`${k}[${index}]`)}=${encodeURIComponent(String(item))}`,
            );
          });
        } else {
          acc.push(serializeObject(v as SerializableParams, k));
        }
      } else if (v !== undefined) {
        acc.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
      }
    }
    return acc;
  }, []);

  return str.join("&");
};

export default serializeObject;
