"use client";

import React from "react";
import styles from "./reflect.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const ReflectContent: React.FC<{}> = () => {
  return (
    <div id={styles.reflectContent} className={font.className}>
      <ReflectionSection title="Relationships" />
    </div>
  );
};

const ReflectionSection: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.reflectionSection}>
      <div className="icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placekitten.com/g/400/400" alt=""></img>
      </div>
      <div className="description">
        <h1>Relationships</h1>
        <p>Your relationships are on the rocks!</p>
        <p>
          In the past week, you have had a 147% increase in negative comments
          about your relationships.
        </p>
        <ul className="quotes">
          <li>I hate the way she cooks potatoes</li>
          <li>Potatoes!! Should be neither green!!! Nor meaty!!!</li>
        </ul>
        <div className="conclusion">
          <span className="conclusion-type">Opportunity for reflection</span>
          <span>Why do you think this pattern has emerged?</span>
          <button>Journal</button>
        </div>
      </div>
    </div>
  );
};

export default ReflectContent;
