import { conditionType } from "./types";

type conditionObjType = { key: number; value: conditionType };
export const conditions: conditionObjType[] = [
  { key: 2, value: "New" },
  { key: 1, value: "Slightly Used" },
  { key: 3, value: "Used" },
  { key: 4, value: "Refurbished" },
];
