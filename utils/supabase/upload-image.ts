import { createClient } from "./server";
import { v4 as uuid } from "uuid";

export const uploadImage = async (image: File) => {
  const supabase = createClient();

  const imageName = image.name.split(".");
  const path = `${imageName[0]}-${uuid()}.${imageName[1]}`;
};
