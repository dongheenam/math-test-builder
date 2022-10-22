import { useRef, useState } from "react";
import { IconEdit, IconMenu, IconMinus } from "@tabler/icons";

import styles from "./Bucket.module.scss";
import classNames from "classnames";
import useDrag, { DragHandlers } from "common/hooks/useDrag";
import useStore from "./stores";

export default function Bucket() {
  const bucket = useStore.use.bucket();
  const setBucket = useStore.use.setBucket();
  const dragHandlers = useDrag(bucket, setBucket);

  if (!bucket.length) {
    return <span>Bucket is empty...</span>;
  }

  return (
    <div className={styles.root} onDragOver={(e) => e.preventDefault()}>
      {bucket.map((qid) => (
        <BucketQuestion key={qid} id={qid} dragHandlers={dragHandlers} />
      ))}
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

  return (
    <div className={styles.q} ref={ref} onDragOver={(e) => e.preventDefault()}>
      <DragButton id={id} dragHandlers={dragHandlers} parentRef={ref} />
      <span className={styles.qContent}>
        {id}
        {id}
      </span>
      <button className={styles.btn}>
        <IconEdit stroke={1} />
      </button>
      <button className={styles.btn}>
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
