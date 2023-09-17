"use client";

import React from "react";
import styles from "./write.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

const SAVE_DELAY = 5 * 1000;

export const WriteContent: React.FC<{}> = () => {
  const lastSavedRef = React.useRef<HTMLSpanElement>(null);

  const title = React.useRef<string>(""); // ref to prevent dom updates
  const content = React.useRef<string>(""); // ref to prevent dom updates
  const pendingUpdate = React.useRef<boolean>(false);
  const hasEverBeenSaved = React.useRef<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    title.current = event.target.value;
    console.log("changed?", title);
    tryStartingUpdateSequence();
  };

  const handleNoteUpdate = (value: string) => {
    content.current = value;
    tryStartingUpdateSequence();
  };

  const tryStartingUpdateSequence = () => {
    if (!pendingUpdate.current) {
      setTimeout(updateNote, SAVE_DELAY);
      pendingUpdate.current = true;

      if (lastSavedRef.current) {
        lastSavedRef.current.innerText = `Saving...`;
      }
    }
  };

  // actually sends the request updating the note
  const updateNote = () => {
    if (!hasEverBeenSaved.current) {
      fetch("http://127.0.0.1:5000/add_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.current,
          date: new Date().toISOString(),
          content: content.current,
        }),
      }).then(async (response) => {
        if (response.status === 201) {
          hasEverBeenSaved.current = true;
          console.log("success!");
        } else {
          console.error("problem");
        }
      });
    }

    if (lastSavedRef.current) {
      lastSavedRef.current.innerText = `Last saved at ${new Date().toDateString()}`;
    }

    pendingUpdate.current = false;
  };

  return (
    <div id={styles.writeContent} className={font.className}>
      <input
        id="new-title"
        placeholder="New note"
        onChange={handleTitleChange}
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
