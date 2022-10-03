import React, { useRef, useState } from "react";
import useDrag, { DragHandlers } from "components/hooks/useDrag";

const Tests = () => {
  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);
  const dragHandlers = useDrag(items, setItems);

  return (
    <div>
      {items.map((value, idx) => (
        <TestItem value={value} key={idx} dragHandlers={dragHandlers} />
      ))}
    </div>
  );
};
export default Tests;

function TestItem({
  value,
  dragHandlers,
}: {
  value: any;
  dragHandlers: DragHandlers;
}) {
  const ref = useRef(null);

  return (
    <div style={{ width: "100px" }} ref={ref}>
      <Handle
        id={value.toString()}
        refParent={ref}
        dragHandlers={dragHandlers}
      />
      <span style={{ marginLeft: "10px" }}>{value}</span>
    </div>
  );
}

function Handle({
  id,
  refParent,
  dragHandlers,
}: {
  id: string;
  refParent: React.RefObject<HTMLElement>;
  dragHandlers: DragHandlers;
}) {
  const { onDragStart, onDragOver, onDragEnd } = dragHandlers;
  return (
    <button
      draggable="true"
      onDragStart={onDragStart(id, refParent)}
      onDragOver={onDragOver(id)}
      onDragEnd={onDragEnd()}
      style={{ cursor: "grab" }}
    >
      Hand
    </button>
  );
}
