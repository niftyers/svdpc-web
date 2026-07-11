import * as bcrypt from "bcrypt-ts";

export const HashWord = async (
  password: string,
  salt: number = 10
): Promise<string> => {
  return bcrypt.hash(password, salt);
};

export const HashVerify = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
