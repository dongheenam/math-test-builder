import { Select, SelectItem } from "common/components";
import { YEAR_LEVELS } from "questions/constants";

const formLabel = "Year";

export function YearForm({
  year,
  setYear,
}: {
  year: string;
  setYear: (value: string) => void;
}) {
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
