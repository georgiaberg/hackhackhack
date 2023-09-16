import Head from "next/head";
import styles from "./nav.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Scheherazade_New } from "next/font/google";

const font = Scheherazade_New({ weight: "700", subsets: ["latin"] });

export const Nav: React.FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Epimetheus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav id={styles.nav} className={font.className}>
        <ul>
          <NavBarButton name="Read" href="/read" />
          <NavBarButton name="Write" href="/write" />
          <NavBarButton name="Reflect" href="/reflect" />
        </ul>
      </nav>
    </>
  );
};

const NavBarButton: React.FC<{
  name: string;
  href: string;
}> = ({ href, name }) => {
  const pathname = usePathname();

  return (
    <li
      className={`${
        pathname.includes(href) || (href.includes("read") && pathname === "/")
          ? "active"
          : ""
      }`}
    >
      <Link href={href}>{name}</Link>
    </li>
  );
};
