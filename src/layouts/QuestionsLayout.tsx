import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

// Bucket is persisted in local storage
const Bucket = dynamic(() => import("questions/Bucket"), {
  ssr: false,
});

import styles from "./QuestionsLayout.module.scss";

/* Main */
export default function QuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      <NavBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

function NavBar() {
  return (
    <aside className={styles.navbarBox}>
      <nav className={styles.navbar}>
        <NavTitle title="navigate" />
        <ul className={styles.navList}>
          <NavItem label="Browse Questions" href="/questions" />
          <NavItem label="New Question" href="/questions/new" />
          <NavItem label="My Questions" href="/user/questions" />
        </ul>
        <NavTitle title="bucket" />
        <Bucket />
      </nav>
    </aside>
  );
}

function NavTitle({ title }: { title: string }) {
  return <div className={styles.navTitle}>{title}</div>;
}

function NavItem({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <li
      data-active={href === router.asPath}
      className={styles.navItem}
      // TODO: remove as we build new pages
      data-disabled="true"
    >
      <Link href={href}>{label}</Link>
    </li>
  );
}
