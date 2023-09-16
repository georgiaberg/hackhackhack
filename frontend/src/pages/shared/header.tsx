import Head from "next/head";
import styles from "@/styles/main.module.scss";

export enum TabSelection {
  read,
  write,
  reflect,
}

interface Props {
  currentTab: TabSelection;
  setCurrentTab: (newTab: TabSelection) => void;
}

export const Header: React.FC<Props> = ({ currentTab, setCurrentTab }) => {
  return (
    <>
      <Head>
        <title>Epimetheus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav id={styles.nav}>
        <ul>
          <NavBarButton
            name="Read"
            tab={TabSelection.read}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <NavBarButton
            name="Write"
            tab={TabSelection.write}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <NavBarButton
            name="Reflect"
            tab={TabSelection.reflect}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </ul>
      </nav>
    </>
  );
};

const NavBarButton: React.FC<{
  name: string;
  tab: TabSelection;
  currentTab: TabSelection;
  setCurrentTab: (newTab: TabSelection) => void;
}> = ({ tab, currentTab, setCurrentTab, name }) => (
  <li className={`${tab === currentTab ? "active" : ""}`}>
    <a onClick={() => setCurrentTab(tab)}>{name}</a>
  </li>
);
