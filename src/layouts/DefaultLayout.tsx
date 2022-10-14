import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./DefaultLayout.module.scss";

/* Main */
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

/* Header */
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <span className={styles.headerLogo}>MathTestBuilder</span>
        <span className={styles.headerVersion}>v0.1.beta</span>
      </div>
      <div className={styles.headerMenu}>
        <div className={styles.headerMenuTop}>
          <button>log in</button>
        </div>
        <div className={styles.headerMenuBottom}>
          <button>Home</button>
          <button>Questions</button>
          <button>Tests</button>
        </div>
      </div>
    </div>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span>2022 Donghee Nam | </span>
      <a href="https://github.com/dongheenam/math-test-builder" target="_blank">
        GitHub
      </a>
      <span> | </span>
      <a href="https://twitter.com/codeforteaching" target="_blank">
        Twitter
      </a>
    </footer>
  );
}
