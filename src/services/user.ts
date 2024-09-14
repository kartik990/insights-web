import BaseQuery from ".";

export async function getAllUsers() {
  const res = BaseQuery.get("/api/user", { withCredentials: true });
  return res;
}
