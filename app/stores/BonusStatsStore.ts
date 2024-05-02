import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ValidCategory = 'literature' | 'history' | 'science' | 'finearts' | 'religion' | 'mythology' | 'philosophy' | 'socialscience' | 'geography' | 'otheracademic' | 'trash' | 'currentevents'
export type {BonusStats}
type CatStat = {
  30: number,
  20: number
  10: number,
  0: number
}

type CatStats = Record<ValidCategory, CatStat>

type BonusStats = {
  30: number;
  20: number;
  10: number
  0: number
  addCorrect: (type: 30 | 20 | 10 | 0, theCat: ValidCategory) => void;
  sCS: (cs: CatStats) => void
  catStats: CatStats;
};

export const useBonusStats = create<BonusStats>()(
  persist(
    (set) => ({
      sCS(cs) {
        set({catStats: cs})    
      },
      30: 0,
      20: 0,
      10: 0,
      0: 0,
      addCorrect: (type, theCat) => set((prev) => ({
        [type]: prev[type] + 1,
         catStats: {...prev.catStats, [theCat]: {...prev.catStats[theCat], [type]: prev.catStats[theCat][type] + 1}}
       })),
      catStats: {
        literature: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        history: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        science: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        finearts: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        religion: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        mythology: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        philosophy: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        socialscience: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        currentevents: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        otheracademic: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        trash: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        },
        geography: {
            30: 0,
            20: 0,
            10: 0,
            0: 0
        }
      },
    }),
    {
      name: "bonusStatsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
