import { Anchor, Button, Box, Tabs, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./Default.module.scss";

/* Main */
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["app-container"]}>
      <Header />
      <div className={styles["child-wrap"]}>{children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout;

/* Header */
const Header = () => {
  return (
    <div className={styles["header"]}>
      <Text className={styles["header-title"]}>MathTestBuilder</Text>
      <Box pt="xs">
        <HeaderTopRow />
        <HeaderBottomRow />
      </Box>
    </div>
  );
};

const HeaderTopRow = () => {
  return (
    <Button.Group className={styles["header-top"]}>
      <HeaderTopButton label="log in" href="/auth" />
    </Button.Group>
  );
};

const HeaderTopButton = ({ label, href }: { label: string; href: string }) => {
  return (
    <Button
      variant="subtle"
      component={NextLink}
      href={href}
      className={styles["header-btn"]}
    >
      {label}
    </Button>
  );
};

const HeaderBottomRow = () => {
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
};

const HeaderBottomButton = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <Tabs.Tab
      value={href}
      className={classNames(styles["header-btn"], styles["header-bot-btn"])}
    >
      {label}
    </Tabs.Tab>
  );
};

/* Footer */
const Footer = () => {
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
};
