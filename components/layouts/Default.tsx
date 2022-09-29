import { ActionIcon, Anchor, Tooltip } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { TablerIcon, IconSearch, IconLogin } from "@tabler/icons";

import styles from "./Default.module.css";

/* Header */
const HeaderButton = ({
  icon,
  label,
  href,
}: {
  icon: TablerIcon;
  label: string;
  href: string;
}) => {
  const Icon = icon;
  return (
    <Tooltip label={label} openDelay={100}>
      <ActionIcon
        component={NextLink}
        href={href}
        variant="default"
        size="lg"
        sx={() => ({ backgroundColor: "transparent" })}
      >
        <Icon stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
};

const Header = () => {
  return (
    <div className={styles["header"]}>
      <span className={styles["header-title"]}>Test Builder</span>
      <div style={{ flexGrow: 1 }}></div>
      <HeaderButton icon={IconSearch} label="Questions" href="/questions" />
      <HeaderButton icon={IconLogin} label="Login" href="#" />
    </div>
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
