import { create } from 'zustand';

export type AccountSettingsSection = 'personal' | 'preferences';
export type WorkspaceSettingsSection =
  | 'general'
  | 'members'
  | 'schemas'
  | 'properties';
export type SettingsSection = AccountSettingsSection | WorkspaceSettingsSection;

interface SettingsState {
  open: boolean;
  activeSection: SettingsSection;
  openSettings: (section?: SettingsSection) => void;
  closeSettings: () => void;
  setSection: (section: SettingsSection) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  open: false,
  activeSection: 'general',

  openSettings: (section) => {
    set((state) => ({
      open: true,
      activeSection: section ?? state.activeSection,
    }));
  },

  closeSettings: () => {
    set({ open: false });
  },

  setSection: (section) => {
    set({ activeSection: section });
  },
}));
