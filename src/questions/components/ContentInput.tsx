import { IconX } from "@tabler/icons";

import styles from "./ContentInput.module.scss";

export type ContentInputState = {
  content: string;
  setContent: (value: string) => void;
};

const inputLabel = "Text";

export function ContentInput({ content, setContent }: ContentInputState) {
  return (
    <div role="label" className={styles.root}>
      <span className={styles.label}>{inputLabel}</span>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {content !== "" && (
          <button className={styles.clearIcon} onClick={() => setContent("")}>
            <IconX size="1em" stroke={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
