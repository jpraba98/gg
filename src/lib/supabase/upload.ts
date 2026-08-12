import { createClient } from "@/lib/supabase/client";

/** Uploads to the public article-covers bucket. Returns null if unavailable or it fails. */
export async function uploadArticleImage(file: File): Promise<string | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("article-covers").upload(path, file, {
    upsert: false,
    contentType: file.type,
  });
  if (error) {
    console.error("Image upload failed:", error);
    return null;
  }

  const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
  return data.publicUrl;
}
