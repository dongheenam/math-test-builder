import React from "react";
import * as PrimSelect from "@radix-ui/react-select";
import { Label } from "@radix-ui/react-label";
import { IconSelector, IconCheck } from "@tabler/icons";

import styles from "./Select.module.scss";

export type SelectProps = React.ComponentProps<typeof PrimSelect.Root> & {
  value: string;
  setValue: (value: string) => void;
  label: string;
};
export const Select = React.forwardRef<
  React.ElementRef<typeof PrimSelect.Trigger>,
  SelectProps
>(function Select(
  { value, setValue, label, children, ...props },
  forwardedRef
) {
  return (
    <Label asChild>
      <div className={styles.root}>
        <span className={styles.label}>{label}</span>
        <PrimSelect.Root value={value} onValueChange={setValue} {...props}>
          <PrimSelect.Trigger className={styles.trigger} ref={forwardedRef}>
            <PrimSelect.Value />
            <PrimSelect.Icon>
              <IconSelector
                size="1em"
                stroke={1.5}
                className={styles.selectIcon}
              />
            </PrimSelect.Icon>
          </PrimSelect.Trigger>
          <PrimSelect.Portal>
            <PrimSelect.Content className={styles.options}>
              <PrimSelect.Viewport>{children}</PrimSelect.Viewport>
            </PrimSelect.Content>
          </PrimSelect.Portal>
        </PrimSelect.Root>
      </div>
    </Label>
  );
});

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof PrimSelect.Item>,
  React.ComponentProps<typeof PrimSelect.Item>
>(function SelectItem({ children, ...props }, forwardedRef) {
  return (
    <PrimSelect.Item {...props} ref={forwardedRef} className={styles.item}>
      <PrimSelect.ItemText>{children}</PrimSelect.ItemText>
      <PrimSelect.ItemIndicator className={styles.checkedIcon}>
        <IconCheck stroke={1.5} />
      </PrimSelect.ItemIndicator>
    </PrimSelect.Item>
  );
});
