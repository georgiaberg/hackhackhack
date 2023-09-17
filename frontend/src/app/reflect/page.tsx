"use client";

import React from "react";
import styles from "./reflect.module.scss";
import { Newsreader } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import Link from "next/link";

const font = Newsreader({ weight: ["300", "400"], subsets: ["latin"] });

export const ReflectContent: React.FC<{}> = () => {
  return <div id={styles.reflectContent} className={font.className}>
    <ReflectionSection name="Relationships"/>
    <ReflectionSection name="You"/>
    <ReflectionSection name="World"/>
  </div>;
};

const ReflectionSection: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Link className="reflection-button" href="/reflect/detail">
      <span>{name}</span>
    </Link>
  );
};

export default ReflectContent;
