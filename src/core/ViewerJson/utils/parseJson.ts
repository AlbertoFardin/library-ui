export type ParseJsonResult =
  | { success: true; jsonObject: object }
  | { success: false; error: string };

const parseJson = (jsonString: string): ParseJsonResult => {
  try {
    const jsonObject = JSON.parse(jsonString);
    return { success: true, jsonObject: jsonObject };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};
export default parseJson;
