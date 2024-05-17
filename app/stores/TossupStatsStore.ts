import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ValidCategory =
  | "literature"
  | "history"
  | "science"
  | "finearts"
  | "religion"
  | "mythology"
  | "philosophy"
  | "socialscience"
  | "geography"
  | "otheracademic"
  | "trash"
  | "currentevents";
export type { ValidCategory, TossupStats };
type CatStat = {
  correct: number;
  incorrect: number;
};

type CatStats = Record<ValidCategory, CatStat>;

type TossupStats = {
  correct: number;
  incorrect: number;
  addCorrect: (thecat: ValidCategory) => void;
  addIncorrect: (thecat: ValidCategory) => void;
  sCS: (cs: CatStats) => void;
  catStats: CatStats;
};

export const useTossupStats = create<TossupStats>()(
  persist(
    (set) => ({
      sCS(cs) {
        set({ catStats: cs });
      },
      incorrect: 0,
      correct: 0,
      addCorrect: (thecat) =>
        set((prev) => ({
          correct: prev.correct + 1,
          catStats: {
            ...prev.catStats,
            [thecat]: {
              ...prev.catStats[thecat],
              correct: prev.catStats[thecat].correct + 1,
            },
          },
        })),
      addIncorrect: (thecat) =>
        set((prev) => ({
          incorrect: prev.incorrect + 1,
          catStats: {
            ...prev.catStats,
            [thecat]: {
              ...prev.catStats[thecat],
              incorrect: prev.catStats[thecat].incorrect + 1,
            },
          },
        })),
      catStats: {
        literature: {
          correct: 0,
          incorrect: 0,
        },
        history: {
          correct: 0,
          incorrect: 0,
        },
        science: {
          correct: 0,
          incorrect: 0,
        },
        finearts: {
          correct: 0,
          incorrect: 0,
        },
        religion: {
          correct: 0,
          incorrect: 0,
        },
        mythology: {
          correct: 0,
          incorrect: 0,
        },
        philosophy: {
          correct: 0,
          incorrect: 0,
        },
        socialscience: {
          correct: 0,
          incorrect: 0,
        },
        currentevents: {
          correct: 0,
          incorrect: 0,
        },
        otheracademic: {
          correct: 0,
          incorrect: 0,
        },
        trash: {
          correct: 0,
          incorrect: 0,
        },
        geography: {
          correct: 0,
          incorrect: 0,
        },
      },
    }),
    {
      name: "tossupStatsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
