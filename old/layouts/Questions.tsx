import { NavLink, Space } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Bucket from "questions/Bucket";
import { useRouter } from "next/router";

import styles from "./Questions.module.scss";

const QuestionsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles["q-container"]}>
    <NavBar />
    <main className={styles["main"]}>{children}</main>
    <aside className={styles["sidebar"]}>
      <></>
    </aside>
  </div>
);
export default QuestionsLayout;

function NavBar() {
  return (
    <div className={styles["navbar-container"]}>
      <nav className={styles["navbar"]}>
        <MyTitle label="navigate" />
        <MyLink label="Browse Questions" href="/questions" />
        <MyLink label="New Question" href="/questions/new" disabled />
        <MyLink label="My Questions" href="/user/questions" disabled />
        <MyTitle label="bucket" />
        <Space h="sm" />
        <Bucket />
      </nav>
    </div>
  );
}

function MyTitle({ label }: { label: string }) {
  return (
    <NavLink
      component="div"
      label={label}
      styles={{
        label: { fontSize: "1rem", fontVariant: "small-caps", fontWeight: 600 },
      }}
      disabled
    />
  );
}

function MyLink({
  label,
  href,
  disabled = false,
}: {
  label: string;
  href: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const active = router.asPath === href;

  return (
    <NavLink
      className={styles["navbar-link"]}
      label={label}
      component={NextLink}
      href={href}
      active={active}
      disabled={disabled}
    />
  );
}
