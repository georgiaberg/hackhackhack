"use client";

import React from "react";
import styles from "./reflect.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { Note } from "@/types/types";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

const getImageSources = () => {
  const source1 = Math.floor(Math.random() * 6);
  const source2 = (source1 + Math.floor(Math.random() * 5)) % 6;

  const getImageSourceByNumber = (n: number): string => {
    switch (n) {
      case 0:
        return "./brain.png";
      case 1:
        return "./globe.png";
      case 2:
        return "./heart.png";
      case 3:
        return "./nuclear.png";
      case 4:
        return "./star.png";
      case 5:
      default:
        return "./todo.png";
    }
  };

  return [source1, source2].map(getImageSourceByNumber);
};

export const ReflectContent: React.FC<{}> = () => {
  const [summary, setSummary] = React.useState<string>("");
  const [questions, setQuestions] = React.useState<string[]>([]);
  const [imageSources] = React.useState(getImageSources());

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/get_notes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const notes: Note[] = (await response.json()).notes;

      fetch("http://127.0.0.1:5000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notes }),
      }).then(async (response) => {
        const json = await response.json();

        setQuestions(json.questions);
        setSummary(json.summary);
      });
    });
  }, [setSummary]);

  return (
    <div id={styles.reflectContent} className={font.className}>
      <ReflectionSection
        summary={summary}
        questions={questions}
        icon={imageSources[0]}
      />
      <ReflectionSection
        summary={summary}
        questions={questions}
        flipped
        icon={imageSources[1]}
      />
    </div>
  );
};

const ReflectionSection: React.FC<{
  summary: string;
  questions: string[];
  icon: string;
  flipped?: boolean;
}> = ({ summary, questions, icon, flipped }) => {
  return (
    <div
      className={styles.reflectionSection + " " + (flipped ? "flipped" : "")}
    >
      <div className="icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt=""></img>
      </div>
      <div className="description">
        <h1>Your past week</h1>
        <p>{summary} </p>
        <div className="conclusion">
          <div className="conclusion-text">
            <span className="conclusion-type">Key questions</span>
            <ul>
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </div>
          <div className="conclusion-button-container">
            <Link href="/write" className="journal-button">
              <span>Journal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectContent;
