import { useRouter } from "next/router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";

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
          <button className={styles.TopBtn}>log in</button>
        </div>
        <HeaderMenuBottom />
      </div>
    </div>
  );
}

function HeaderMenuBottom() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={styles.headerMenuBottom}>
        <NavigationMenu.Item className={styles.BottomBtn}>
          <NavigationMenu.Link className={styles.BottomLink}>
            Home
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles.BottomBtn}>
          <NavigationMenu.Link className={styles.BottomLink}>
            Questions
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item className={styles.BottomBtn}>
          <NavigationMenu.Link className={styles.BottomLink}>
            Tests
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
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
