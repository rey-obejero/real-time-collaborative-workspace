import Alpine from "alpinejs";
import type { Discussion, Entry, SchemaId } from "../data/types";
import { schemas } from "../data/schemas";
import { entries } from "../data/entries";
import { discussions } from "../data/discussions";
import { members } from "../data/members";
import { defaultTweaks, tweakGroups } from "../lib/tweaks";
import { getIconName } from "../lib/icons";
import { formatDate, formatRelativeTime } from "../lib/dates";
import { editorActions } from "./editor";
import { modalActions } from "./modals";
import type { WorkspaceStore } from "./store";

const COLLECTION_TITLES: Record<string, string> = {
  pinned: "Pinned",
  recent: "Recent",
  all: "All",
  drafts: "Drafts",
  "in-progress": "In Progress",
};

const COLLECTION_ICONS: Record<string, string> = {
  pinned: "pin",
  recent: "clock",
  all: "grid",
  drafts: "page",
  "in-progress": "task",
};

const state = {
  isDarkMode: false,
  isNewMenuOpen: false,
  activeCollection: "all",
  activeSchema: null as SchemaId | null,
  activeView: "list" as "list" | "editor" | "conversations",
  currentSelectedId: null as string | null,
  hasUnreadDiscussions: true,
  selectedDiscussionId: null as number | null,
  conversationFilter: "all" as "all" | "unread",
  isLibraryDropdownOpen: false,
  isSidebarOpen: true,
  isSettingsModalOpen: false,
  isSearchModalOpen: false,
  searchQuery: "",
  activeEditorSection: "fields",
  isInviteBoxExpanded: false,
  inviteEmail: "",
  tweaksOpen: false,
  tweaks: defaultTweaks,
  workspaceNameInput: "Personal Space",
  currentLibrary: "Personal Space",
  editorTitle: "",
  syncStatus: "Saved",
  activeSettingsSection: "sec-general",
  chatReplyInput: "",
  schemas,
  entries,
  discussions,
  members,
  tweakGroups,
};

Alpine.data(
  "workspace",
  (): WorkspaceStore => ({
    ...state,
    ...editorActions,
    ...modalActions,

    get bodyTweakClass(): string {
      const t = this.tweaks;
      const parts = [
        t.density === "compact" && "tweaks-compact",
        t.cardEdge === "flat" && "tweaks-card-flat",
        t.sidebarFill === "soft" && "tweaks-sidebar-soft",
        t.chipStyle === "bordered" && "tweaks-chips-bordered",
        t.statusStyle === "label" && "tweaks-status-label",
        t.sidebarActionHeight === "low" && "tweaks-sidebar-height-low",
        t.sidebarActionHeight === "medium" && "tweaks-sidebar-height-medium",
        t.sidebarActionHeight === "high" && "tweaks-sidebar-height-high",
        t.sidebarHover === "low" && "tweaks-sidebar-hover-low",
        t.sidebarHover === "medium" && "tweaks-sidebar-hover-medium",
        t.sidebarHover === "high" && "tweaks-sidebar-hover-high",
        t.avatarShape === "circle" && "tweaks-avatar-circle",
        t.avatarShape === "square" && "tweaks-avatar-square",
        "tweaks-search-" + t.searchShape,
        "tweaks-search-border-" + t.searchBorder,
        t.sidebarPadX === "low" && "tweaks-sidebar-pad-x-low",
        t.sidebarPadX === "medium" && "tweaks-sidebar-pad-x-medium",
        t.sidebarPadX === "high" && "tweaks-sidebar-pad-x-high",
        t.iconSize === "sm" && "tweaks-icon-size-sm",
        t.iconSize === "md" && "tweaks-icon-size-md",
        t.iconSize === "lg" && "tweaks-icon-size-lg",
        t.elementBg === "default" && "tweaks-element-bg-default",
        t.elementBg === "hover-low" && "tweaks-element-bg-hover-low",
        t.elementBg === "hover-medium" && "tweaks-element-bg-hover-medium",
        t.elementBg === "hover-high" && "tweaks-element-bg-hover-high",
        t.elementIcon === "default" && "tweaks-element-icon-default",
        t.elementIcon === "hover-low" && "tweaks-element-icon-hover-low",
        t.elementIcon === "hover-medium" && "tweaks-element-icon-hover-medium",
        t.elementIcon === "hover-high" && "tweaks-element-icon-hover-high",
      ];
      return parts.filter(Boolean).join(" ");
    },

    get bodyTweakStyle(): string {
      const stroke =
        { thin: "1", normal: "1.5", thick: "2" }[this.tweaks.iconStroke] ||
        "1.5";
      return "--tweak-stroke: " + stroke;
    },

    get headerCrumb(): string {
      if (this.activeView === "editor")
        return this.activeEntry?.title || "Entry";
      if (this.activeView === "conversations") return "Conversations";
      if (this.activeSchema) return this.getSchemaName(this.activeSchema);
      return COLLECTION_TITLES[this.activeCollection] || "All";
    },

    get headerIcon(): string {
      if (this.activeView === "editor") return this.activeEntry?.type || "page";
      if (this.activeView === "conversations") return "chat";
      if (this.activeSchema) return this.activeSchema;
      return COLLECTION_ICONS[this.activeCollection] || "grid";
    },

    get filteredEntries(): Entry[] {
      let result = [...this.entries];
      if (this.activeSchema)
        result = result.filter((e) => e.type === this.activeSchema);
      if (this.activeCollection === "pinned") {
        result = result.filter((e) => e.pinned);
      } else if (this.activeCollection === "recent") {
        result = result
          .sort(
            (a, b) =>
              (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0),
          )
          .slice(0, 8);
      } else if (this.activeCollection === "drafts") {
        result = result.filter((e) => e.status === "draft");
      } else if (this.activeCollection === "in-progress") {
        result = result.filter(
          (e) => e.status === "doing" || e.status === "active",
        );
      }
      return result.sort(
        (a, b) => (b.updatedAt?.getTime() ?? 0) - (a.updatedAt?.getTime() ?? 0),
      );
    },

    get searchResults(): Entry[] {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.entries.slice(0, 8);
      return this.entries.filter(
        (e) =>
          (e.title || "").toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q)),
      );
    },

    get activeEntry(): Entry | null {
      return this.entries.find((e) => e.id === this.currentSelectedId) || null;
    },

    get activeDiscussion(): Discussion | null {
      return (
        this.discussions.find((c) => c.id === this.selectedDiscussionId) || null
      );
    },

    get filteredDiscussions(): Discussion[] {
      if (this.conversationFilter === "unread")
        return this.discussions.filter((c) => c.unread);
      return this.discussions;
    },

    init(): void {
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

    },

    countByType(type: SchemaId): number {
      return this.entries.filter((e) => e.type === type).length;
    },

    getSchemaName(typeId: string | null | undefined): string {
      if (!typeId) return "";
      const s = this.schemas.find((s) => s.id === typeId);
      return s ? s.name : typeId;
    },

    getSchemaSubtitle(typeId: string | null | undefined): string {
      if (!typeId) return "";
      const s = this.schemas.find((s) => s.id === typeId);
      return s ? s.description : "";
    },

    getIconName(name: string): string {
      return getIconName(name);
    },

    formatDate(dateObj: Date): string {
      return formatDate(dateObj);
    },

    formatRelativeTime(dateObj: Date): string {
      return formatRelativeTime(dateObj);
    },

    selectCollection(collectionId: string): void {
      this.activeCollection = collectionId;
      this.activeSchema = null;
      this.exitToListView();
    },

    selectSchema(schemaId: SchemaId): void {
      this.activeSchema = schemaId;
      this.activeCollection = "all";
      this.exitToListView();
    },

    toggleTweak(key: keyof typeof defaultTweaks, value: string): void {
      this.tweaks[key] = value;
    },
  }),
);

Alpine.start();
