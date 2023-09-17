"use client";

import React from "react";
import styles from "./write.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useSearchParams } from "next/navigation";
import { Note } from "@/types/types";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

const SAVE_DELAY = 3 * 1000;

export const WriteContent: React.FC<{}> = () => {
  const params = useSearchParams();

  const lastSavedRef = React.useRef<HTMLSpanElement>(null);

  const [title, setTitle] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [pendingUpdate, setPendingUpdate] = React.useState<boolean>(false);
  const noteId = React.useRef<string | null>(params.get("note"));

  const titleElement = React.useRef<HTMLInputElement>(null);
  const bodyElement = React.useRef<HTMLInputElement>(null);

  const [notes, setNotes] = React.useState<Note[]>([]);
  React.useEffect(() => {
    if (params.get("note")) {
      fetch("http://127.0.0.1:5000/get_notes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then(async (response) => {
        const json = await response.json();
        const editedNote = (json.notes as Note[]).find(
          (note: Note) => `${note.id}` === params.get("note")
        );

        if (editedNote) {
          setTitle(editedNote.title);
          setContent(editedNote.content);
        }
      });
    }
  }, [params, setNotes, setContent]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    tryStartingUpdateSequence();
  };

  const handleNoteUpdate = (value: string) => {
    setContent(value);
    tryStartingUpdateSequence();
  };

  const tryStartingUpdateSequence = () => {
    if (!pendingUpdate) {
      setPendingUpdate(true);

      if (lastSavedRef.current) {
        lastSavedRef.current.innerText = `Saving...`;
      }
    }
  };

  // actually sends the request updating the note
  const updateNote = React.useCallback(() => {
    if (!noteId.current) {
      fetch("http://127.0.0.1:5000/add_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          date: new Date().toISOString(),
          content: content,
        }),
      }).then(async (response) => {
        if (response.status === 201) {
          noteId.current = (await response.json()).note_id;
          console.log("successful post!");
        } else {
          console.error("problematic post");
        }
      });
    } else {
      fetch("http://127.0.0.1:5000/edit_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          date: new Date().toISOString(),
          content: content,
          id: noteId.current,
        }),
      }).then(async (response) => {
        if (response.status === 201) {
          console.log("successful edit!");
        } else {
          console.error("problematic edit");
        }
      });
    }

    if (lastSavedRef.current) {
      lastSavedRef.current.innerText = `Last saved at ${new Date().toDateString()}`;
    }

    setPendingUpdate(false);
  }, [title, content]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (pendingUpdate) {
      timeout = setTimeout(updateNote, SAVE_DELAY);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [title, content, pendingUpdate, updateNote]);

  return (
    <div id={styles.writeContent} className={font.className}>
      <input
        id="new-title"
        placeholder="New note"
        ref={titleElement}
        onChange={handleTitleChange}
        value={title}
      ></input>
      <div id="quill-container">
        <ReactQuill
          theme="snow"
          onChange={handleNoteUpdate}
          value={content}
        ></ReactQuill>
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
