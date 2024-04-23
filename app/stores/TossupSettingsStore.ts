import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { MMKV } from "react-native-mmkv";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const storage = new MMKV();

// const zustandStorage: StateStorage = {
//   setItem: (name, value) => {
//     return storage.set(name, value);
//   },
//   getItem: (name) => {
//     const value = storage.getString(name);
//     return value ?? null;
//   },
//   removeItem: (name) => {
//     return storage.delete(name);
//   },
// };

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
