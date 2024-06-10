export const sortByKey = <T>(array: T[], key?: string, order = 1): T[] => {
  return array.sort((a, b) => {
    const aKey = key ? a[key] : a;
    const bKey = key ? b[key] : b;
    if (aKey > bKey) return order;
    if (aKey < bKey) return -order;
    return 0;
  });
};

export const sortStrings = (
  itemsValue: string[],
  itemsSort: string[],
): string[] => {
  const result = Array.from(itemsValue);

  // Creiamo un oggetto che mappa le stringhe di sort con l'indice di ordine
  const orderMap = {};
  itemsSort.forEach((item, index) => (orderMap[item] = index));

  // Ordiniamo itemsValue in base all'ordine definito da itemsSort
  result.sort((a, b) => {
    // Se entrambi a e b sono nell'array2, ordina in base all'ordine definito
    if (orderMap.hasOwnProperty(a) && orderMap.hasOwnProperty(b)) {
      return orderMap[a] - orderMap[b];
    }
    // Se solo a è nell'array2, metti a prima di b
    else if (orderMap.hasOwnProperty(a)) return -1;
    // Se solo b è nell'array2, metti b prima di a
    else if (orderMap.hasOwnProperty(b)) return 1;
    // Se nessuno dei due è nell'array2, mantieni l'ordine originale
    else return 0;
  });

  return result;
};
