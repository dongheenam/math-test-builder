import { IconX } from "@tabler/icons";

import styles from "./TextInput.module.scss";

export type TextInputState = {
  text: string;
  setText: (value: string) => void;
};

const inputLabel = "Text";

export function TextInput({ text, setText }: TextInputState) {
  return (
    <div role="label" className={styles.root}>
      <span className={styles.label}>{inputLabel}</span>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text !== "" && (
          <button className={styles.clearIcon} onClick={() => setText("")}>
            <IconX size="1em" stroke={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
