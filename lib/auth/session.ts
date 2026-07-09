import { getServerSession, User } from "next-auth"
import options from "./option"

export const GetUserSession = async (): Promise<User | undefined> => {
  const session = await getServerSession(options)
  return session?.user
}
