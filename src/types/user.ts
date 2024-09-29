export type UpdateUserPayload = {
  profileUrl?: string;
  coverUrl?: string;
  about?: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  profileUrl?: string;
  coverUrl?: string;
};
