import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({});

  const markTopicCompleted = (topicId) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], completed: true },
    }));
  };

  const markQuizCompleted = (topicId) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: { ...prev[topicId], quizCompleted: true },
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, markTopicCompleted, markQuizCompleted }}>
      {children}
    </ProgressContext.Provider>
  );
};
