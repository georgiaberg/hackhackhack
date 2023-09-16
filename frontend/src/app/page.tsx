
import styles from "./page.module.scss";
import { Note } from "@/types/types";
import { Newsreader } from "next/font/google";

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
];

export const ReadContent: React.FC<{}> = () => {
  return (
    <div className={font.className} id={styles.noteCards}>
      {SampleData.map((note) => (
        <NoteCard note={note} key={note.date} />
      ))}
    </div>
  );
};
export default ReadContent;

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  return (
    <div className={styles.readCard}>
      <div className={"title-row"}>
        <h1 className="title">{note.title}</h1>
        <span className="date">{note.date}</span>
      </div>
      <p>{note.content}</p>
    </div>
  );
};
