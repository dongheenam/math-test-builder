import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import useSession from "common/hooks/useSession";
import { Anchor } from "common/components";

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
        <div className={styles.headerUserStatus}>
          <HeaderUserStatus />
        </div>
        <HeaderNav />
      </div>
    </div>
  );
}

function HeaderUserStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error fetching user info!</span>;
  }

  if (session) {
    return (
      <>
        <Link href="/user" passHref>
          <a>{session.user?.name}</a>
        </Link>{" "}
        <Link href="/api/auth/signout" passHref>
          <a>(log out)</a>
        </Link>
      </>
    );
  } else {
    return (
      <Link href="/api/auth/signin" passHref>
        <a>log in</a>
      </Link>
    );
  }
}

function HeaderNav() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={styles.headerNav}>
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
    <NavigationMenu.Item>
      <Link href={href} passHref>
        <NavigationMenu.Link
          className={styles.headerNavLink}
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
      <Anchor href="https://github.com/dongheenam/math-test-builder" blank>
        Source
      </Anchor>
      <span> | </span>
      <Anchor href="https://twitter.com/codeforteaching" blank>
        Twitter
      </Anchor>
    </footer>
  );
}
