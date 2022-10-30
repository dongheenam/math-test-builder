import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";

const MarkdownParser = dynamic(() => import("./MarkdownParser"), {
  suspense: true,
});

import styles from "./MarkdownEditor.module.scss";

export function MarkdownEditor({
  text,
  setText,
}: {
  text: string;
  setText: (value: string) => void;
}) {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const nRows = textRef.current?.value
    ? textRef.current.value.split("\n").length + 1
    : 2;

  return (
    <div className={styles.root}>
      <div className={styles.control}>Buttons</div>
      <div className={styles.editor}>
        <textarea
          ref={textRef}
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={nRows}
        />
        <div className={styles.preview}>
          <Suspense fallback={text}>
            <MarkdownParser text={text} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
