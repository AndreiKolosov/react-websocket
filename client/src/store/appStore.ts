import { create } from 'zustand';
import { TChatMessage } from '../types';

interface IUser {
  username: string;
  id: string;
}

interface IAppStore {
  userName: string | null;
  activeUsers: IUser[];
  chatHistory:TChatMessage[];
  activityHistory: string[];
  editorContent: string;

  setUserName: (v: string) => void;
  setActiveUsers: (v: IUser[]) => void;
  setChatHistory: (v: TChatMessage[]) => void;
  setActivityHistory: (v: string[]) => void;
  setEditorContent: (v: string) => void;
}

const useAppStore = create<IAppStore>((set) => ({
  userName: null,
  activeUsers: [],
  chatHistory: [],
  activityHistory: [],
  editorContent: '',

  setUserName: (userName) => {
    set((store) => ({
      ...store,
      userName,
    }));
  },

  setActiveUsers: (activeUsers) => {
    set((store) => ({
      ...store,
      activeUsers,
    }));
  },

  setChatHistory: (chatHistory) => {
    set((store) => ({
      ...store,
      chatHistory,
    }));
  },

  setActivityHistory: (activityHistory) => {
    set((store) => ({
      ...store,
      activityHistory,
    }));
  },

  setEditorContent: (editorContent) => {
    set((store) => ({
      ...store,
      editorContent,
    }));
  },
}));

export { useAppStore };
