import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TossupStats = {
    correct: number
    incorrect: number,
    addCorrect: () => void,
    addIncorrect: () => void
}

export const useTossupStats = create<TossupStats>()(
    persist(
      (set) => ({
        incorrect: 0,
        correct: 0,
        addCorrect: () => set((prev) => ({correct: prev.correct + 1})),
        addIncorrect: () => set((prev) => ({incorrect: prev.correct + 1}))
      }),
      {
        name: "tossupStatsStorage", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => AsyncStorage) // (optional) by default, 'localStorage' is used
      }
    )
  );
  