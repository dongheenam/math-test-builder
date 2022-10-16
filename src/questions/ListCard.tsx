import React, { useState } from "react";
import { IconPlus, IconEdit } from "@tabler/icons";

import { Checkbox } from "common/components";
import { SortForm } from "./components";
import { QuestionFetched } from "./types";

import styles from "./ListCard.module.scss";
import { TOPIC_COLORS, TOPIC_VALUES } from "./constants";

const questions: QuestionFetched[] = [
  {
    id: "633e8fa8aefd7decd92a16d1",
    topic: "NUM",
    yearLevel: 8,
    tagIds: ["633ec7e84e549b079b7496f4", "633eca1c4e549b079b7496f5"],
    content: "Multiply 4 by -3",
    solution: "-12",
    authorId: null,
    createdAt: "2022-10-06T08:19:52.940Z",
    updatedAt: "2022-10-06T08:19:52.940Z",
    tags: ["multiply", "integer"],
  },
  {
    id: "633d64cbd2f376312e5cf831",
    topic: "NUM",
    yearLevel: 7,
    tagIds: ["633ebcd04e549b079b7496f3", "633d64ccd2f376312e5cf832"],
    content: "Evaluate $\\dfrac{1}{2} - \\dfrac{1}{3}$.",
    solution: "$\\dfrac{1}{6}$",
    authorId: null,
    createdAt: "2022-10-05T11:04:43.791Z",
    updatedAt: "2022-10-05T11:04:43.791Z",
    tags: ["fraction", "subtract"],
  },
  {
    id: "633d644ecff2632e9d89877f",
    topic: "NUM",
    yearLevel: 8,
    tagIds: ["633d644ecff2632e9d898780", "633d644ecff2632e9d898781"],
    content: "What is 3 add -2?",
    solution: "1",
    authorId: null,
    createdAt: "2022-10-05T11:02:38.291Z",
    updatedAt: "2022-10-05T11:02:38.291Z",
    tags: ["arithmetic", "add"],
  },
];

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
