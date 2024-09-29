import {
  AddCommentPayload,
  CommentRes,
  CreatePostPayload,
  InteractionPayload,
  PostInterface,
} from "@/types/post";
import BaseQuery from ".";

export async function getAllPosts() {
  const res = BaseQuery.get("/api/post");
  return res;
}

export async function createPost(payload: CreatePostPayload) {
  console.log(payload);

  const res = BaseQuery.post(`/api/post/`, payload);
  return res;
}

export async function postInteraction(payload: InteractionPayload) {
  console.log(payload);

  const res = BaseQuery.put(`/api/post/interaction`, payload);
  return res;
}

export async function addComment(payload: AddCommentPayload) {
  console.log(payload);

  const res = BaseQuery.post(`/api/post/comment`, payload);
  return res;
}

export async function getComments(postId: number) {
  const res = BaseQuery.get(`/api/post/${postId}/comment`);

  return res;
}
