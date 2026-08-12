"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RichTextEditor } from "@/components/sections/staff/rich-text-editor";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slugify";
import { uploadArticleImage } from "@/lib/supabase/upload";

const CATEGORIES = [
  "Events",
  "Artist Features",
  "Industry Tips",
  "Press Releases",
  "Culture",
  "Behind the Scenes",
];

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  category: string;
  status: "draft" | "published";
  updated_at: string;
}

const emptyArticle: ArticleRow = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image_url: null,
  category: CATEGORIES[0],
  status: "draft",
  updated_at: "",
};

export function ArticleManager({ userId }: { userId: string }) {
  const supabase = createClient();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ArticleRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, body, cover_image_url, category, status, updated_at")
      .order("updated_at", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function togglePublish(article: ArticleRow) {
    if (!supabase) return;
    const nextStatus = article.status === "published" ? "draft" : "published";
    await supabase
      .from("articles")
      .update({
        status: nextStatus,
        published_at: nextStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", article.id);
    load();
  }

  async function handleDelete(article: ArticleRow) {
    if (!supabase) return;
    if (!window.confirm(`Delete "${article.title}"? This can't be undone.`)) return;
    await supabase.from("articles").delete().eq("id", article.id);
    load();
  }

  if (!supabase) {
    return <p className="text-sm text-text-secondary">Supabase isn&apos;t configured.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-white">Articles</h3>
        <Button
          size="sm"
          onClick={() => {
            setEditing(emptyArticle);
            setDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Article
        </Button>
      </div>

      {loading && <p className="mt-4 text-sm text-text-secondary">Loading...</p>}
      {!loading && articles.length === 0 && (
        <p className="mt-4 text-sm text-text-secondary">No articles yet.</p>
      )}

      <Card className="mt-4 divide-y divide-border p-0">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-white">{article.title}</p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    article.status === "published"
                      ? "bg-drip-500/20 text-drip-500"
                      : "bg-white/10 text-text-secondary"
                  }`}
                >
                  {article.status}
                </span>
              </div>
              <p className="text-xs text-text-secondary">{article.category}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditing(article);
                  setDialogOpen(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => togglePublish(article)}>
                {article.status === "published" ? (
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {article.status === "published" ? "Unpublish" : "Publish"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(article)} aria-label="Delete article">
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit Article" : "New Article"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <ArticleForm
              article={editing}
              userId={userId}
              onSaved={() => {
                setDialogOpen(false);
                load();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArticleForm({
  article,
  userId,
  onSaved,
}: {
  article: ArticleRow;
  userId: string;
  onSaved: () => void;
}) {
  const supabase = createClient();
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [slugTouched, setSlugTouched] = useState(!!article.id);
  const [excerpt, setExcerpt] = useState(article.excerpt ?? "");
  const [body, setBody] = useState(article.body ?? "");
  const [category, setCategory] = useState(article.category);
  const [coverUrl, setCoverUrl] = useState(article.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    const url = await uploadArticleImage(file);
    setUploading(false);
    if (url) setCoverUrl(url);
  }

  async function handleSave(status: "draft" | "published") {
    if (!supabase || !title.trim() || !slug.trim()) return;
    setSaving(true);
    setError(null);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      body,
      category,
      cover_image_url: coverUrl || null,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      author_id: userId,
    };

    const result = article.id
      ? await supabase.from("articles").update(payload).eq("id", article.id)
      : await supabase.from("articles").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    onSaved();
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));
              setSlugTouched(true);
            }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="min-h-[70px]"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cover">Cover Image</Label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="block w-full text-sm text-text-secondary file:mr-3 file:rounded-full file:border-0 file:bg-drip-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-obsidian"
          />
          {uploading && <p className="text-xs text-text-secondary">Uploading...</p>}
          {coverUrl && !uploading && <p className="truncate text-xs text-drip-500">{coverUrl}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Body</Label>
        <RichTextEditor content={body} onChange={setBody} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <Button onClick={() => handleSave("draft")} variant="outline" disabled={saving}>
          Save as Draft
        </Button>
        <Button onClick={() => handleSave("published")} disabled={saving}>
          {saving ? "Saving..." : "Publish"}
        </Button>
      </div>
    </div>
  );
}
