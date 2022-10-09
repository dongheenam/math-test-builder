import type { NextPage } from "next";
import DefaultLayout from "./Default";
import QuestionsLayout from "./Questions";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// default layout (header and footer)
export const getDefaultLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

// layouts for questions/* (default + navbar)
export const getQuestionsLayout = (page: React.ReactElement) => {
  return (
    <DefaultLayout>
      <QuestionsLayout>{page}</QuestionsLayout>
    </DefaultLayout>
  );
};
