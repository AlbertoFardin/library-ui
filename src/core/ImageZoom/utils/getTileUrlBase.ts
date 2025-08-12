const getTileUrlBase = (fullUrl: string): string => {
  const url = new URL(fullUrl);
  const urlWithoutParams = url.origin + url.pathname;
  const tileUrlBase = urlWithoutParams.replace(
    /([^/]+?)(\.(dzi|xml|js)?(\?[^/]*)?)?\/?$/,
    "$1_files/",
  );
  return tileUrlBase;
};
export default getTileUrlBase;
