"use client"

import styles from "./read.module.scss";
import { Note } from "@/types/types";
import React from "react";
import { Newsreader } from "next/font/google";

const MAX_CARD_CONTENT_LENGTH = 400;

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

const SampleData: Note[] = [
  {
    title: "Note 1",
    date: "today",
    content:
      "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black.",
  },
  {
    title: "Note 2",
    date: "yesterday",
    content:
      "I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side, he could even keep the ones he cared about from dying.",
  },
  {
    title: "call the schoolmaster",
    date: "1983",
    content:
      "good morning worm your honour the crown will plainly show the prisoner that now stands before you was caught pretending showing feelings. showing feelings of an almost human nature. this will not do...",
  },
  {
    title: "Note 4",
    date: "yesterday 2",
    content:
      "I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side, he could even keep the ones he cared about from dying. I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side, he could even keep the ones he cared about from dying. I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side, he could even keep the ones he cared about from dying.",
  },
];

export const ReadContent: React.FC<{}> = () => {
  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get_notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    }).then(async (response) => {
      console.log(await response.json());
    });
  }, []);

  return (
    <div className={font.className} id={styles.noteCards}>
      <div id="notes-list-inner">
        {SampleData.map((note) => (
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

  return (
    <div className={styles.readCard}>
      <div className={"title-row"}>
        <h1 className="title">{note.title}</h1>
        <span className="date">{note.date}</span>
      </div>
      <p>{content}</p>
    </div>
  );
};
