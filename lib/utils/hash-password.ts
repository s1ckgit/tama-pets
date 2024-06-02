import { genSaltSync, hashSync } from 'bcryptjs';

export const hashPassword = (password: string) => {
  const salt = genSaltSync();
  const hashedPass = hashSync(password, salt);
  return hashedPass;
};
