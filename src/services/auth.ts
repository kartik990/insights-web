import BaseQuery from ".";

export async function login(credentials: { email: string; password: string }) {
  const res = BaseQuery.post("/api/auth/login", credentials);
  return res;
}

export async function signup(credentials: {
  name: string;
  email: string;
  password: string;
}) {
  const res = BaseQuery.post("/api/auth/signup", credentials);
  return res;
}
