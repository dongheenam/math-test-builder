import { IconX } from "@tabler/icons";

import styles from "./TextForm.module.scss";

export type TextFormState = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const formLabel = "Text";

export function TextForm({ text, setText }: TextFormState) {
  return (
    <div role="label" className={styles.root}>
      <span className={styles.label}>{formLabel}</span>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={styles.clearIcon} onClick={() => setText("")}>
          <IconX size="1em" stroke={1.5} />
        </button>
      </div>
    </div>
  );
}
