document.addEventListener("alpine:init", () => {
  Alpine.data("workspace", () => ({
    isDarkMode: false,
    isNewMenuOpen: false,
    activeCollection: "all",
    activeSchema: null,
    activeView: "list",
    currentSelectedId: null,
    isConversationsPanelOpen: false,
    hasUnreadDiscussions: true,
    selectedDiscussionId: null,
    isLibraryDropdownOpen: false,
    isSettingsModalOpen: false,
    isSearchModalOpen: false,
    searchQuery: "",
    activeEditorSection: "fields",
    isInviteBoxExpanded: false,
    inviteEmail: "",
    workspaceNameInput: "Personal Space",
    currentLibrary: "Personal Space",
    editorTitle: "",
    editorContent: "",
    syncStatus: "SAVED",
    activeSettingsSection: "sec-general",
    chatReplyInput: "",

    schemas: [
      { id: "page", name: "Page", color: "page", description: "Long-form documents" },
      { id: "task", name: "Task", color: "task", description: "Action items" },
      { id: "project", name: "Project", color: "project", description: "Container for related objects" },
      { id: "note", name: "Note", color: "note", description: "Quick capture" },
      { id: "bookmark", name: "Bookmark", color: "bookmark", description: "Saved URLs" },
    ],

    entries: [
      { id: "p1", type: "page", title: "Q3 brand strategy", status: "draft", tags: ["strategy", "brand"], updatedAt: new Date(2026, 6, 25), content: "<p>Working draft. Outline the Q3 brand refresh, the timeline, and the artifacts needed.</p><h2>Goals</h2><p>Tighten the visual system. Reduce decision fatigue in marketing.</p><h2>Timeline</h2><ul><li>Audit existing — week 1</li><li>Direction exploration — week 2-3</li><li>System definition — week 4</li><li>Rollout — week 5+</li></ul>" },
      { id: "p2", type: "page", title: "On writing", status: "published", tags: ["writing", "craft"], updatedAt: new Date(2026, 6, 22) },
      { id: "p3", type: "page", title: "Product principles", status: "published", tags: ["product"], updatedAt: new Date(2026, 6, 18) },
      { id: "p4", type: "page", title: "Notes on review", status: "draft", tags: ["meta"], updatedAt: new Date(2026, 6, 14) },
      { id: "p5", type: "page", title: "Tools I use", status: "published", tags: ["tools"], updatedAt: new Date(2026, 6, 8) },
      { id: "t1", type: "task", title: "Review spec doc", status: "todo", priority: "high", due: "2026-08-01", assignee: "me", tags: ["docs", "review"], updatedAt: new Date(2026, 6, 26) },
      { id: "t2", type: "task", title: "Design tokens audit", status: "doing", priority: "medium", due: "2026-07-30", assignee: "jane", tags: ["design"], updatedAt: new Date(2026, 6, 27) },
      { id: "t3", type: "task", title: "Set up CI", status: "done", priority: "low", due: "2026-07-20", assignee: "me", tags: ["devops"], updatedAt: new Date(2026, 6, 20) },
      { id: "t4", type: "task", title: "Write launch post", status: "blocked", priority: "high", due: "2026-08-15", assignee: "me", tags: ["launch"], updatedAt: new Date(2026, 6, 24) },
      { id: "t5", type: "task", title: "Migrate auth service", status: "todo", priority: "medium", due: "2026-08-10", assignee: "me", tags: ["backend"], updatedAt: new Date(2026, 6, 23) },
      { id: "pj1", type: "project", title: "PKM v2 launch", status: "doing", owner: "me", start: "2026-07-01", end: "2026-09-30", tags: ["launch", "q3"], updatedAt: new Date(2026, 6, 26) },
      { id: "pj2", type: "project", title: "Brand refresh", status: "planning", owner: "jane", start: "2026-08-15", end: "2026-10-30", tags: ["brand"], updatedAt: new Date(2026, 6, 23) },
      { id: "n1", type: "note", title: "Voice memo ref", tags: ["voice"], updatedAt: new Date(2026, 6, 27) },
      { id: "n2", type: "note", title: "Reading list", tags: ["reading"], updatedAt: new Date(2026, 6, 24) },
      { id: "n3", type: "note", title: "Meeting notes", tags: ["work"], updatedAt: new Date(2026, 6, 22) },
      { id: "n4", type: "note", title: "Coffee shop idea", tags: ["ideas"], updatedAt: new Date(2026, 6, 19) },
      { id: "n5", type: "note", title: "Trip notes", tags: ["travel"], updatedAt: new Date(2026, 6, 12) },
      { id: "b1", type: "bookmark", title: "AnyType docs", url: "https://docs.anytype.io", description: "Object model reference", tags: ["ref"], updatedAt: new Date(2026, 6, 21) },
      { id: "b2", type: "bookmark", title: "Geist font", url: "https://vercel.com/font", description: "Vercel sans", tags: ["design"], updatedAt: new Date(2026, 6, 17) },
    ],

    discussions: [
      {
        id: 1,
        title: "PKM v2 launch",
        preview: "Reviewing launch criteria...",
        messages: [
          { sender: "Jane", text: "When is the public beta?" },
          { sender: "Me", text: "Targeting end of August." },
        ],
      },
    ],

    members: [
      { name: "My Profile", email: "admin@cozyspace.co", initials: "ME", role: "OWNER" },
    ],

    init() {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.closeSearchModal();
          this.closeSettingsModal();
          this.hideFloatingFormatMenu();
          this.hideSlashMenu();
        }
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          this.openSearchModal();
        }
      });

      this.$nextTick(() => {
        const canvas = document.getElementById("modal-scroll-canvas");
        if (canvas) {
          canvas.addEventListener("scroll", () => {
            const sections = document.querySelectorAll(".settings-section");
            sections.forEach((sec) => {
              const top = sec.offsetTop - canvas.offsetTop - 50;
              if (canvas.scrollTop >= top) {
                this.activeSettingsSection = sec.id;
              }
            });
          });
        }
      });
    },

    get totalEntryCount() { return this.entries.length; },

    get headerCrumb() {
      if (this.activeView === "editor") return this.getSchemaName(this.activeEntry?.type) || "Entry";
      if (this.activeSchema) return this.getSchemaName(this.activeSchema);
      return { all: "All", recent: "Recent", drafts: "Drafts", "in-progress": "In Progress" }[this.activeCollection] || "All";
    },

    get listHeaderTitle() {
      if (this.activeSchema) return this.getSchemaName(this.activeSchema);
      return { all: "All", recent: "Recent", drafts: "Drafts", "in-progress": "In Progress" }[this.activeCollection] || "All";
    },

    get listHeaderSubtitle() {
      if (this.activeSchema) {
        const s = this.schemas.find((s) => s.id === this.activeSchema);
        return s ? s.description : "";
      }
      return { all: "All entries across schemas", recent: "Most recently updated", drafts: "Entries with status = draft", "in-progress": "Tasks in progress" }[this.activeCollection] || "";
    },

    get filteredEntries() {
      let result = [...this.entries];
      if (this.activeSchema) result = result.filter((e) => e.type === this.activeSchema);
      if (this.activeCollection === "recent") {
        result = result.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).slice(0, 8);
      } else if (this.activeCollection === "drafts") {
        result = result.filter((e) => e.status === "draft");
      } else if (this.activeCollection === "in-progress") {
        result = result.filter((e) => e.status === "doing" || e.status === "active");
      }
      return result.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    },

    get searchResults() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.entries.slice(0, 8);
      return this.entries.filter((e) =>
        (e.title || "").toLowerCase().includes(q) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    },

    get activeEntry() { return this.entries.find((e) => e.id === this.currentSelectedId) || null; },
    get activeDiscussion() { return this.discussions.find((c) => c.id === this.selectedDiscussionId) || null; },

    countByType(type) { return this.entries.filter((e) => e.type === type).length; },
    countByStatus(status) { return this.entries.filter((e) => e.status === status).length; },
    getSchemaName(typeId) { if (!typeId) return ""; const s = this.schemas.find((s) => s.id === typeId); return s ? s.name : typeId; },
    getSchemaSubtitle(typeId) { if (!typeId) return ""; const s = this.schemas.find((s) => s.id === typeId); return s ? s.description : ""; },

    getTypeIconSvg(typeId) {
      const iconMap = {
        page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>',
        task: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 6v3.776"/></svg>',
        note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"/></svg>',
        bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>',
      };
      return iconMap[typeId] || "";
    },

    formatDate(dateObj) {
      if (!dateObj) return "";
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = dateObj.getDate();
      const mmm = months[dateObj.getMonth()];
      const now = new Date();
      if (dateObj.getFullYear() === now.getFullYear()) return `${mmm} ${day}`;
      const dayStr = day < 10 ? "0" + day : day;
      return `${mmm} ${dayStr}, ${dateObj.getFullYear()}`;
    },

    formatRelativeTime(dateObj) {
      if (!dateObj) return "";
      const now = new Date(2026, 6, 27);
      const diff = Math.floor((now - dateObj) / (1000 * 60 * 60 * 24));
      if (diff === 0) return "Today";
      if (diff === 1) return "Yesterday";
      if (diff < 7) return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dateObj.getDay()];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = dateObj.getDate();
      const mmm = months[dateObj.getMonth()];
      if (dateObj.getFullYear() === now.getFullYear()) return `${mmm} ${day}`;
      return `${mmm} ${day}, ${dateObj.getFullYear()}`;
    },

    selectCollection(collectionId) { this.activeCollection = collectionId; this.activeSchema = null; this.exitToListView(); },
    selectSchema(schemaId) { this.activeSchema = schemaId; this.activeCollection = "all"; this.exitToListView(); },

    loadEntryToEditor(id) {
      const entry = this.entries.find((e) => e.id === id);
      if (!entry) return;
      this.currentSelectedId = id;
      this.activeView = "editor";
      this.editorTitle = entry.title || "";
      this.$nextTick(() => {
        const body = document.getElementById("editor-content-body");
        if (body) body.innerHTML = entry.content || "";
      });
      this.triggerStatusSaveFeedback();
    },

    exitToListView() { this.activeView = "list"; this.currentSelectedId = null; this.hideFloatingFormatMenu(); this.hideSlashMenu(); },

    syncEditorTitle() {
      if (!this.currentSelectedId) return;
      const entry = this.entries.find((e) => e.id === this.currentSelectedId);
      if (entry) { entry.title = this.editorTitle; this.triggerStatusSaveFeedback(); }
    },

    syncEditorContent() {
      if (!this.currentSelectedId) return;
      const body = document.getElementById("editor-content-body");
      if (!body) return;
      const entry = this.entries.find((e) => e.id === this.currentSelectedId);
      if (entry) { entry.content = body.innerHTML; this.triggerStatusSaveFeedback(); }
    },

    triggerStatusSaveFeedback() {
      this.syncStatus = "SAVING...";
      setTimeout(() => { this.syncStatus = "SAVED"; }, 800);
    },

    handleSelectionChange(e) {
      if (this.activeView !== "editor") return;
      const selection = window.getSelection();
      const text = selection.toString().trim();
      if (!text) { this.hideFloatingFormatMenu(); return; }
      const range = selection.getRangeAt(0);
      const rects = range.getClientRects();
      if (rects.length > 0) {
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

    hideFloatingFormatMenu() { const menu = document.getElementById("floating-format-menu"); if (menu) menu.classList.remove("show"); },
    formatSelection(command) { document.execCommand(command, false, null); this.syncEditorContent(); this.hideFloatingFormatMenu(); },

    createDiscussionFromSelection() {
      const selectionText = window.getSelection().toString().trim();
      if (!selectionText) return;
      if (!this.isConversationsPanelOpen) this.toggleConversations();
      this.selectedDiscussionId = 1;
      setTimeout(() => { this.chatReplyInput = `Discussing: "${selectionText}" — `; }, 200);
      this.hideFloatingFormatMenu();
    },

    handleEditorKeyUp(e) { if (e.key === "/") this.showSlashMenu(); else if (e.key === "Escape" || e.key === "Backspace") this.hideSlashMenu(); },

    showSlashMenu() {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
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

    hideSlashMenu() { const menu = document.getElementById("slash-command-menu"); if (menu) menu.style.display = "none"; },

    insertBlockType(type) {
      const body = document.getElementById("editor-content-body");
      if (!body) return;
      let html = body.innerHTML;
      if (html.endsWith("/")) html = html.slice(0, -1);
      else if (html.endsWith("/<br>")) html = html.slice(0, -5);
      let block = "";
      if (type === "h1") block = `<h1 style="font-family: Geist, sans-serif; font-size: 24px; font-weight: 600; margin: 24px 0 8px; color: var(--foreground);">Heading 1</h1>`;
      else if (type === "h2") block = `<h2 style="font-family: Geist, sans-serif; font-size: 18px; font-weight: 600; margin: 16px 0 6px; color: var(--foreground);">Heading 2</h2>`;
      else if (type === "h3") block = `<h3 style="font-family: Geist, sans-serif; font-size: 15px; font-weight: 600; margin: 12px 0 4px; color: var(--foreground);">Heading 3</h3>`;
      else if (type === "list") block = `<ul style="list-style: disc; padding-left: 20px; margin: 8px 0;"><li>List item</li></ul>`;
      else if (type === "quote") block = `<blockquote style="border-left: 2px solid var(--border); padding: 4px 0 4px 16px; margin: 12px 0; color: var(--muted-foreground);">"Quote content."</blockquote>`;
      body.innerHTML = html + block;
      this.hideSlashMenu();
      this.syncEditorContent();
      body.focus();
    },

    handleEditorClick(e) {
      const formatMenu = document.getElementById("floating-format-menu");
      if (formatMenu && !formatMenu.contains(e.target)) {
        setTimeout(() => { if (!window.getSelection().toString().trim()) this.hideFloatingFormatMenu(); }, 50);
      }
    },

    createNewEntryOfType(typeId) {
      const type = typeId || this.activeSchema || "page";
      const newId = "e" + Date.now();
      this.entries.unshift({ id: newId, type, title: "Untitled", status: "draft", tags: [], updatedAt: new Date(), content: "Press / to insert blocks. Highlight any text for formatting options." });
      this.loadEntryToEditor(newId);
    },

    toggleConversations() {
      this.isConversationsPanelOpen = !this.isConversationsPanelOpen;
      if (this.isConversationsPanelOpen) this.hasUnreadDiscussions = false;
    },

    submitChatReply() {
      if (!this.chatReplyInput.trim() || this.selectedDiscussionId === null) return;
      const chat = this.discussions.find((c) => c.id === this.selectedDiscussionId);
      if (chat) {
        const text = this.chatReplyInput.trim();
        chat.messages.push({ sender: "Me", text });
        chat.preview = `Me: ${text}`;
        this.chatReplyInput = "";
        this.$nextTick(() => {
          const canvas = document.getElementById("messages-canvas");
          if (canvas) canvas.scrollTop = canvas.scrollHeight;
        });
      }
    },

    openSettingsModal() { this.isLibraryDropdownOpen = false; this.isSettingsModalOpen = true; },
    closeSettingsModal() { this.isSettingsModalOpen = false; },

    addMember() {
      if (!this.inviteEmail.trim()) return;
      const email = this.inviteEmail.trim();
      const name = email.split("@")[0];
      const initials = name.slice(0, 2).toUpperCase();
      this.members.push({ name, email, initials, role: "MEMBER" });
      this.inviteEmail = "";
      this.isInviteBoxExpanded = false;
    },

    scrollToSection(sectionId) {
      this.activeSettingsSection = sectionId;
      const el = document.getElementById(sectionId);
      const canvas = document.getElementById("modal-scroll-canvas");
      if (el && canvas) { canvas.scrollTo({ top: el.offsetTop - canvas.offsetTop - 24, behavior: "smooth" }); }
    },

    saveWorkspaceSettings() { if (this.workspaceNameInput.trim()) this.currentLibrary = this.workspaceNameInput.trim(); this.closeSettingsModal(); },
    selectLibrary(name) { this.currentLibrary = name; this.isLibraryDropdownOpen = false; },
    openSearchModal() { this.isSearchModalOpen = true; this.$nextTick(() => { if (this.$refs.searchInput) this.$refs.searchInput.focus(); }); },
    closeSearchModal() { this.isSearchModalOpen = false; this.searchQuery = ""; },
  }));
});
