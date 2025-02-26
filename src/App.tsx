// File: src/App.tsx
import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/MainLayout';
import '@mantine/core/styles.css';

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
  return (
    <MantineProvider theme={theme}>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </MantineProvider>
  );
}

export default App;
