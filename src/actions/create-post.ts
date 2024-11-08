"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";
import { postSchema } from "./schemas";
import { z } from "zod";
import { slugify } from "../../utils/slugify";
import { uploadImage } from "../../utils/supabase/upload-image";

const serverPostSchema = postSchema.extend({
  image: z
    .union([
      z.instanceof(Blob).refine((blob) => blob instanceof File, {
        message: "Image must be a File",
      }),
      z.undefined(),
    ])
    .optional(),
});

export type CreatePostResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export const createPost = async (
  formData: FormData
): Promise<CreatePostResponse> => {
  try {
    // Validate the data
    const validationResult = serverPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      image: formData.get("image") || undefined,
    });

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return { success: false, error: "Invalid input data" };
    }

    const validatedData = validationResult.data;

    // Generate a unique slug
    const baseSlug = slugify(validatedData.title);
    const timestamp = Date.now();
    const uniqueSlug = `${baseSlug}-${timestamp}`;

    // Initialize Supabase client
    const supabase = createClient();

    // Retrieve authenticated user data
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("User retrieval error:", userError);
      return { success: false, error: "Error retrieving user data" };
    }
    if (!user || !user.email) {
      console.error("User not authenticated or email not found");
      return {
        success: false,
        error: "You must be logged in with a valid email to create a post",
      };
    }

    let imagePublicUrl = null;
    if (validatedData.image && validatedData.image instanceof File) {
      imagePublicUrl = await uploadImage(validatedData.image);
    }

    // Fetch the user's ID from the users table
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("id")
      .eq("email", user.email)
      .single();

    if (userDataError || !userData) {
      console.error("Error fetching user data:", userDataError);
      return { success: false, error: "Failed to retrieve user information" };
    }

    // Insert new post into the database
    const { error: postError } = await supabase.from("posts").insert({
      title: validatedData.title,
      content: validatedData.content,
      image: imagePublicUrl,
      slug: uniqueSlug,
      user_id: userData.id,
    });

    if (postError) {
      console.error("Error inserting post:", postError);
      if (
        postError.message &&
        postError.message.includes(
          "duplicate key value violates unique constraint"
        )
      ) {
        return { success: false, error: "Title already exists" };
      }
      return { success: false, error: "Failed to create post" };
    }

    revalidatePath("/");
    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};
