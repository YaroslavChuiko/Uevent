import bcrypt from 'bcrypt';

const comparePasswords = async (password: string, original: string) => {
  return await bcrypt.compare(password, original);
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export { comparePasswords, hashPassword };

