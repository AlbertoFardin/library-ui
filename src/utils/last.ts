const last = <T>(array: T[]): T => {
  const n = array.length;
  if (!n) return undefined;
  return array[n - 1];
};

export default last;
