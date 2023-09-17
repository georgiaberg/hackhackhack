"use client";

import styles from "./read.module.scss";
import { Note } from "@/types/types";
import React from "react";
import { Newsreader } from "next/font/google";

const MAX_CARD_CONTENT_LENGTH = 400;

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const ReadContent: React.FC<{}> = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [deletedNotes, setDeletedNotes] = React.useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  const pushToDeletedNotes = (note: Note) => {
    setDeletedNotes(deletedNotes.concat(note));
  };

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
        {notes
          .sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .filter((note) => !deletedNotes.includes(note))
          .map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onClick={() => setSelectedNote(note)}
            />
          ))}
      </div>
      {selectedNote ? (
        <Modal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          pushToDeletedNotes={pushToDeletedNotes}
        />
      ) : null}
    </div>
  );
};
export default ReadContent;

const NoteCard: React.FC<{ note: Note; onClick: () => void }> = ({
  note,
  onClick,
}) => {
  const content =
    note.content.length > MAX_CARD_CONTENT_LENGTH
      ? note.content.substring(0, MAX_CARD_CONTENT_LENGTH) + "..."
      : note.content;

  const date = new Date(note.date);

  return (
    <div className={styles.readCard} onClick={onClick}>
      <div className={"title-row"}>
        <h1 className="title">{note.title}</h1>
        <span className="date">{date.toDateString()}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} id="content"></div>
    </div>
  );
};

const Modal: React.FC<{
  note: Note;
  onClose: () => void;
  pushToDeletedNotes: (newNote: Note) => void;
}> = ({ note, onClose, pushToDeletedNotes }) => {
  const onDelete = () => {
    fetch("http://127.0.0.1:5000/delete_note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: note.id }),
    });
    onClose();
    pushToDeletedNotes(note);
  };

  return (
    <div id={styles.readNoteModal}>
      <h1>{note.title}</h1>
      <span>{new Date(note.date).toDateString()}</span>
      <div id="modal-operations">
        <span id="modal-delete-btn" onClick={onDelete}>
          Delete
        </span>
        <span id="modal-close-btn" onClick={onClose}>
          Close
        </span>
      </div>
      <div
        id="modal-content"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>
    </div>
  );
};
