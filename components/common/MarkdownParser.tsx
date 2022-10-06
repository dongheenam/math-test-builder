import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

const MarkdownParser = ({ text }: { text: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      sourcePos
    >
      {text}
    </ReactMarkdown>
  );
};
export default MarkdownParser;
