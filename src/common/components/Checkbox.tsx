import * as PrimCheckbox from "@radix-ui/react-checkbox";
import { IconCheck, IconMinus } from "@tabler/icons";

import styles from "./Checkbox.module.scss";

export type CheckboxProps = {
  checked?: boolean;
  isIndeterminate?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChecked?: () => void;
};
export function Checkbox({
  checked,
  isIndeterminate,
  setChecked,
  toggleChecked,
}: CheckboxProps) {
  let handleCheckedChange = () => {};
  if (toggleChecked) {
    handleCheckedChange = () => toggleChecked();
  } else if (setChecked) {
    handleCheckedChange = () => setChecked((prev) => !prev);
  }

  return (
    <PrimCheckbox.Root
      className={styles.root}
      checked={checked}
      onCheckedChange={handleCheckedChange}
    >
      <PrimCheckbox.Indicator className={styles.indicator}>
        {checked && <IconCheck stroke={3} size="100%" />}
        {isIndeterminate && <IconMinus stroke={3} size="100%" />}
      </PrimCheckbox.Indicator>
    </PrimCheckbox.Root>
  );
}
