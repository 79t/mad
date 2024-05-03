import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TossupSettings = {
  difficulties: boolean[];
  setDifficulty: (index: number, value: boolean) => void;
  cat: string[];
  addCat: (c: string) => void;
  rmCat: (c: string) => void;
  sCat: (cc: string[]) => void;
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
      cat: [
        "Literature",
        "History",
        "Science",
        "Fine Arts",
        "Religion",
        "Mythology",
        "Philosophy",
        "Social Science",
        "Current Events",
        "Geography",
        "Other Academic",
        "Trash",
      ],
      addCat: (c) => set((state) => ({ cat: [...state.cat, c] })),
      rmCat: (c) =>
        set((state) => ({ cat: [...state.cat].filter((el) => el !== c) })),
      sCat(cc) {
        set({ cat: cc });
      },
    }),
    {
      name: "tossupSettingsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
