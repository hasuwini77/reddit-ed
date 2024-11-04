export interface UserType {
  id: string;
  username: string;
  email: string;
  avatar?: string | null;
}
export interface PostType {
  id: string;
  title: string;
  slug: string;
  content: string;
  user_id: string;
  users: {
    username: string;
    email: string;
  };
  comments?: CommentType[];
}

export interface PostProps {
  id: string;
  title: string;
  image: string;
  content: string;
  comments: string | number;
}
export interface PostFormProps {
  onSubmit: (formData: {
    title: string;
    image: string;
    content: string;
  }) => void;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: {
    id: string;
    username: string;
    avatar: string | null;
  };
}

export interface CommentType {
  id: string;
  content: string;
  created_at: string;
  users: {
    username: string;
    id: string;
    email: string;
    avatar: string | null;
  };
}
