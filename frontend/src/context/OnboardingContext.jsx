import React, { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    learningStyle: '',
    skillLevel: '',
    goals: [],
  });

  const updateOnboarding = (updates) => {
    setOnboardingData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
