import { getServerSession, Session } from "next-auth";

import options from "./option";

export const GetSession = async (): Promise<Session | null> => {
  const session = await getServerSession(options);
  return session;
};
