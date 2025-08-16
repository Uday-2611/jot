"use client";

import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
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
import { Plugin } from "prosemirror-state";

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
    {
        title: "Heading",
        type: "heading",
        subItems: [
            { title: "Heading 1", run: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
            { title: "Heading 2", run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
            { title: "Heading 3", run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
            { title: "Heading 4", run: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
            { title: "Heading 5", run: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
            { title: "Heading 6", run: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
        ]
    },
    { title: "Bulleted list", run: () => editor.chain().focus().toggleBulletList().run() },
    { title: "Numbered list", run: () => editor.chain().focus().toggleOrderedList().run() },
    { title: "Code block", run: () => editor.chain().focus().toggleCodeBlock().run() },
    { title: "Highlight", run: () => editor.chain().focus().toggleHighlight().run() },
];

// Slash command UI
const CommandList = ({ items, command, selectedIndex }) => (
    <div className="bg-card/90 rounded-lg p-3 min-w-64">
        {items.length ? (
            items.map((item, index) => (
                <div key={index} className="relative group">
                    {item.type === "heading" ? (
                        <div className="relative">
                            <button className={`w-full text-left text-xl px-4 py-3 rounded-md hover:bg-accent/60 ${index === selectedIndex ? "bg-accent/60" : ""
                                }`} onClick={() => command(item)} >
                                {item.title}
                            </button>

                            {/* Hover submenu for headings */}
                            <div className="absolute left-full top-0 ml-1 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg p-2 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                                {item.subItems.map((subItem, subIndex) => (
                                    <button key={subIndex} className="w-full text-left px-3 py-2.5 rounded-md hover:bg-accent/60 text-lg" onClick={() => command(subItem)} >
                                        {subItem.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <button className={`w-full text-left text-xl px-4 py-3 rounded-md hover:bg-accent/60 ${index === selectedIndex ? "bg-accent/60" : ""}`} onClick={() => command(item)} >
                            {item.title}
                        </button>
                    )}
                </div>
            ))
        ) : (
            <div className="px-3 py-2 text-base text-muted-foreground">No results</div>
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
                    // Handle both regular items and subItems
                    if (props.run) {
                        props.run();
                    } else if (props.subItems) {
                        // If it's a heading group, do nothing (just show submenu)
                        return;
                    }
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
                    return all.filter((item) => {
                        if (item.type === "heading") {
                            // For heading group, check if any subItem matches
                            return item.subItems.some(subItem =>
                                subItem.title.toLowerCase().includes(query.toLowerCase())
                            );
                        }
                        return item.title.toLowerCase().includes(query.toLowerCase());
                    });
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
            StarterKit.configure({
                codeBlock: false,
                bulletList: true,
                orderedList: true,
                blockquote: true,
                heading: true,
            }),
            Highlight,
            CodeBlockLowlight.configure({ lowlight }),
            SlashCommand,
        ],
        immediatelyRender: false, // Prevent SSR mismatch
        editorProps: {
            attributes: {
                class: "w-full min-h-[60vh] p-8 backdrop-blur-sm focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onUpdate?.(editor.getJSON());
        },
    });

    if (!mounted || !editor) return null;

    return (
        <div className="w-full">
            <style jsx global>{`
        .ProseMirror {
          outline: none;
          color: #ffffff;
        }
        
        /* Headings with distinct sizes */
        .ProseMirror h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 2rem 0 1rem 0;
          padding-bottom: 0.5rem;
        }
        
        .ProseMirror h2 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem 0;
          padding-bottom: 0.25rem;
        }
        
        .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem 0;
        }
        
        .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
        }
        
        .ProseMirror h5 {
          font-size: 1.125rem;
          font-weight: 500;
          margin: 0.75rem 0 0.5rem 0;
        }
        
        .ProseMirror h6 {
          font-size: 1rem;
          font-weight: 500;
          margin: 0.5rem 0 0.25rem 0;
        }
        
        /* Lists with proper bullets and numbers */
        .ProseMirror ul {
          list-style-type: disc;
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .ProseMirror ul li {
          margin: 0.25rem 0;
          line-height: 1.6;
        }
        
        .ProseMirror ol {
          list-style-type: decimal;
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        .ProseMirror ol li {
          margin: 0.25rem 0;
          line-height: 1.6;
        }
        
        /* Code block with distinct background */
        .ProseMirror pre {
          background: rgba(139, 92, 246, 0.15);
          color: #cbafed;
          padding: 1.5rem;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          overflow-x: auto;
        }
        
        .ProseMirror pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
          font-size: 0.9rem;
          font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
        }
        
        /* Highlight with distinct color */
        .ProseMirror mark {
          background: #322837;
          color: #bda6c8;
          padding: 0.25rem 0.35rem;
          border-radius: 0.125rem;
          font-size: 1.5rem;
        }
        
        /* Paragraph spacing */
        .ProseMirror p {
          margin: 1rem 0;
          line-height: 1.7;
        }
      `}</style>
      
      <EditorContent editor={editor} />
    </div>
  );
}
