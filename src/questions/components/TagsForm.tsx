import { useCallback, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { IconSelector, IconCheck, IconX } from "@tabler/icons";

import styles from "./TagsForm.module.scss";
import React from "react";

// TODO: https://github.com/tailwindlabs/headlessui/issues/1394
export type TagsFormStates = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const formLabel = "Tags";

export function TagsForm({ tags, setTags }: TagsFormStates) {
  const [tagsData, setTagsData] = useState<string[]>(tags);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTags = !query
    ? tagsData
    : tagsData.filter((tag) => tag.toLowerCase().includes(query.toLowerCase()));
  const optionItems = !query
    ? filteredTags
    : [...new Set([query, ...filteredTags])];

  const handleChange = (tags: string[]) => {
    // update selected state
    setTags(tags);
    // update  and show options
    setTagsData((prev) => [...new Set([...prev, ...tags])].sort());
    setQuery("");
    // reset and focus the input
    if (inputRef.current !== null) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const removeAll = useCallback(() => {
    setTags([]);
  }, []);

  /* COMPONENTS */
  const emptyButton = tags.length > 0 && (
    <button onClick={() => removeAll()} className={styles.emptyIcon}>
      <IconX size="1em" stroke={1.5} />
    </button>
  );

  const selectedItems = tags.map((tag, idx) => (
    <button
      key={idx}
      className={styles.selectedItem}
      onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}
    >
      <span>{tag}</span>
      <IconX size="1em" stroke={1.5} />
    </button>
  ));

  /* MAIN JSX */
  return (
    <div role="label" className={styles.root}>
      {JSON.stringify({ query })}
      <Combobox value={tags} onChange={handleChange} multiple>
        <span className={styles.label}>{formLabel}</span>
        <div className={styles.comboboxWrapper}>
          <div className={styles.trigger}>
            <div className={styles.inputWrapper}>
              {selectedItems}
              <Combobox.Input
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
              />
            </div>
            {emptyButton}
            <IconSelector
              size="1em"
              stroke={1.5}
              className={styles.selectIcon}
            />
          </div>
          <Combobox.Options className={styles.options}>
            {optionItems.map((tag, idx) => (
              <Option key={idx} value={tag}>
                {tag}
              </Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}

function Option({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Combobox.Option value={value} as={React.Fragment}>
      {({ selected }) => (
        <li className={styles.item}>
          {children}
          {selected && <IconCheck />}
        </li>
      )}
    </Combobox.Option>
  );
}
