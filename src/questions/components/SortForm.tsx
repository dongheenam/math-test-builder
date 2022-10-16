import { Select, SelectItem } from "common/components";
import { SORT_DATA } from "questions/constants";

export type SortFormState = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

export function SortForm({ sortBy, setSortBy }: SortFormState) {
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
