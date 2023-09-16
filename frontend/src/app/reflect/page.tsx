"use client";

import React from "react";
import styles from "../read/read.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import Head from "next/head";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const WriteContent: React.FC<{}> = () => {
  return <div id={styles.reflectContent} className={font.className}></div>;
};

export default WriteContent;
