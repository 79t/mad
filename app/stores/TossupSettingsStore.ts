import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TossupSettings = {
  difficulties: boolean[];
  setDifficulty: (index: number, value: boolean) => void;
  categories: Set<string>,
  addCategory: (category: string) => void
  removeCategory: (category: string) => void
};

new Set()

export const useTossupSettings = create<TossupSettings>()(
  persist(
    (set, get) => ({
      difficulties: [
        false,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
      setDifficulty: (index, value) => {
        const arrCopy = [...get().difficulties];
        arrCopy[index] = value;
        set({ difficulties: arrCopy }, false);
      },
      categories: new Set<string>(),
      addCategory: (category) => set((state) => ({ categories: new Set(state.categories).add(category)})),
      removeCategory: (category) => set((state) => ({ categories: new Set([...state.categories].filter(cat => cat !== category))})),
    }),
    {
      name: "tossupSettingsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
