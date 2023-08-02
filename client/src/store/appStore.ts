import { create } from 'zustand';

interface IAppStore {
  userName: string | null;
  setUserName: (v: string) => void;
}

const useAppStore = create<IAppStore>((set) => ({
  userName: null,

  setUserName: (userName) => {
    set((store) => ({
      ...store,
      userName,
    }));
  },
}));

export {useAppStore};