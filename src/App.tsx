// File: src/App.tsx
import { useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import MainLayout from './components/MainLayout';
import '@mantine/core/styles.css';
import { AppContext, type AppContextType } from './context/AppContext';

// Custom theme configuration
const theme = createTheme({
  primaryColor: 'yellow',
  primaryShade: 5,
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
});

function App() {
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
  const value: AppContextType = {
    darkMode,
    toggleDarkMode,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    performSearch,
    isSearching
  };


  return (
    <MantineProvider theme={theme}>
      <AppContext.Provider value={value} >
        <MainLayout />
      </AppContext.Provider>
    </MantineProvider>
  );
}

export default App;
