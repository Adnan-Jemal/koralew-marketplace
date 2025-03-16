"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Split text into array of characters, replacing spaces with non-breaking spaces
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split("").map((char) => (char === " " ? "\u00A0" : char)),
  }));

  // State to track the current word index
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Detect when the component is in view
  const scope = useRef(null);
  const isInView = useInView(scope);

  // Handle rotation timing
  useEffect(() => {
    if (!isInView) return; // Only run when in view

    const currentWord = wordsArray[currentWordIndex];
    const numChars = currentWord.text.length;
    const showDuration = (numChars - 1) * 0.1 + 0.3; // Time for all characters to animate in
    const displayTime = 3; // Time to display the full word (in seconds)
    // const hideDuration = 0.5; // Time for the word to fade out
    const totalTime = showDuration + displayTime; // Total time before switching

    const timer = setTimeout(() => {
      setCurrentWordIndex((prev) => (prev + 1) % wordsArray.length);
    }, totalTime * 1000); // Convert to milliseconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount or re-run
  }, [currentWordIndex, isInView, wordsArray]);

  // Render only the current word
  const renderWords = () => {
    const currentWord = wordsArray[currentWordIndex];
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          {currentWord.text.map((char, index) => (
            <motion.span
              key={`char-${index}`}
              initial={{ opacity: 0, display: "none" }}
              animate={{
                opacity: 1,
                display: "inline-block",
                width: "fit-content",
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1, // Stagger characters
              }}
              className={cn(
                "dark:text-white text-black",
                currentWord.className
              )}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl  font-bold text-center",
        className
      )}
      ref={scope}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-5 md:h-6 lg:h-10 bg-brand",
          cursorClassName
        )}
      />
    </div>
  );
};