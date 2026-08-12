"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import { Bold, Italic, Heading2, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { uploadArticleImage } from "@/lib/supabase/upload";

export function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), TiptapImage],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none min-h-[300px] text-white focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = window.prompt("URL");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const url = await uploadArticleImage(file);
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }

  const toolbarButtons = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading" },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet list" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Numbered list" },
    { icon: LinkIcon, action: addLink, active: editor.isActive("link"), label: "Link" },
    { icon: ImageIcon, action: () => fileInputRef.current?.click(), active: false, label: "Image" },
  ];

  return (
    <div className="rounded-lg border border-border bg-surface">
      <div className="flex flex-wrap gap-1 border-b border-border p-2">
        {toolbarButtons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={btn.action}
            aria-label={btn.label}
            className={cn(
              "rounded p-2 text-text-secondary hover:bg-white/10 hover:text-white",
              btn.active && "bg-drip-500/20 text-drip-500",
            )}
          >
            <btn.icon className="h-4 w-4" aria-hidden="true" />
          </button>
        ))}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelected}
        />
      </div>
      <EditorContent editor={editor} className="px-4 py-3" />
    </div>
  );
}
