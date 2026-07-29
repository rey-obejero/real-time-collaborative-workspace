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
    tweaksOpen: false,
    tweaks: {
      density: "default",
      cardEdge: "hairline",
      sidebarFill: "canvas",
      chipStyle: "soft",
      statusStyle: "dot",
      iconSet: "custom",
    },
    workspaceNameInput: "Personal Space",
    currentLibrary: "Personal Space",
    editorTitle: "",
    editorContent: "",
    syncStatus: "Saved",
    activeSettingsSection: "sec-general",
    chatReplyInput: "",

    schemas: [
      {
        id: "page",
        name: "Page",
        color: "page",
        description: "Long-form documents",
      },
      { id: "task", name: "Task", color: "task", description: "Action items" },
      {
        id: "project",
        name: "Project",
        color: "project",
        description: "Container for related objects",
      },
      { id: "note", name: "Note", color: "note", description: "Quick capture" },
      {
        id: "bookmark",
        name: "Bookmark",
        color: "bookmark",
        description: "Saved URLs",
      },
    ],

    entries: [
      {
        id: "p1",
        type: "page",
        title: "Q3 brand strategy",
        status: "draft",
        tags: ["strategy", "brand"],
        updatedAt: new Date(2026, 6, 25),
        content:
          "<p>Working draft. Outline the Q3 brand refresh, the timeline, and the artifacts needed.</p><h2>Goals</h2><p>Tighten the visual system. Reduce decision fatigue in marketing.</p><h2>Timeline</h2><ul><li>Audit existing — week 1</li><li>Direction exploration — week 2-3</li><li>System definition — week 4</li><li>Rollout — week 5+</li></ul>",
      },
      {
        id: "p2",
        type: "page",
        title: "On writing",
        status: "published",
        tags: ["writing", "craft"],
        updatedAt: new Date(2026, 6, 22),
      },
      {
        id: "p3",
        type: "page",
        title: "Product principles",
        status: "published",
        tags: ["product"],
        updatedAt: new Date(2026, 6, 18),
      },
      {
        id: "p4",
        type: "page",
        title: "Notes on review",
        status: "draft",
        tags: ["meta"],
        updatedAt: new Date(2026, 6, 14),
      },
      {
        id: "p5",
        type: "page",
        title: "Tools I use",
        status: "published",
        tags: ["tools"],
        updatedAt: new Date(2026, 6, 8),
      },
      {
        id: "t1",
        type: "task",
        title: "Review spec doc",
        status: "todo",
        priority: "high",
        due: "2026-08-01",
        assignee: "me",
        tags: ["docs", "review"],
        updatedAt: new Date(2026, 6, 26),
      },
      {
        id: "t2",
        type: "task",
        title: "Design tokens audit",
        status: "doing",
        priority: "medium",
        due: "2026-07-30",
        assignee: "jane",
        tags: ["design"],
        updatedAt: new Date(2026, 6, 27),
      },
      {
        id: "t3",
        type: "task",
        title: "Set up CI",
        status: "done",
        priority: "low",
        due: "2026-07-20",
        assignee: "me",
        tags: ["devops"],
        updatedAt: new Date(2026, 6, 20),
      },
      {
        id: "t4",
        type: "task",
        title: "Write launch post",
        status: "blocked",
        priority: "high",
        due: "2026-08-15",
        assignee: "me",
        tags: ["launch"],
        updatedAt: new Date(2026, 6, 24),
      },
      {
        id: "t5",
        type: "task",
        title: "Migrate auth service",
        status: "todo",
        priority: "medium",
        due: "2026-08-10",
        assignee: "me",
        tags: ["backend"],
        updatedAt: new Date(2026, 6, 23),
      },
      {
        id: "pj1",
        type: "project",
        title: "PKM v2 launch",
        status: "doing",
        owner: "me",
        start: "2026-07-01",
        end: "2026-09-30",
        tags: ["launch", "q3"],
        updatedAt: new Date(2026, 6, 26),
      },
      {
        id: "pj2",
        type: "project",
        title: "Brand refresh",
        status: "planning",
        owner: "jane",
        start: "2026-08-15",
        end: "2026-10-30",
        tags: ["brand"],
        updatedAt: new Date(2026, 6, 23),
      },
      {
        id: "n1",
        type: "note",
        title: "Voice memo ref",
        tags: ["voice"],
        updatedAt: new Date(2026, 6, 27),
      },
      {
        id: "n2",
        type: "note",
        title: "Reading list",
        tags: ["reading"],
        updatedAt: new Date(2026, 6, 24),
      },
      {
        id: "n3",
        type: "note",
        title: "Meeting notes",
        tags: ["work"],
        updatedAt: new Date(2026, 6, 22),
      },
      {
        id: "n4",
        type: "note",
        title: "Coffee shop idea",
        tags: ["ideas"],
        updatedAt: new Date(2026, 6, 19),
      },
      {
        id: "n5",
        type: "note",
        title: "Trip notes",
        tags: ["travel"],
        updatedAt: new Date(2026, 6, 12),
      },
      {
        id: "b1",
        type: "bookmark",
        title: "AnyType docs",
        url: "https://docs.anytype.io",
        description: "Object model reference",
        tags: ["ref"],
        updatedAt: new Date(2026, 6, 21),
      },
      {
        id: "b2",
        type: "bookmark",
        title: "Geist font",
        url: "https://vercel.com/font",
        description: "Vercel sans",
        tags: ["design"],
        updatedAt: new Date(2026, 6, 17),
      },
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
      {
        name: "My Profile",
        email: "john.doe@example.com",
        initials: "ME",
        role: "OWNER",
      },
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

    get totalEntryCount() {
      return this.entries.length;
    },

    get headerCrumb() {
      if (this.activeView === "editor")
        return this.getSchemaName(this.activeEntry?.type) || "Entry";
      if (this.activeSchema) return this.getSchemaName(this.activeSchema);
      return (
        {
          all: "All",
          recent: "Recent",
          drafts: "Drafts",
          "in-progress": "In Progress",
        }[this.activeCollection] || "All"
      );
    },

    get listHeaderTitle() {
      if (this.activeSchema) return this.getSchemaName(this.activeSchema);
      return (
        {
          all: "All",
          recent: "Recent",
          drafts: "Drafts",
          "in-progress": "In Progress",
        }[this.activeCollection] || "All"
      );
    },

    get listHeaderSubtitle() {
      if (this.activeSchema) {
        const s = this.schemas.find((s) => s.id === this.activeSchema);
        return s ? s.description : "";
      }
      return (
        {
          all: "All entries across schemas",
          recent: "Most recently updated",
          drafts: "Entries with status = draft",
          "in-progress": "Tasks in progress",
        }[this.activeCollection] || ""
      );
    },

    get filteredEntries() {
      let result = [...this.entries];
      if (this.activeSchema)
        result = result.filter((e) => e.type === this.activeSchema);
      if (this.activeCollection === "recent") {
        result = result
          .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
          .slice(0, 8);
      } else if (this.activeCollection === "drafts") {
        result = result.filter((e) => e.status === "draft");
      } else if (this.activeCollection === "in-progress") {
        result = result.filter(
          (e) => e.status === "doing" || e.status === "active",
        );
      }
      return result.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    },

    get searchResults() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.entries.slice(0, 8);
      return this.entries.filter(
        (e) =>
          (e.title || "").toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q)),
      );
    },

    get activeEntry() {
      return this.entries.find((e) => e.id === this.currentSelectedId) || null;
    },
    get activeDiscussion() {
      return (
        this.discussions.find((c) => c.id === this.selectedDiscussionId) || null
      );
    },

    countByType(type) {
      return this.entries.filter((e) => e.type === type).length;
    },
    countByStatus(status) {
      return this.entries.filter((e) => e.status === status).length;
    },
    getSchemaName(typeId) {
      if (!typeId) return "";
      const s = this.schemas.find((s) => s.id === typeId);
      return s ? s.name : typeId;
    },
    getSchemaSubtitle(typeId) {
      if (!typeId) return "";
      const s = this.schemas.find((s) => s.id === typeId);
      return s ? s.description : "";
    },

    getTypeIconSvg(typeId) {
      const set = this.tweaks.iconSet;
      const SVG = (p) =>
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
      const all = {
        custom: {
          page: SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 13h4M10 17h4"/>'),
          task: SVG('<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>'),
          project: SVG('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
          note: SVG('<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'),
          bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        },
        feather: {
          page: SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),
          task: SVG('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
          project: SVG('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
          note: SVG('<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'),
          bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        },
        heroicons: {
          page: SVG('<path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z"/>'),
          task: SVG('<path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>'),
          project: SVG('<path d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z"/>'),
          note: SVG('<path d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"/>'),
          bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        },
        phosphor: {
          page: SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>'),
          task: SVG('<path d="M9.5 12.5l2 2 5-5"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>'),
          project: SVG('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
          note: SVG('<path d="M8 6h8M8 10h8M8 14h5"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'),
          bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        },
        hugeicons: {
          page: SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 13h4M10 17h4"/><path d="M8 9h1"/>'),
          task: SVG('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
          project: SVG('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M9 7v2h3"/>'),
          note: SVG('<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/><path d="M15.5 6.5l2 2"/>'),
          bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        },
      };
      return (all[set] && all[set][typeId]) || (all.custom[typeId]) || "";
    },

    getIconName(name) {
      const set = this.tweaks.iconSet;
      const map = {
        feather: {
          search: "feather:search",
          chat: "feather:message-square",
          settings: "feather:settings",
          tweaks: "feather:sliders",
          moon: "feather:moon",
          sun: "feather:sun",
          "chevron-down": "feather:chevron-down",
          "chevron-left": "feather:chevron-left",
          x: "feather:x",
          plus: "feather:plus",
          grid: "feather:grid",
          clock: "feather:clock",
          trash: "feather:trash-2",
          sort: "feather:arrow-up-down",
          filter: "feather:filter",
          send: "feather:send",
          sparkles: "feather:star",
          page: "feather:file-text",
          task: "feather:check-square",
          project: "feather:folder",
          note: "feather:edit-3",
          bookmark: "feather:bookmark",
          pencil: "feather:edit-2",
          discuss: "feather:message-square",
        },
        heroicons: {
          search: "heroicons-outline:magnifying-glass",
          chat: "heroicons-outline:chat-bubble-left-ellipsis",
          settings: "heroicons-outline:cog-6-tooth",
          tweaks: "heroicons-outline:adjustments-horizontal",
          moon: "heroicons-outline:moon",
          sun: "heroicons-outline:sun",
          "chevron-down": "heroicons-outline:chevron-down",
          "chevron-left": "heroicons-outline:chevron-left",
          x: "heroicons-outline:x-mark",
          plus: "heroicons-outline:plus",
          grid: "heroicons-outline:squares-2x2",
          clock: "heroicons-outline:clock",
          trash: "heroicons-outline:trash",
          sort: "heroicons-outline:arrows-up-down",
          filter: "heroicons-outline:funnel",
          send: "heroicons-outline:paper-airplane",
          sparkles: "heroicons-outline:sparkles",
          page: "heroicons-outline:document-text",
          task: "heroicons-outline:check-circle",
          project: "heroicons-outline:folder",
          note: "heroicons-outline:pencil-square",
          bookmark: "heroicons-outline:bookmark",
          pencil: "heroicons-outline:pencil",
          discuss: "heroicons-outline:chat-bubble-left-ellipsis",
        },
        phosphor: {
          search: "ph:magnifying-glass",
          chat: "ph:chat-centered-text",
          settings: "ph:gear",
          tweaks: "ph:sliders",
          moon: "ph:moon",
          sun: "ph:sun",
          "chevron-down": "ph:caret-down",
          "chevron-left": "ph:caret-left",
          x: "ph:x",
          plus: "ph:plus",
          grid: "ph:squares-four",
          clock: "ph:clock",
          trash: "ph:trash",
          sort: "ph:arrows-down-up",
          filter: "ph:funnel",
          send: "ph:paper-plane-tilt",
          sparkles: "ph:sparkle",
          page: "ph:file-text",
          task: "ph:check-square",
          project: "ph:folder",
          note: "ph:note",
          bookmark: "ph:bookmark-simple",
          pencil: "ph:pencil-simple",
          discuss: "ph:chat-centered-text",
        },
        hugeicons: {
          search: "hugeicons:search-01",
          chat: "hugeicons:chatting-01",
          settings: "hugeicons:settings-01",
          tweaks: "hugeicons:adjustments-horizontal",
          moon: "hugeicons:moon-01",
          sun: "hugeicons:sun-01",
          "chevron-down": "hugeicons:arrow-down-01",
          "chevron-left": "hugeicons:arrow-left-01",
          x: "hugeicons:cancel-01",
          plus: "hugeicons:plus-sign",
          grid: "hugeicons:grid",
          clock: "hugeicons:clock-01",
          trash: "hugeicons:delete-02",
          sort: "hugeicons:sorting-01",
          filter: "hugeicons:filter",
          send: "hugeicons:sent",
          sparkles: "hugeicons:ai-brain-01",
          page: "hugeicons:file-01",
          task: "hugeicons:task-01",
          project: "hugeicons:folder-01",
          note: "hugeicons:note",
          bookmark: "hugeicons:bookmark-01",
          pencil: "hugeicons:pencil-edit-01",
          discuss: "hugeicons:chatting-01",
        },
      };
      return (map[set] && map[set][name]) || "";
    },

    getCustomIconSvg(name) {
      const SVG = (p) =>
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
      const custom = {
        search: SVG('<circle cx="10" cy="10" r="7"/><path d="m21 21-5-5"/>'),
        chat: SVG('<path d="M21 12a9 9 0 0 1-9 9H3l3-3a9 9 0 0 1 6-15 9 9 0 0 1 9 9z"/>'),
        settings: SVG('<circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),
        tweaks: SVG('<path d="M4 21v-4m-2 0h4M4 5v8M20 21v-6m-2 0h4M10 21V9m-2 0h4m-4 0V5m6 16V13m-2 0h4"/>'),
        moon: SVG('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
        sun: SVG('<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),
        "chevron-down": SVG('<path d="m6 9 6 6 6-6"/>'),
        "chevron-left": SVG('<path d="m15 18-6-6 6-6"/>'),
        x: SVG('<path d="M18 6 6 18M6 6l12 12"/>'),
        plus: SVG('<path d="M12 5v14M5 12h14"/>'),
        grid: SVG('<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>'),
        clock: SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),
        trash: SVG('<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>'),
        sort: SVG('<path d="M8 3v18M16 5v14"/><path d="m5 7 3-4 3 4"/><path d="m13 17 3 4 3-4"/>'),
        filter: SVG('<path d="M4 7h16"/><path d="M7 12h10"/><path d="M10 17h4"/>'),
        send: SVG('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/>'),
        sparkles: SVG('<path d="M12 3v18M3 12h18M8.5 8.5l7 7M8.5 15.5l7-7"/>'),
        page: SVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 13h4M10 17h4"/>'),
        task: SVG('<circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/>'),
        project: SVG('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
        note: SVG('<path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'),
        bookmark: SVG('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
        pencil: SVG('<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'),
        discuss: SVG('<path d="M21 12a9 9 0 0 1-9 9H3l3-3a9 9 0 0 1 6-15 9 9 0 0 1 9 9z"/>'),
      };
      return custom[name] || "";
    },

    formatDate(dateObj) {
      if (!dateObj) return "";
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
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
      if (diff < 7)
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          dateObj.getDay()
        ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const day = dateObj.getDate();
      const mmm = months[dateObj.getMonth()];
      if (dateObj.getFullYear() === now.getFullYear()) return `${mmm} ${day}`;
      return `${mmm} ${day}, ${dateObj.getFullYear()}`;
    },

    selectCollection(collectionId) {
      this.activeCollection = collectionId;
      this.activeSchema = null;
      this.exitToListView();
    },
    selectSchema(schemaId) {
      this.activeSchema = schemaId;
      this.activeCollection = "all";
      this.exitToListView();
    },

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

    exitToListView() {
      this.activeView = "list";
      this.currentSelectedId = null;
      this.hideFloatingFormatMenu();
      this.hideSlashMenu();
    },

    syncEditorTitle() {
      if (!this.currentSelectedId) return;
      const entry = this.entries.find((e) => e.id === this.currentSelectedId);
      if (entry) {
        entry.title = this.editorTitle;
        this.triggerStatusSaveFeedback();
      }
    },

    syncEditorContent() {
      if (!this.currentSelectedId) return;
      const body = document.getElementById("editor-content-body");
      if (!body) return;
      const entry = this.entries.find((e) => e.id === this.currentSelectedId);
      if (entry) {
        entry.content = body.innerHTML;
        this.triggerStatusSaveFeedback();
      }
    },

    triggerStatusSaveFeedback() {
      this.syncStatus = "Saving...";
      setTimeout(() => {
        this.syncStatus = "Saved";
      }, 800);
    },

    handleSelectionChange(e) {
      if (this.activeView !== "editor") return;
      const selection = window.getSelection();
      const text = selection.toString().trim();
      if (!text) {
        this.hideFloatingFormatMenu();
        return;
      }
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

    hideFloatingFormatMenu() {
      const menu = document.getElementById("floating-format-menu");
      if (menu) menu.classList.remove("show");
    },
    formatSelection(command) {
      document.execCommand(command, false, null);
      this.syncEditorContent();
      this.hideFloatingFormatMenu();
    },

    createDiscussionFromSelection() {
      const selectionText = window.getSelection().toString().trim();
      if (!selectionText) return;
      if (!this.isConversationsPanelOpen) this.toggleConversations();
      this.selectedDiscussionId = 1;
      setTimeout(() => {
        this.chatReplyInput = `Discussing: "${selectionText}" — `;
      }, 200);
      this.hideFloatingFormatMenu();
    },

    handleEditorKeyUp(e) {
      if (e.key === "/") this.showSlashMenu();
      else if (e.key === "Escape" || e.key === "Backspace")
        this.hideSlashMenu();
    },

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

    hideSlashMenu() {
      const menu = document.getElementById("slash-command-menu");
      if (menu) menu.style.display = "none";
    },

    insertBlockType(type) {
      const body = document.getElementById("editor-content-body");
      if (!body) return;
      let html = body.innerHTML;
      if (html.endsWith("/")) html = html.slice(0, -1);
      else if (html.endsWith("/<br>")) html = html.slice(0, -5);
      let block = "";
      if (type === "h1")
        block = `<h1 style="font-family: Geist, sans-serif; font-size: 24px; font-weight: 600; margin: 24px 0 8px; color: var(--foreground);">Heading 1</h1>`;
      else if (type === "h2")
        block = `<h2 style="font-family: Geist, sans-serif; font-size: 18px; font-weight: 600; margin: 16px 0 6px; color: var(--foreground);">Heading 2</h2>`;
      else if (type === "h3")
        block = `<h3 style="font-family: Geist, sans-serif; font-size: 15px; font-weight: 600; margin: 12px 0 4px; color: var(--foreground);">Heading 3</h3>`;
      else if (type === "list")
        block = `<ul style="list-style: disc; padding-left: 20px; margin: 8px 0;"><li>List item</li></ul>`;
      else if (type === "quote")
        block = `<blockquote style="border-left: 2px solid var(--border); padding: 4px 0 4px 16px; margin: 12px 0; color: var(--muted-foreground);">"Quote content."</blockquote>`;
      body.innerHTML = html + block;
      this.hideSlashMenu();
      this.syncEditorContent();
      body.focus();
    },

    handleEditorClick(e) {
      const formatMenu = document.getElementById("floating-format-menu");
      if (formatMenu && !formatMenu.contains(e.target)) {
        setTimeout(() => {
          if (!window.getSelection().toString().trim())
            this.hideFloatingFormatMenu();
        }, 50);
      }
    },

    createNewEntryOfType(typeId) {
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

    toggleConversations() {
      this.isConversationsPanelOpen = !this.isConversationsPanelOpen;
      if (this.isConversationsPanelOpen) this.hasUnreadDiscussions = false;
    },

    submitChatReply() {
      if (!this.chatReplyInput.trim() || this.selectedDiscussionId === null)
        return;
      const chat = this.discussions.find(
        (c) => c.id === this.selectedDiscussionId,
      );
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

    openSettingsModal() {
      this.isLibraryDropdownOpen = false;
      this.isSettingsModalOpen = true;
    },
    closeSettingsModal() {
      this.isSettingsModalOpen = false;
    },

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
      if (el && canvas) {
        canvas.scrollTo({
          top: el.offsetTop - canvas.offsetTop - 24,
          behavior: "smooth",
        });
      }
    },

    saveWorkspaceSettings() {
      if (this.workspaceNameInput.trim())
        this.currentLibrary = this.workspaceNameInput.trim();
      this.closeSettingsModal();
    },
    selectLibrary(name) {
      this.currentLibrary = name;
      this.isLibraryDropdownOpen = false;
    },
    openSearchModal() {
      this.isSearchModalOpen = true;
      this.$nextTick(() => {
        if (this.$refs.searchInput) this.$refs.searchInput.focus();
      });
    },
    closeSearchModal() {
      this.isSearchModalOpen = false;
      this.searchQuery = "";
    },
    toggleTweak(key, value) {
      this.tweaks[key] = value;
    },
    resetTweaks() {
      this.tweaks = {
        density: "default",
        cardEdge: "hairline",
        sidebarFill: "canvas",
        chipStyle: "soft",
        statusStyle: "dot",
        iconSet: "custom",
      };
    },
  }));
});
