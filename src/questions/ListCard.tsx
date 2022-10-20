import React, { useState } from "react";
import { IconPlus, IconEdit } from "@tabler/icons";

import { Checkbox } from "common/components";
import { SortInput } from "./components";
import useFetchQuestions from "questions/libs/useFetchQuestions";
import { TOPIC_COLORS, TOPIC_VALUES } from "./constants";
import { QuestionFetched } from "./types";

import styles from "./ListCard.module.scss";

export function ListCard() {
  const { data, isSuccess, isLoading, isError, error } = useFetchQuestions();
  if (isLoading) {
    return <span>Loading questions...</span>;
  }
  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  if (!isSuccess) {
    return <span>Loading failed for unknown reason...</span>;
  }

  const { questions, count } = data;
  return (
    <div className={styles.root}>
      <ListPanel count={count} />
      {questions && <QuestionsList questions={questions} />}
    </div>
  );
}

function ListPanel({ count }: { count: number }) {
  const [sortBy, setSortBy] = useState("-updatedAt");

  return (
    <div className={styles.panel}>
      <div className={styles.select}>
        <Checkbox />
      </div>
      <div className={styles.controlSelected}>
        <span>0 selected</span>
        <button>(add to bucket)</button>
      </div>

      <div className={styles.count}>showing {count} results</div>
      <div className={styles.controlSort}>
        <SortInput sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>
  );
}

function QuestionsList({ questions }: { questions: QuestionFetched[] }) {
  return (
    <div className={styles.questions}>
      {questions.map((q) => (
        <Question question={q} key={q.id} />
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
