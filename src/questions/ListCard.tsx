import React, { useState } from "react";
import { IconPlus, IconEdit } from "@tabler/icons";

import { Checkbox } from "common/components";
import { SortInput } from "./components";
import useQuestions from "questions/libs/useQuestions";
import { TOPIC_COLORS, TOPIC_VALUES } from "./constants";
import { QuestionFetched } from "./types";

import styles from "./ListCard.module.scss";
import useStore from "./stores";

export function ListCard() {
  // questions
  const { data, isSuccess, isLoading, isError, error } = useQuestions();

  // bucket
  const [selected, setSelected] = useState<string[]>([]);
  const addToBucket = useStore.use.addToBucket();

  const toggleSelected = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  const isSelected = (id: string) => selected.includes(id);
  const addSelectedToBucket = () => {
    addToBucket(questions.filter((question) => selected.includes(question.id)));
    setSelected([]);
  };

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
      <ListPanel
        count={count}
        numSelected={selected.length}
        addSelectedToBucket={addSelectedToBucket}
      />
      {questions && (
        <QuestionsList
          questions={questions}
          isSelected={isSelected}
          toggleSelected={toggleSelected}
        />
      )}
    </div>
  );
}

function ListPanel({
  count,
  numSelected,
  addSelectedToBucket,
}: {
  count?: number;
  numSelected: number;
  addSelectedToBucket: () => void;
}) {
  // sort order
  const orderBy = useStore((state) => state.searchQuery.orderBy);
  const setSearchQuery = useStore.use.setSearchQuery();
  const setOrderBy = (value: string) => setSearchQuery({ orderBy: value });

  return (
    <div className={styles.panel}>
      <div className={styles.select}>
        <Checkbox />
      </div>
      <div className={styles.controlSelected}>
        <span>{numSelected} selected</span>
        {numSelected > 0 && (
          <button onClick={() => addSelectedToBucket()}>(add to bucket)</button>
        )}
      </div>

      {count ? (
        <div className={styles.count}>showing {count} results</div>
      ) : (
        <div></div>
      )}
      <div className={styles.controlSort}>
        <SortInput sortBy={orderBy} setSortBy={setOrderBy} />
      </div>
    </div>
  );
}

function QuestionsList({
  questions,
  isSelected,
  toggleSelected,
}: {
  questions: QuestionFetched[];
  isSelected: (id: string) => boolean;
  toggleSelected: (id: string) => void;
}) {
  return (
    <div className={styles.questions}>
      {questions.map((q) => (
        <Question
          key={q.id}
          question={q}
          isSelected={isSelected}
          toggleSelected={toggleSelected}
        />
      ))}
    </div>
  );
}

function Question({
  question,
  isSelected,
  toggleSelected,
}: {
  question: QuestionFetched;
  isSelected: (id: string) => boolean;
  toggleSelected: (id: string) => void;
}) {
  return (
    <div className={styles.question}>
      <div className={styles.questionCheckbox}>
        <Checkbox
          checked={isSelected(question.id)}
          toggleChecked={() => toggleSelected(question.id)}
        />
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
          <IconEdit stroke={1} />
        </button>
        <button>
          <IconPlus stroke={1} />
        </button>
      </div>
    </div>
  );
}
