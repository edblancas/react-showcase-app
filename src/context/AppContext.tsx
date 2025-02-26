import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our context
interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  darkMode: false,
  toggleDarkMode: () => { },
  activeCategory: 'people',
  setActiveCategory: () => { },
});

// Custom hook to use the app context
export const useAppContext = () => useContext(AppContext);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // State using useState hook
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('people');

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Context value
  const value = {
    darkMode,
    toggleDarkMode,
    activeCategory,
    setActiveCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
