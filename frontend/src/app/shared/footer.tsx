import Image from "next/image";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div id={styles.footer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="inner-footer" src="/title-logo.png" alt=""></img>
      <div id="footer-shadow"></div>
    </div>
  );
};
