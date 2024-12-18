import {
  AddCommentPayload,
  CreatePostPayload,
  InteractionPayload,
} from "@/types/post";
import BaseQuery from ".";

export async function getAllPosts() {
  const res = BaseQuery.get("/api/post");
  return res;
}

export async function createPost(payload: CreatePostPayload) {
  const res = BaseQuery.post(`/api/post/`, payload);
  return res;
}

export async function postInteraction(payload: InteractionPayload) {
  const res = BaseQuery.put(`/api/post/interaction`, payload);
  return res;
}

export async function addComment(payload: AddCommentPayload) {
  const res = BaseQuery.post(`/api/post/comment`, payload);
  return res;
}

export async function getComments(postId: number) {
  const res = BaseQuery.get(`/api/post/${postId}/comment`);

  return res;
}
