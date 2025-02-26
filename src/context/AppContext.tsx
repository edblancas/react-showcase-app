// File: src/context/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our context
interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => void;
  isSearching: boolean;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  darkMode: false,
  toggleDarkMode: () => { },
  activeCategory: 'people',
  setActiveCategory: () => { },
  searchQuery: '',
  setSearchQuery: () => { },
  performSearch: () => { },
  isSearching: false
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Function to perform search
  const performSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query.trim());
  };

  // Context value
  const value = {
    darkMode,
    toggleDarkMode,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    performSearch,
    isSearching
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
