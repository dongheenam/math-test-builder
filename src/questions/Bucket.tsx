import { useRef } from "react";
import classNames from "classnames";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { IconEdit, IconMenu, IconMinus } from "@tabler/icons";

import useDrag, { DragHandlers } from "common/hooks/useDrag";
import useStore from "./libs/stores";

import styles from "./Bucket.module.scss";

export default function Bucket() {
  const bucketIds = useStore.use.bucketIds();
  const setBucketIds = useStore.use.setBucketIds();
  const dragHandlers = useDrag(bucketIds, setBucketIds);

  if (!bucketIds.length) {
    return <span className={styles.empty}>Bucket is empty...</span>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.bucketControls}>
        <button>Empty</button>
        <button>Empty</button>
      </div>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <div className={styles.qRoot} onDragOver={(e) => e.preventDefault()}>
            {bucketIds.map((id) => (
              <BucketQuestion key={id} id={id} dragHandlers={dragHandlers} />
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
}

function BucketQuestion({
  id,
  dragHandlers,
}: {
  id: string;
  dragHandlers: DragHandlers;
}) {
  const ref = useRef(null);
  const bucket = useStore.use.bucket();
  const removeFromBucket = useStore.use.removeFromBucket();

  return (
    <div className={styles.q} ref={ref} onDragOver={(e) => e.preventDefault()}>
      <DragButton id={id} dragHandlers={dragHandlers} parentRef={ref} />

      <span className={styles.qContent}>{bucket[id].content}</span>

      <button className={styles.btn} onClick={() => removeFromBucket(id)}>
        <IconMinus stroke={1} />
      </button>
    </div>
  );
}

function DragButton({
  id,
  dragHandlers,
  parentRef,
}: {
  id: string;
  dragHandlers: DragHandlers;
  parentRef: React.RefObject<HTMLElement>;
}) {
  const { onDragStart, onDragOver, onDragEnd } = dragHandlers;

  return (
    <button
      className={classNames(styles.btn, styles.dragBtn)}
      draggable
      onDragStart={onDragStart(id, parentRef)}
      onDragOver={onDragOver(id)}
      onDragEnd={onDragEnd()}
    >
      <IconMenu stroke={1} />
    </button>
  );
}
