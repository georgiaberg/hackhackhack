"use client";

import React from "react";
import "react-quill/dist/quill.snow.css";
import styles from "./reflect-detail.module.scss";

const ReflectDetailContent: React.FC<{}> = () => {
  return (
    <div id={styles.reflectDetailBody}>
      <div className="card">
        <p>
          Throughout the last week, you spent a lot of time looking toward the
          future.
        </p>
        <p>You focused most on those around you.</p>
        <div className="quotations">
          <Quotation>
            I can&apos;t wait for my friends and I to go on wonderful adventures.
          </Quotation>
          <Quotation>
            When we go to the beach, my group will rent an AirBnB.
          </Quotation>
          <Quotation>
            If I get to join the Mars mission, I&apos;m bringing Alex with me.
          </Quotation>
        </div>
        <div className="buttons">
        </div>
      </div>
    </div>
  );
};

export default ReflectDetailContent;

const Quotation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="quotation">{children}</div>;
};
