"use client";

import React from "react";
import styles from "./write.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

const SAVE_DELAY = 5 * 1000;

export const WriteContent: React.FC<{}> = () => {
  const [title, setTitle] = React.useState<string>("");
  const lastSavedRef = React.useRef<HTMLSpanElement>(null);

  const content = React.useRef<string>(""); // ref to prevent dom updates
  const pendingUpdate = React.useRef<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleNoteUpdate = (value: string) => {
    content.current = value;
    if (!pendingUpdate.current) {
      setTimeout(updateNote, SAVE_DELAY);
      pendingUpdate.current = true;

      if (lastSavedRef.current) {
        lastSavedRef.current.innerText = `Saving...`;
      }
    }
  };

  const updateNote = () => {
    if (lastSavedRef.current) {
      lastSavedRef.current.innerText = `Last saved at ${new Date().toDateString()}`;
    }

    pendingUpdate.current = false;
  };

  return (
    <div id={styles.writeContent} className={font.className}>
      <input
        id="new-title"
        value={title}
        placeholder="New note"
        onChange={handleInput}
      ></input>
      <div id="quill-container">
        <ReactQuill theme="snow" onChange={handleNoteUpdate}></ReactQuill>
      </div>
      <div>
        <span id={styles.lastSaved} ref={lastSavedRef}>
          No changes found
        </span>
      </div>
    </div>
  );
};

export default WriteContent;
