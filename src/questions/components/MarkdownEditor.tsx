import dynamic from "next/dynamic";
import { Suspense } from "react";

const MarkdownParser = dynamic(() => import("./MarkdownParser"), {
  suspense: true,
});

export function MarkdownEditor({
  text,
  setText,
}: {
  text: string;
  setText: (value: string) => void;
}) {
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div>
        <Suspense fallback={text}>
          <MarkdownParser text={text} />
        </Suspense>
      </div>
    </div>
  );
}
