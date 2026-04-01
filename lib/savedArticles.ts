import { supabase } from "./supabase";

/**
 * Syncs saved articles between local state and Supabase user_saves table.
 *
 * Required Supabase SQL to create the table:
 *
 * CREATE TABLE user_saves (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
 *   article_id TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
 *   UNIQUE(user_id, article_id)
 * );
 *
 * ALTER TABLE user_saves ENABLE ROW LEVEL SECURITY;
 *
 * CREATE POLICY "Users can view their own saves"
 *   ON user_saves FOR SELECT USING (auth.uid() = user_id);
 *
 * CREATE POLICY "Users can insert their own saves"
 *   ON user_saves FOR INSERT WITH CHECK (auth.uid() = user_id);
 *
 * CREATE POLICY "Users can delete their own saves"
 *   ON user_saves FOR DELETE USING (auth.uid() = user_id);
 */

export async function fetchSavedArticleIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_saves")
    .select("article_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to fetch saved articles:", error.message);
    return [];
  }

  return data.map((row: { article_id: string }) => row.article_id);
}

export async function addSaveToDb(
  userId: string,
  articleId: string
): Promise<boolean> {
  const { error } = await supabase
    .from("user_saves")
    .upsert({ user_id: userId, article_id: articleId }, { onConflict: "user_id,article_id" });

  if (error) {
    console.error("Failed to save article:", error.message);
    return false;
  }
  return true;
}

export async function removeSaveFromDb(
  userId: string,
  articleId: string
): Promise<boolean> {
  const { error } = await supabase
    .from("user_saves")
    .delete()
    .eq("user_id", userId)
    .eq("article_id", articleId);

  if (error) {
    console.error("Failed to remove saved article:", error.message);
    return false;
  }
  return true;
}
