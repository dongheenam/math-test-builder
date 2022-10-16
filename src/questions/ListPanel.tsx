import React, { useState } from "react";

import { Checkbox } from "common/components";
import { SortForm } from "./components";

import styles from "./ListPanel.module.scss";

export function ListPanel() {
  const [checked, setChecked] = useState(false);
  const [sortBy, setSortBy] = useState("-updatedAt");

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.select}>
          <Checkbox checked={checked} setChecked={setChecked} />
        </div>
        <div className={styles.controlSelected}>
          <span>0 selected</span>
          <button>(add to bucket)</button>
        </div>

        <div className={styles.count}>showing 3 of 3 results</div>
        <div className={styles.controlSort}>
          <SortForm sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>
    </div>
  );
}
