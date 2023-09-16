import React from "react";
import styles from "@/styles/main.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const WriteContent: React.FC<{}> = () => {
  const [title, setTitle] = React.useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div id={styles.writeContent} className={font.className}>
      <input
        id="new-title"
        value={title}
        placeholder="New note"
        onChange={handleInput}
      ></input>
      <ReactQuill theme="snow"></ReactQuill>
      <div>
        <span id={styles.lastSaved}>
          No changes found
        </span>
      </div>
    </div>
  );
};
