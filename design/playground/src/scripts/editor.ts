import type { SchemaId } from "../data/types";
import type { WorkspaceStore } from "./store";

export const editorActions = {
  loadEntryToEditor(this: WorkspaceStore, id: string): void {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry) return;
    this.currentSelectedId = id;
    this.activeView = "editor";
    this.editorTitle = entry.title || "";
    this.$nextTick?.(() => {
      const body = document.getElementById("editor-content-body");
      if (body) body.innerHTML = entry.content || "";
    });
    this.triggerStatusSaveFeedback();
  },

  exitToListView(this: WorkspaceStore): void {
    this.activeView = "list";
    this.currentSelectedId = null;
    this.hideFloatingFormatMenu();
    this.hideSlashMenu();
  },

  syncEditorTitle(this: WorkspaceStore): void {
    if (!this.currentSelectedId) return;
    const entry = this.entries.find((e) => e.id === this.currentSelectedId);
    if (entry) {
      entry.title = this.editorTitle;
      this.triggerStatusSaveFeedback();
    }
  },

  syncEditorContent(this: WorkspaceStore): void {
    if (!this.currentSelectedId) return;
    const body = document.getElementById("editor-content-body");
    if (!body) return;
    const entry = this.entries.find((e) => e.id === this.currentSelectedId);
    if (entry) {
      entry.content = body.innerHTML;
      this.triggerStatusSaveFeedback();
    }
  },

  triggerStatusSaveFeedback(this: WorkspaceStore): void {
    this.syncStatus = "Saving...";
    setTimeout(() => {
      this.syncStatus = "Saved";
    }, 800);
  },

  handleSelectionChange(this: WorkspaceStore): void {
    if (this.activeView !== "editor") return;
    const selection = window.getSelection();
    const text = selection?.toString().trim() || "";
    if (!text) {
      this.hideFloatingFormatMenu();
      return;
    }
    const range = selection?.getRangeAt(0);
    const rects = range?.getClientRects();
    if (rects && rects.length > 0) {
      const topRect = rects[0];
      const menu = document.getElementById("floating-format-menu");
      if (menu) {
        const menuWidth = menu.offsetWidth || 220;
        menu.style.left = `${topRect.left + topRect.width / 2 - menuWidth / 2 + window.scrollX}px`;
        menu.style.top = `${topRect.top - 40 + window.scrollY}px`;
        menu.classList.add("show");
      }
    }
  },

  hideFloatingFormatMenu(this: WorkspaceStore): void {
    const menu = document.getElementById("floating-format-menu");
    if (menu) menu.classList.remove("show");
  },

  formatSelection(this: WorkspaceStore, command: string): void {
    document.execCommand(command, false, undefined);
    this.syncEditorContent();
    this.hideFloatingFormatMenu();
  },

  createDiscussionFromSelection(this: WorkspaceStore): void {
    const selectionText = window.getSelection()?.toString().trim() || "";
    if (!selectionText) return;
    this.selectConversations();
    this.selectedDiscussionId = 1;
    setTimeout(() => {
      this.chatReplyInput = `Discussing: "${selectionText}" — `;
    }, 200);
    this.hideFloatingFormatMenu();
  },

  handleEditorKeyUp(this: WorkspaceStore, e: KeyboardEvent): void {
    if (e.key === "/") this.showSlashMenu();
    else if (e.key === "Escape" || e.key === "Backspace") this.hideSlashMenu();
  },

  showSlashMenu(this: WorkspaceStore): void {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const rects = range.getClientRects();
    const menu = document.getElementById("slash-command-menu");
    if (menu && rects.length > 0) {
      const rect = rects[0];
      menu.style.display = "block";
      menu.style.left = `${rect.left + window.scrollX}px`;
      menu.style.top = `${rect.bottom + 6 + window.scrollY}px`;
    }
  },

  hideSlashMenu(this: WorkspaceStore): void {
    const menu = document.getElementById("slash-command-menu");
    if (menu) menu.style.display = "none";
  },

  insertBlockType(this: WorkspaceStore, type: string): void {
    const body = document.getElementById("editor-content-body");
    if (!body) return;
    let html = body.innerHTML;
    if (html.endsWith("/")) html = html.slice(0, -1);
    else if (html.endsWith("/<br>")) html = html.slice(0, -5);
    let block = "";
    if (type === "h1")
      block = `<h1 style="font-family: var(--font-display); font-size: 24px; font-weight: 600; margin: 24px 0 8px; color: var(--foreground);">Heading 1</h1>`;
    else if (type === "h2")
      block = `<h2 style="font-family: var(--font-sans); font-size: 20px; font-weight: 500; margin: 20px 0 6px; color: var(--foreground);">Heading 2</h2>`;
    else if (type === "h3")
      block = `<h3 style="font-family: var(--font-sans); font-size: 16px; font-weight: 500; margin: 16px 0 4px; color: var(--foreground);">Heading 3</h3>`;
    else if (type === "list")
      block = `<ul style="list-style: disc; padding-left: 20px; margin: 8px 0; font-size: 16px; line-height: 1.5;"><li>List item</li></ul>`;
    else if (type === "quote")
      block = `<blockquote style="border-left: 2px solid var(--border); padding: 4px 0 4px 16px; margin: 12px 0; font-size: 16px; line-height: 1.5; color: var(--muted-foreground);">"Quote content."</blockquote>`;
    body.innerHTML = html + block;
    this.hideSlashMenu();
    this.syncEditorContent();
    body.focus();
  },

  handleEditorClick(this: WorkspaceStore, e: MouseEvent): void {
    const formatMenu = document.getElementById("floating-format-menu");
    if (formatMenu && !formatMenu.contains(e.target as Node)) {
      setTimeout(() => {
        if (!window.getSelection()?.toString().trim())
          this.hideFloatingFormatMenu();
      }, 50);
    }
  },

  createNewEntryOfType(this: WorkspaceStore, typeId?: SchemaId): void {
    const type = typeId || this.activeSchema || "page";
    const newId = "e" + Date.now();
    this.entries.unshift({
      id: newId,
      type,
      title: "Untitled",
      status: "draft",
      tags: [],
      updatedAt: new Date(),
      content:
        "Press / to insert blocks. Highlight any text for formatting options.",
    });
    this.loadEntryToEditor(newId);
  },
};
