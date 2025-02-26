// File: src/components/Sidebar.tsx
import React, { useEffect } from 'react';
import { Stack, Button, TextInput, Title } from '@mantine/core';
import { IconSearch, IconUser, IconPlanet, IconRocket } from '@tabler/icons-react';
import { useAppContext } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    performSearch
  } = useAppContext();

  // Reference to search input using useRef
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Focus the search input after changing categories
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    // Clear search when changing categories
    setSearchQuery('');
  };

  // Function to handle search
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
    }
  };

  // Reset search query when category changes
  useEffect(() => {
    setSearchQuery('');
  }, [activeCategory, setSearchQuery]);

  return (
    <Stack spacing="md">
      <Title order={4}>Categories</Title>

      <Button
        leftSection={<IconUser size="1.1rem" />}
        variant={activeCategory === 'people' ? 'filled' : 'light'}
        onClick={() => handleCategoryChange('people')}
        fullWidth
      >
        Characters
      </Button>

      <Button
        leftSection={<IconPlanet size="1.1rem" />}
        variant={activeCategory === 'planets' ? 'filled' : 'light'}
        onClick={() => handleCategoryChange('planets')}
        fullWidth
      >
        Planets
      </Button>

      <Button
        leftSection={<IconRocket size="1.1rem" />}
        variant={activeCategory === 'starships' ? 'filled' : 'light'}
        onClick={() => handleCategoryChange('starships')}
        fullWidth
      >
        Starships
      </Button>

      <Title order={4} mt="md">Search</Title>

      <TextInput
        ref={searchInputRef}
        placeholder={`Search ${activeCategory}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        onKeyDown={handleSearch}
        rightSection={
          <IconSearch
            size="1.1rem"
            style={{ cursor: 'pointer' }}
            onClick={() => performSearch(searchQuery)}
          />
        }
      />

      {searchQuery && (
        <Button
          variant="light"
          onClick={() => performSearch(searchQuery)}
          fullWidth
        >
          Search
        </Button>
      )}
    </Stack>
  );
};

export default Sidebar;
