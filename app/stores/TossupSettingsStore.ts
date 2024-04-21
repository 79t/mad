import { create } from "zustand";
import { StateStorage, persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

export type TossupSettings = {
  difficulties: boolean[];
  setDifficulty: (index: number, value: boolean) => void;
};

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
    }),
    {
      name: "tossupSettingsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
