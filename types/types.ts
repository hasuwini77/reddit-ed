export interface PostProps {
  id: number;
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

export type PostType = {
  comments: string | number;
  id: number;
  title: string;
  slug: string;
  content: string;
  user_id: string;
  users: {
    email: string;
  };
};

// types/types.ts
export type UserType = {
  id: string;
  username: string;
  avatar: string | null;
};
