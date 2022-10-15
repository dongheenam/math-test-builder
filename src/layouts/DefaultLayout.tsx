import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

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
          <button className={styles.TopBtn} data-disabled="true">
            log in
          </button>
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
        <NavItem href="/">Home</NavItem>
        <NavItem href="/questions">Questions</NavItem>
        <NavItem href="/tests" disabled>
          Tests
        </NavItem>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

function NavItem({
  href,
  children,
  disabled = false,
}: {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const router = useRouter();

  return (
    <NavigationMenu.Item className={styles.BottomBtn}>
      <Link href={href} passHref>
        <NavigationMenu.Link
          className={styles.BottomLink}
          active={!disabled && href === router.asPath}
          data-disabled={disabled}
        >
          {children}
        </NavigationMenu.Link>
      </Link>
    </NavigationMenu.Item>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span>2022 Donghee Nam | </span>
      <a href="https://github.com/dongheenam/math-test-builder" target="_blank">
        Source
      </a>
      <span> | </span>
      <a href="https://twitter.com/codeforteaching" target="_blank">
        Twitter
      </a>
    </footer>
  );
}
