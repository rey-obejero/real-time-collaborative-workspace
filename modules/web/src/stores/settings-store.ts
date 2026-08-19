import { create } from 'zustand';

export type AccountSettingsSection = 'personal' | 'preferences';
export type WorkspaceSettingsSection =
  | 'general'
  | 'members'
  | 'schemas'
  | 'properties';
export type SettingsSection = AccountSettingsSection | WorkspaceSettingsSection;

interface SettingsState {
  isOpen: boolean;
  activeSection: SettingsSection;
  openSettings: (section?: SettingsSection) => void;
  closeSettings: () => void;
  setSection: (section: SettingsSection) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  isOpen: false,
  activeSection: 'general',

  openSettings: (section) => {
    set((state) => ({
      isOpen: true,
      activeSection: section ?? state.activeSection,
    }));
  },

  closeSettings: () => {
    set({ isOpen: false });
  },

  setSection: (section) => {
    set({ activeSection: section });
  },
}));
