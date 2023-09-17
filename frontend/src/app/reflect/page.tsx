"use client";

import React from "react";
import styles from "./reflect.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const ReflectContent: React.FC<{}> = () => {
  return (
    <div id={styles.reflectContent} className={font.className}>
      <ReflectionSection title="Relationships" />
    </div>
  );
};

const ReflectionSection: React.FC<{ title: string }> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default ReflectContent;
