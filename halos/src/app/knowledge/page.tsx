"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, BookOpen, X, Tag } from "lucide-react";

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  source: string | null;
  tags: string;
  createdAt: string;
}

export default function KnowledgePage() {
  const [entries, setEntries] = useState<KnowledgeEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    fetch("/api/knowledge")
      .then((r) => r.json())
      .then(setEntries);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const res = await fetch("/api/knowledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
        source: source.trim() || null,
        tags: tags.trim(),
      }),
    });

    if (res.ok) {
      const entry = await res.json();
      setEntries([entry, ...entries]);
      setTitle("");
      setContent("");
      setSource("");
      setTags("");
      setShowAdd(false);
    }
  }

  async function handleDelete(id: string) {
    setEntries(entries.filter((e) => e.id !== id));
    await fetch(`/api/knowledge/${id}`, { method: "DELETE" });
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
        >
          <Plus size={16} />
          Add Entry
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 bg-white rounded-xl border border-gray-200 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm">New Knowledge Entry</h3>
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Source (optional)"
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma-separated)"
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            Save Entry
          </button>
        </form>
      )}

      {/* Entries */}
      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-accent shrink-0" />
                <h3 className="font-semibold text-sm">{entry.title}</h3>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {entry.content}
            </p>
            <div className="flex items-center gap-2 mt-3">
              {entry.source && (
                <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                  from: {entry.source}
                </span>
              )}
              {entry.tags &&
                entry.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs text-accent bg-accent-light px-2 py-0.5 rounded-full"
                  >
                    <Tag size={10} />
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-muted text-sm py-12">
            No knowledge entries yet. Add one to get started.
          </p>
        )}
      </div>
    </div>
  );
}
