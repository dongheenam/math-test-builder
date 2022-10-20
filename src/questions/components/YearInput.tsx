import { Select, SelectItem } from "common/components";
import { YEAR_LEVELS } from "questions/constants";

const inputLabel = "Year";

export type YearInputStates = {
  year: typeof YEAR_LEVELS[number] | "";
  setYear: (value: YearInputStates["year"]) => void;
};
export function YearInput({ year, setYear }: YearInputStates) {
  const data = ["", ...YEAR_LEVELS];
  return (
    <Select value={year} setValue={setYear} label={inputLabel}>
      {data.map((item, idx) => (
        <SelectItem key={idx} value={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}
