import type { WorkspaceStore } from "./store";

export const modalActions = {
  selectConversations(this: WorkspaceStore): void {
    this.activeView = "conversations";
    this.currentSelectedId = null;
    this.hasUnreadDiscussions = false;
    if (this.selectedDiscussionId === null && this.discussions.length > 0) {
      this.selectedDiscussionId = this.discussions[0].id;
    }
    this.hideFloatingFormatMenu();
    this.hideSlashMenu();
  },

  closeConversations(this: WorkspaceStore): void {
    this.activeView = "list";
    this.selectedDiscussionId = null;
  },

  submitChatReply(this: WorkspaceStore): void {
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
      this.$nextTick?.(() => {
        const canvas = document.getElementById("messages-canvas");
        if (canvas) canvas.scrollTop = canvas.scrollHeight;
      });
    }
  },

  openSettingsModal(this: WorkspaceStore): void {
    this.isLibraryDropdownOpen = false;
    this.isSettingsModalOpen = true;
  },

  closeSettingsModal(this: WorkspaceStore): void {
    this.isSettingsModalOpen = false;
  },

  addMember(this: WorkspaceStore): void {
    if (!this.inviteEmail.trim()) return;
    const email = this.inviteEmail.trim();
    const name = email.split("@")[0];
    const initials = name.slice(0, 2).toUpperCase();
    this.members.push({ name, email, initials, role: "MEMBER" });
    this.inviteEmail = "";
    this.isInviteBoxExpanded = false;
  },

  saveWorkspaceSettings(this: WorkspaceStore): void {
    if (this.workspaceNameInput.trim())
      this.currentLibrary = this.workspaceNameInput.trim();
    this.closeSettingsModal();
  },

  selectLibrary(this: WorkspaceStore, name: string): void {
    this.currentLibrary = name;
    this.isLibraryDropdownOpen = false;
  },

  openSearchModal(this: WorkspaceStore): void {
    this.isSearchModalOpen = true;
    this.$nextTick?.(() => {
      if (this.$refs?.searchInput) this.$refs.searchInput.focus();
    });
  },

  closeSearchModal(this: WorkspaceStore): void {
    this.isSearchModalOpen = false;
    this.searchQuery = "";
  },
};
