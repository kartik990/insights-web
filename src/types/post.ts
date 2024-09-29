export interface PostInterface {
  id: number;
  title: string;
  content: string;
  imgUrl: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  upLikes: number;
  downLikes: number;
  user?: {
    id?: string;
    name?: string;
    profileUrl?: string;
  };
  postInteractions: { userId: number; liked: boolean }[];
}

export type CreatePostPayload = {
  title: string;
  content: string;
  imgUrl: string[];
  userId: string;
};

export type InteractionPayload = {
  postId: string;
  userId: string;
  type: "like" | "unlike";
};

export type AddCommentPayload = {
  postId: number;
  userId: number;
  comment: string;
};

export interface Comment {
  createdAt: string;
  text: string;
  user: {
    id: number;
    email: string;
    name: string;
    profileUrl: string;
  };
}
