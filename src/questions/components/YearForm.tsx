import { Select, SelectItem } from "common/components";
import { YEAR_LEVELS } from "questions/constants";

const formLabel = "Year";

export type YearFormStates = {
  year: typeof YEAR_LEVELS[number] | "";
  setYear: (value: YearFormStates["year"]) => void;
};
export function YearForm({ year, setYear }: YearFormStates) {
  return (
    <Select value={year} setValue={setYear} label={formLabel}>
      {YEAR_LEVELS.map((item, idx) => (
        <SelectItem key={idx} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}
