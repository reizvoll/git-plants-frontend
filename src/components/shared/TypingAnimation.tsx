"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string | string[];
  speed?: number;
  className?: string;
  loop?: boolean;
  pauseTime?: number;
}

const TypingAnimation = ({
  text,
  speed = 150,
  className = "",
  loop = true,
  pauseTime = 2000
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const textArray = Array.isArray(text) ? text : [text];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setDisplayText("");
        setCurrentIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    const currentText = textArray[currentTextIndex];

    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (loop) {
      setIsPaused(true);
    }
  }, [currentIndex, currentTextIndex, text, speed, loop, pauseTime, isPaused]);

  const formattedText = displayText.replace(/\n/g, "<br />");

  return <span className={`inline-block ${className}`} dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export default TypingAnimation;
