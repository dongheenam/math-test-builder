import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { IconHome, IconSearch, IconLogin } from "@tabler/icons";

import styles from "./Layout.module.css";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <span className={styles["header-title"]}>Test Builder</span>
      <div style={{ flexGrow: 1 }}></div>
      <Tooltip label="Home" openDelay={100}>
        <ActionIcon variant="default" size="lg">
          <IconHome stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Questions" openDelay={100}>
        <ActionIcon variant="default" size="lg">
          <IconSearch stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Log in" openDelay={100}>
        <ActionIcon variant="default" size="lg">
          <IconLogin stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

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

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["app-container"]}>
      <Header />
      <div className={styles["page-wrap"]}>{children}</div>
      <Footer />
    </div>
  );
};
