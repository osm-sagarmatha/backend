import bcrypt from "bcryptjs";

const generate = (password: string) => bcrypt.hash(password, 10);

const compare = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export default { generate, compare };
