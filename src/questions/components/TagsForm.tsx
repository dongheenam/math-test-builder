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

  // items shown in the dropdown menu
  let optionItems: string[] = tagsData.filter((tag) => !tags.includes(tag));
  if (query !== "") {
    const filteredTags = optionItems.filter((tag) =>
      tag.toLowerCase().includes(query.toLowerCase())
    );
    optionItems = [...new Set([query, ...filteredTags])];
  }

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
  }, [setTags]);

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
      <Combobox value={tags} onChange={handleChange} multiple>
        <span className={styles.label}>{formLabel}</span>
        <div className={styles.comboboxWrapper}>
          <div className={styles.trigger}>
            <Combobox.Button as="div" className={styles.inputWrapper}>
              {selectedItems}
              <Combobox.Input
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
              />
            </Combobox.Button>
            {emptyButton}
            <IconSelector
              size="1em"
              stroke={1.5}
              className={styles.selectIcon}
            />
          </div>
          <Combobox.Options className={styles.options}>
            {optionItems.length === 0 ? (
              <li className={styles.itemEmpty}>
                Type a new tag and press enter...
              </li>
            ) : (
              optionItems.map((tag, idx) => (
                <Option key={idx} value={tag}>
                  {tag}
                </Option>
              ))
            )}
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
    <Combobox.Option value={value} className={styles.item}>
      {children}
    </Combobox.Option>
  );
}
