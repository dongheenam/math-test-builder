import React, { useState } from "react";

export type OnDragStart = (
  item: string,
  ref: React.RefObject<HTMLElement>
) => (event: React.DragEvent) => void;
export type OnDragOver = (item: string) => (event: React.DragEvent) => void;
export type OnDragEnd = () => (event: React.DragEvent) => void;
export type DragHandlers = {
  onDragStart: OnDragStart;
  onDragOver: OnDragOver;
  onDragEnd: OnDragEnd;
};

/** exports handlers for drag-and-drop elements
 * ref: https://tinloof.com/blog/how-to-make-and-test-your-own-react-drag-and-drop-list-with-0-dependencies
 */
export default function useDrag(
  items: string[],
  setItems: (items: string[]) => void
): DragHandlers {
  const [itemDragging, setItemDragging] = useState<string>();

  const onDragStart: OnDragStart = (item, ref) => (event) => {
    setItemDragging(item);
    const domObject = ref.current;
    if (!domObject) {
      throw new ReferenceError("Ref is not properly set!");
    }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text", item);
    event.dataTransfer.setDragImage(domObject, 20, domObject.offsetHeight);
  };

  const onDragOver: OnDragOver = (item) => (event) => {
    event.preventDefault();
    if (!itemDragging) {
      throw new ReferenceError("Item is dragged over an undefined object!");
    }
    // if the item is dragged over itself
    if (itemDragging === item) return;

    // re-shuffle the array
    const itemIndex = items.indexOf(item);
    if (itemIndex === -1) {
      throw new ReferenceError("Item dragged over does not exist!");
    }
    // filter out the currently dragged item
    const prev = [...items];
    let next = prev.filter((value) => value !== itemDragging);
    // add the dragged item after the item dragged over
    next.splice(itemIndex, 0, itemDragging);
    setItems(next);
  };

  const onDragEnd: OnDragEnd = () => (event) => {
    event.preventDefault();
    setItemDragging(undefined);
  };

  const dragHandlers = { onDragStart, onDragOver, onDragEnd };

  return dragHandlers;
}
