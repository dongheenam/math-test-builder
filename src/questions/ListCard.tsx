import React, { useState } from "react";
import { IconPlus, IconEdit } from "@tabler/icons";

import { Checkbox } from "common/components";
import { SortForm } from "./components";
import { QuestionFetched } from "./types";

import styles from "./ListCard.module.scss";
import { TOPIC_COLORS, TOPIC_VALUES } from "./constants";

const questions: QuestionFetched[] = [];

export function ListCard() {
  return (
    <div className={styles.root}>
      <ListPanel />
      <QuestionsList />
    </div>
  );
}

function ListPanel() {
  const [checked, setChecked] = useState(false);
  const [sortBy, setSortBy] = useState("-updatedAt");

  return (
    <div className={styles.panel}>
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
  );
}

function QuestionsList() {
  return (
    <div className={styles.questions}>
      {questions.map((q) => (
        <Question question={q} />
      ))}
    </div>
  );
}

function Question({ question }: { question: QuestionFetched }) {
  return (
    <div className={styles.question}>
      <div className={styles.questionCheckbox}>
        <Checkbox />
      </div>
      <div className={styles.questionBadges}>
        <div>
          <div className={styles.yearBadge}>{question.yearLevel}</div>
          <div
            className={styles.topicBadge}
            style={{
              color: `var(--${TOPIC_COLORS[question.topic]}11)`,
              backgroundColor: `var(--${TOPIC_COLORS[question.topic]}3)`,
            }}
          >
            {TOPIC_VALUES[question.topic]}
          </div>
        </div>
        {question.tags.map((tag) => (
          <div key={tag} className={styles.tagBadge}>
            {tag}
          </div>
        ))}
      </div>
      <div className={styles.questionContent}>{question.content}</div>
      <div className={styles.questionIcons}>
        <button>
          <IconPlus stroke={1} />
        </button>
        <button>
          <IconEdit stroke={1} />
        </button>
      </div>
    </div>
  );
}
