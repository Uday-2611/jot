"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml"; // html
import json from "highlight.js/lib/languages/json";
import "tippy.js/dist/tippy.css";
import tippy from "tippy.js";
import { createRoot } from "react-dom/client";

const lowlight = createLowlight();
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);
lowlight.register("css", css);
lowlight.register("html", xml);
lowlight.register("xml", xml);
lowlight.register("json", json);

// Slash command items
const getSlashItems = (editor) => [
  { title: "Heading 1", run: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
  { title: "Heading 2", run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
  { title: "Heading 3", run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
  { title: "Heading 4", run: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
  { title: "Heading 5", run: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
  { title: "Heading 6", run: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
  { title: "Bulleted list", run: () => editor.chain().focus().toggleBulletList().run() },
  { title: "Numbered list", run: () => editor.chain().focus().toggleOrderedList().run() },
  { title: "Code block", run: () => editor.chain().focus().toggleCodeBlock().run() },
  { title: "Blockquote", run: () => editor.chain().focus().toggleBlockquote().run() },
  { title: "Highlight", run: () => editor.chain().focus().toggleHighlight().run() },
  {
    title: "Image (by URL)",
    run: () => {
      const url = window.prompt("Enter image URL");
      if (url) editor.chain().focus().setImage({ src: url }).run();
    },
  },
];

// Slash command UI
const CommandList = ({ items, command, selectedIndex }) => (
  <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg p-1 min-w-56">
    {items.length ? (
      items.map((item, index) => (
        <button
          key={index}
          className={`w-full text-left px-3 py-2 rounded-lg hover:bg-accent/60 ${
            index === selectedIndex ? "bg-accent/60" : ""
          }`}
          onClick={() => command(item)}
        >
          {item.title}
        </button>
      ))
    ) : (
      <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
    )}
  </div>
);

// Slash command extension
const SlashCommand = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }) => {
          editor.chain().focus().deleteRange(range).run();
          props.run();
        },
      },
    };
  },
  addProseMirrorPlugins() {
    if (typeof window === "undefined") return []; // Prevent SSR crash
    const editor = this.editor;
    return [
      Suggestion({
        editor,
        ...this.options.suggestion,
        items: ({ query }) => {
          const all = getSlashItems(editor);
          if (!query) return all;
          return all.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
        },
        render: () => {
          let component;
          let popup;
          let root;
          return {
            onStart: (props) => {
              component = document.createElement("div");
              document.body.appendChild(component);
              root = createRoot(component);
              root.render(
                React.createElement(CommandList, {
                  items: props.items,
                  command: (item) => props.command(item),
                  selectedIndex: props.selectedIndex,
                })
              );
              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              })[0];
            },
            onUpdate(props) {
              root?.render(
                React.createElement(CommandList, {
                  items: props.items,
                  command: (item) => props.command(item),
                  selectedIndex: props.selectedIndex,
                })
              );
              popup?.setProps({ getReferenceClientRect: props.clientRect });
            },
            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup?.hide();
                return true;
              }
              return false;
            },
            onExit() {
              popup?.destroy();
              root?.unmount();
              component?.remove();
            },
          };
        },
      }),
    ];
  },
});

export default function Editor({ content, onUpdate }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Highlight,
      Image,
      CodeBlockLowlight.configure({ lowlight }),
      SlashCommand,
    ],
    content: content || "<p>Start writing... Press / for commands.</p>",
    immediatelyRender: false, // Prevent SSR mismatch
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[60vh] p-4 bg-input/40 backdrop-blur-sm rounded-xl focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getJSON());
    },
  });

  if (!mounted || !editor) return null;

  return (
    <div className="w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
