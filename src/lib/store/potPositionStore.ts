import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PotPosition {
  x: number;
  y: number;
}

interface CustomSize {
  width: number;
  height: number;
}

interface StyleState {
  potPositions: {
    [mode: string]: PotPosition;
  };

  customSizes: {
    [mode: string]: CustomSize;
  };

  selectedIndexes: {
    [mode: string]: {
      backgroundIndex: number;
      potIndex: number;
    };
  };

  // Actions
  setPotPosition: (mode: string, position: PotPosition) => void;
  setCustomSize: (mode: string, size: CustomSize) => void;
  setSelectedIndexes: (mode: string, backgroundIndex: number, potIndex: number) => void;
  resetToDefaults: (mode: string) => void;
  resetAllDefaults: () => void;
}

const defaultPotPosition: PotPosition = { x: 50, y: 80 };
const getDefaultSize = (mode: string): CustomSize =>
  mode === "MINI" ? { width: 267, height: 400 } : { width: 400, height: 300 };

export const useStyleStore = create<StyleState>()(
  persist(
    (set) => ({
      potPositions: {},
      customSizes: {},
      selectedIndexes: {},

      setPotPosition: (mode: string, position: PotPosition) =>
        set((state) => ({
          potPositions: {
            ...state.potPositions,
            [mode]: position
          }
        })),

      setCustomSize: (mode: string, size: CustomSize) =>
        set((state) => ({
          customSizes: {
            ...state.customSizes,
            [mode]: size
          }
        })),

      setSelectedIndexes: (mode: string, backgroundIndex: number, potIndex: number) =>
        set((state) => ({
          selectedIndexes: {
            ...state.selectedIndexes,
            [mode]: { backgroundIndex, potIndex }
          }
        })),

      resetToDefaults: (mode: string) =>
        set((state) => {
          const newState = { ...state };
          delete newState.potPositions[mode];
          delete newState.customSizes[mode];
          delete newState.selectedIndexes[mode];
          return newState;
        }),

      resetAllDefaults: () =>
        set({
          potPositions: {},
          customSizes: {},
          selectedIndexes: {}
        })
    }),
    {
      name: "style-storage", // localStorage key
      partialize: (state) => ({
        potPositions: state.potPositions,
        customSizes: state.customSizes,
        selectedIndexes: state.selectedIndexes
      })
    }
  )
);

// Helper hooks
export const usePotPosition = (mode: string) => {
  const potPosition = useStyleStore((state) => state.potPositions[mode]);
  const setPotPosition = useStyleStore((state) => state.setPotPosition);

  return {
    potPosition: potPosition || defaultPotPosition,
    setPotPosition: (position: PotPosition) => setPotPosition(mode, position)
  };
};

export const useCustomSize = (mode: string) => {
  const customSize = useStyleStore((state) => state.customSizes[mode]);
  const setCustomSize = useStyleStore((state) => state.setCustomSize);

  return {
    customSize: customSize || getDefaultSize(mode),
    setCustomSize: (size: CustomSize) => setCustomSize(mode, size)
  };
};

export const useSelectedIndexes = (mode: string) => {
  const indexes = useStyleStore((state) => state.selectedIndexes[mode]);
  const setSelectedIndexes = useStyleStore((state) => state.setSelectedIndexes);

  return {
    backgroundIndex: indexes?.backgroundIndex || 0,
    potIndex: indexes?.potIndex || 0,
    setIndexes: (backgroundIndex: number, potIndex: number) => setSelectedIndexes(mode, backgroundIndex, potIndex)
  };
};
