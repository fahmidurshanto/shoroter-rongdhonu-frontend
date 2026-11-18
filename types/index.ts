export type ContentType = 'poem' | 'theatre' | 'article' | 'thought';

export interface Post {
  _id: string;
  title: string;
  content: string;
  contentType?: ContentType;
  featuredImage?: string;
  audioUrl?: string;
  tags?: string[];
  isDraft: boolean;
  isFeatured?: boolean;
  viewsCount?: number;
  likesCount?: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostsResponse {
  posts: Post[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

export interface Comment {
  _id: string;
  post: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  isApproved?: boolean;
  createdAt: string;
}

export interface ReaderMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserState {
  isAuthenticated: boolean;
  token: string | null;
}
