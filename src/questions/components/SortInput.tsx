import { Select, SelectItem } from "common/components";
import { SORT_DATA } from "questions/constants";

export type SortInputState = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export function SortInput({ sortBy, setSortBy }: SortInputState) {
  const data = SORT_DATA;

  return (
    <Select value={sortBy} setValue={setSortBy}>
      {data.map((item, idx) => (
        <SelectItem key={idx} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
