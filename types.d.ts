export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
  // Other user properties
}
export type GetStaticPathsResult = Promise<{
  paths: { params: { id: string } }[];
  fallback: boolean;
}>;
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  description: string;
  sanitizedCategory: string;
  imageUrl?: string;
  videoUrl?: string;
  docSnapshot?: DocumentSnapshot<unknown>;
  data?: any;
}
