import { NavLink, Box } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import classNames from "classnames";

import styles from "./Questions.module.scss";

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

const NavBar = () => (
  <div className={styles["navbar-container"]}>
    <nav className={styles["navbar"]}>
      <MyTitle label="questions" />
      <MyLink label="Browse Questions" href="/questions" />
      <MyLink label="New Question" href="/questions/new" disabled />
      <MyLink label="My Questions" href="/user/questions" disabled />
    </nav>
  </div>
);

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

const MyLink = ({
  label,
  href,
  disabled = false,
}: {
  label: string;
  href: string;
  disabled?: boolean;
}) => {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <NavLink
      className={classNames(styles["navbar-link"], active && styles["active"])}
      label={label}
      component={NextLink}
      href={href}
      active={active}
      disabled={disabled}
    />
  );
};
