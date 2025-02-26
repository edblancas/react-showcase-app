import React from 'react';
import { AppShell, useMantineColorScheme } from '@mantine/core';
import { useAppContext } from '../context/AppContext';
import Header from './Header';
import Sidebar from './Sidebar';
import DataDisplay from './DataDisplay';

const MainLayout: React.FC = () => {
  const { darkMode } = useAppContext();
  const { setColorScheme } = useMantineColorScheme();

  // Update Mantine color scheme based on our context
  React.useEffect(() => {
    setColorScheme(darkMode ? 'dark' : 'light');
  }, [darkMode, setColorScheme]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <DataDisplay />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
