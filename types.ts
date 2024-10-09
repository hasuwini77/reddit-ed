export interface PostProps {
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