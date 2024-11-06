import { createClient } from "./server";
import { v4 as uuid } from "uuid";

export const uploadImage = async (image: File) => {
  const supabase = createClient();

  const fileExt = image.name.split(".").pop();
  const fileName = `${uuid()}.${fileExt}`;
  const filePath = `images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, image);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw new Error("Failed to upload image");
  }

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    console.error("Error getting public URL");
    throw new Error("Failed to get public URL for image");
  }

  return data.publicUrl;
};
