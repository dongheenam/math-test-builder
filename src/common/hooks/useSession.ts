import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRouter } from "next/router";

/** ref: https://github.com/nextauthjs/react-query */
export async function fetchSession() {
  const res = await fetch("/api/auth/session");
  const session = await res.json();
  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export type UseSessionProps = {
  required?: boolean;
  redirectTo?: string;
};

export default function useSession({
  required = false,
  redirectTo = "/api/auth/signin?error=SessionExpired",
}: UseSessionProps = {}) {
  const router = useRouter();
  const query = useQuery<Session>(["session"], fetchSession, {
    onSettled(data, _error) {
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
  return { data: query.data, status: query.status };
}
