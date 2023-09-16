import Image from "next/image";
import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div id={styles.footer}>
      <Image id="inner-footer" src="/title-logo.png" alt="" width={180} height={50}></Image>
      <div id="footer-shadow"></div>
    </div>
  );
};
