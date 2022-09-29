import { NavLink, Box } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";

import styles from "./Questions.module.css";

const MyTitle = ({ label }: { label: string }) => {
  return (
    <NavLink
      component="div"
      label={label}
      styles={{ label: { fontVariant: "small-caps", fontWeight: 600 } }}
      disabled
    />
  );
};

const MyLink = ({ label, href }: { label: string; href: string }) => {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <NavLink label={label} component={NextLink} href={href} active={active} />
  );
};

const NavBar = () => {
  return (
    <nav className={styles["navbar"]}>
      <MyTitle label="nagivate" />
      <Box className={styles["navbar-group"]}>
        <MyLink label="New Test" href="/create" />
        <MyLink label="Browse Tests" href="/tests" />
        <MyLink label="Browse Questions" href="/questions" />
      </Box>
      <MyTitle label="settings" />
      <Box className={styles["navbar-group"]}>
        <MyLink label="Account" href="/user" />
      </Box>
    </nav>
  );
};

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles["q-container"]}>
      <NavBar />
      <main className={styles["main"]}>{children}</main>
      <aside className={styles["sidebar"]}>
        <></>
      </aside>
    </div>
  );
};
export default QuestionsLayout;
