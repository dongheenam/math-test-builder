import { Topic } from "./types";

export const TOPIC_VALUES: Record<Topic, string> = {
  NUM: "number",
  ALG: "algebra",
  MEAS: "measurement",
  GEO: "geometry",
  STAT: "statistics",
  PROB: "probability",
  CALC: "calculus",
} as const;
export const TOPIC_COLORS: Record<Topic, string> = {
  NUM: "yellow",
  ALG: "pink",
  MEAS: "indigo",
  GEO: "blue",
  STAT: "green",
  PROB: "lime",
  CALC: "red",
};
export const SORT_DATA = [
  { value: "-updatedAt", label: "newest first" },
  { value: "updatedAt", label: "oldest first" },
];
export const YEAR_LEVELS = ["7", "8", "9", "10", "11", "12"] as const;
