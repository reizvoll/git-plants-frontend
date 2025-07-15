import { useEffect, useState } from "react";

// 배경화면 선택 전용 훅
export const useBackgroundSelection = (backgrounds: any[], currentMode: string) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 모드 변경 시 첫 번째 배경화면으로 리셋
  useEffect(() => {
    setSelectedIndex(0);
  }, [currentMode]);

  const selectedBackground = backgrounds[selectedIndex] || backgrounds[0] || null;

  const selectBackground = (index: number) => {
    setSelectedIndex(index);
  };

  return { selectedBackground, selectBackground, selectedIndex };
};

// 화분 선택 전용 훅
export const usePotSelection = (pots: any[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedPot = pots[selectedIndex] || pots[0] || null;

  const selectPot = (index: number) => {
    setSelectedIndex(index);
  };

  return { selectedPot, selectPot, selectedIndex };
};
