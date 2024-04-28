import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
//  ['Literature', 'History', 'Science', 'Fine Arts', 'Religion', 'Mythology', 'Philosophy', 'Social Science', 'Current Events', 'Geography', 'Other Academic', 'Trash']

type VC = 'literature' | 'history' | 'science' | 'finearts' | 'religion' | 'mythology' | 'philosophy' | 'socialscience' | 'geography' | 'otheracademic' | 'trash'

type CatStats = {
  literature: {
    correct: number;
    incorrect: number;
  };
  history: {
    correct: number;
    incorrect: number;
  };
  science: {
    correct: number;
    incorrect: number;
  };
  finearts: {
    correct: number;
    incorrect: number;
  };
  religion: {
    correct: number;
    incorrect: number;
  };
  mythology: {
    correct: number;
    incorrect: number;
  };
  philosophy: {
    correct: number;
    incorrect: number;
  };
  socialscience: {
    correct: number;
    incorrect: number;
  };
  currentevents: {
    correct: number;
    incorrect: number;
  };
  otheracademic: {
    correct: number;
    incorrect: number;
  };
  trash: {
    correct: number;
    incorrect: number;
  };
};

type TossupStats = {
  correct: number;
  incorrect: number;
  addCorrect: (cat: string) => void;
  addIncorrect: (cat: string) => void;
  catStats: CatStats;
};

export const useTossupStats = create<TossupStats>()(
  persist(
    (set) => ({
      incorrect: 0,
      correct: 0,
      addCorrect: (cat) => set((prev) => ({
         correct: prev.correct + 1,
       })),
      addIncorrect: (cat) => set((prev) => ({ incorrect: prev.correct + 1 })),
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
      },
    }),
    {
      name: "tossupStatsStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
