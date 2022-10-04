import { Anchor, Badge, Button, Box, Group, Tabs, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./Default.module.scss";

/* Main */
const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles["app-container"]}>
    <Header />
    <div className={styles["child-wrap"]}>{children}</div>
    <Footer />
  </div>
);
export default DefaultLayout;

/* Header */
function Header() {
  return (
    <div className={styles["header"]}>
      <Group style={{ alignItems: "baseline" }}>
        <Text className={styles["header-title"]}>MathTestBuilder</Text>
        <Badge
          color="gray"
          size="md"
          style={{ color: "inherit", textTransform: "none" }}
        >
          v0.1.beta
        </Badge>
      </Group>
      <Box pt="xs">
        <HeaderTopRow />
        <HeaderBottomRow />
      </Box>
    </div>
  );
}

function HeaderTopRow() {
  return (
    <Button.Group className={styles["header-top"]}>
      <HeaderTopButton label="log in" href="/auth" />
    </Button.Group>
  );
}

function HeaderTopButton({ label, href }: { label: string; href: string }) {
  return (
    <Button
      variant="subtle"
      color="dimmed"
      component={NextLink}
      href={href}
      className={styles["header-btn"]}
      disabled
    >
      {label}
    </Button>
  );
}

function HeaderBottomRow() {
  const router = useRouter();

  return (
    <Tabs
      value={router.asPath}
      onTabChange={(value: string) => router.push(value)}
      variant="default"
    >
      <Tabs.List>
        <HeaderBottomButton label="Home" href="/" />
        <HeaderBottomButton label="Questions" href="/questions" />
        <HeaderBottomButton label="Tests" href="/tests" />
      </Tabs.List>
    </Tabs>
  );
}

function HeaderBottomButton({ label, href }: { label: string; href: string }) {
  return (
    <Tabs.Tab
      value={href}
      color="dimmed"
      className={classNames(styles["header-btn"], styles["header-bot-btn"])}
    >
      {label}
    </Tabs.Tab>
  );
}

/* Footer */
function Footer() {
  return (
    <footer className={styles["footer"]}>
      <span>2022 Donghee Nam | </span>
      <Anchor
        href="https://github.com/dongheenam/math-test-builder"
        target="_blank"
      >
        Github
      </Anchor>
      <span> | </span>
      <Anchor href="https://twitter.com/codeforteaching" target="_blank">
        Twitter
      </Anchor>
    </footer>
  );
}
