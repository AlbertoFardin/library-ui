const serializeObject = (obj, prefix?: string): string => {
  const str = Object.keys(obj).reduce((acc, p) => {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + "[" + p + "]" : p;
      const v = obj[p];
      acc.push(
        v !== null && typeof v === "object"
          ? serializeObject(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v),
      );
      return acc;
    }
  }, []);

  return str.join("&");
};

export default serializeObject;
