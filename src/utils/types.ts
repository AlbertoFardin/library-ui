export type SerializableParam =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableParams;
export interface SerializableParams {
  [key: string]: SerializableParam | SerializableParam[] | SerializableParams;
}
