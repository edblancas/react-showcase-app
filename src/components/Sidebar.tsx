import React from 'react';
import { Stack, Button, TextInput, Title } from '@mantine/core';
import { IconSearch, IconUser, IconPlanet, IconRocket } from '@tabler/icons-react';
import { useAppContext } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { activeCategory, setActiveCategory } = useAppContext();

  // Local state for search input
  const [searchQuery, setSearchQuery] = React.useState('');

  // Reference to search input using useRef
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Function to handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Focus the search input after changing categories
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

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
        rightSection={<IconSearch size="1.1rem" />}
      />
    </Stack>
  );
};

export default Sidebar;
