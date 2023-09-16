import { Scheherazade_New } from "next/font/google";
import styles from "@/styles/main.module.scss";
import { Header, TabSelection } from "./shared/header";
import React from "react";
import { ReadContent } from "./tab-bodies/read-content";
import { ReflectContent } from "./tab-bodies/reflect-content";
import { WriteContent } from "./tab-bodies/write-content";

const font = Scheherazade_New({ weight: "700", subsets: ["latin"] });

export default function Home() {
  const [currentTab, setCurrentTab] = React.useState<TabSelection>(
    TabSelection.read
  );

  return (
    <>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className={`${styles.main} ${font.className}`}>
        <Content currentTab={currentTab} />
      </main>
    </>
  );
}

const Content: React.FC<{ currentTab: TabSelection }> = ({ currentTab }) => {
  switch (currentTab) {
    case TabSelection.read:
      return <ReadContent />;
    case TabSelection.write:
      return <WriteContent />;
    case TabSelection.reflect:
      return <ReflectContent />;
  }
};
