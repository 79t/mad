import { create } from 'zustand'

export type TossupSettings = {
  difficulties: boolean[]
  setDifficulty: (index: number, value: boolean) => void
}

export const useTossupSettings = create<TossupSettings>()((set, get) => ({
  difficulties: [false, true, true, true, true, false, false, false, false, false],
  setDifficulty: (index, value) => {
    const arrCopy = [...get().difficulties]
    arrCopy[index] = value
    set({difficulties: arrCopy}, false)
  }
}))
