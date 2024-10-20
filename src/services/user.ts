import { UpdateUserPayload } from "@/types/user";
import BaseQuery from ".";

export async function getAllUsers() {
  const res = BaseQuery.get("/api/user");
  return res;
}

export async function getUser(userId: string) {
  const res = BaseQuery.get(`/api/user/${userId}`);
  return res;
}

export async function updateUser(userId: string, payload: UpdateUserPayload) {
  const res = BaseQuery.put(`/api/user/${userId}`, payload);
  return res;
}

export async function getChats(id: string) {
  if (!id) return Promise.reject();

  const res = BaseQuery.get(`/api/chat-room/${id}`);
  return res;
}

export async function createChatRoom(email1: string, email2: string) {
  const res = BaseQuery.post(`/api/chat-room/`, { email1, email2 });
  return res;
}

export async function getOldMessages(conversationId: number, page?: number) {
  const res = BaseQuery.get(
    `/api/chat-room/conversation/${conversationId}?page=${page || 1}`
  );
  return res;
}
