import React from "react";
import * as PrimSelect from "@radix-ui/react-select";
import { Label } from "@radix-ui/react-label";
import { IconSelector, IconCheck } from "@tabler/icons";

import styles from "./Select.module.scss";

export type SelectProps<T extends string> = React.ComponentProps<
  typeof PrimSelect.Root
> & {
  value: T;
  setValue: (value: T) => void;
  label?: string;
};

function renderSelect<T extends string>(
  { value, setValue, label, children, ...props }: SelectProps<T>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Label asChild>
      <div className={styles.root}>
        <span className={styles.label}>{label}</span>
        <PrimSelect.Root
          value={value}
          onValueChange={(value) => setValue(value as T)}
          {...props}
        >
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
}

function renderSelectItem(
  { children, ...props }: React.ComponentProps<typeof PrimSelect.Item>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <PrimSelect.Item {...props} ref={forwardedRef} className={styles.item}>
      <PrimSelect.ItemText>{children}</PrimSelect.ItemText>
      <PrimSelect.ItemIndicator className={styles.checkedIcon}>
        <IconCheck stroke={1.5} />
      </PrimSelect.ItemIndicator>
    </PrimSelect.Item>
  );
}

export const Select = React.forwardRef(renderSelect);
export const SelectItem = React.forwardRef(renderSelectItem);
