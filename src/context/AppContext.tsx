import { createContext, useContext } from 'react';

// Define types for our context
export type AppContextType = {
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
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => useContext(AppContext);
