"use client";

import styles from "./read.module.scss";
import { Note } from "@/types/types";
import React from "react";
import { Newsreader } from "next/font/google";

const MAX_CARD_CONTENT_LENGTH = 400;

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const ReadContent: React.FC<{}> = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get_notes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const json = await response.json();
      setNotes(json.notes);
    });
  }, [setNotes]);

  return (
    <div className={font.className} id={styles.noteCards}>
      <div id="notes-list-inner">
        {notes.map((note) => (
          <NoteCard note={note} key={note.date} />
        ))}
      </div>
    </div>
  );
};
export default ReadContent;

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  const content =
    note.content.length > MAX_CARD_CONTENT_LENGTH
      ? note.content.substring(0, MAX_CARD_CONTENT_LENGTH) + "..."
      : note.content;

  const date = new Date(note.date);

  return (
    <div className={styles.readCard}>
      <div className={"title-row"}>
        <h1 className="title">{note.title}</h1>
        <span className="date">{date.toDateString()}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
};
