import React from 'react';
import { Group, Title, ActionIcon, Badge, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useAppContext } from '../context/AppContext';

const Header: React.FC = () => {
  // Use the non-null assertion operator if you are sure the provider is always present, ! at the end
  const { darkMode, toggleDarkMode } = useAppContext()!;
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Title order={3} c={colorScheme === 'dark' ? 'yellow' : 'gray.9'}>
          Star Wars Explorer
        </Title>
        <Badge color="yellow" variant="filled" size="lg">
          React Hooks Demo
        </Badge>
      </Group>
      <ActionIcon
        variant="outline"
        color={colorScheme === 'dark' ? 'yellow' : 'blue'}
        onClick={toggleDarkMode}
        title="Toggle color scheme"
        size="lg"
      >
        {darkMode ? <IconSun size="1.1rem" /> : <IconMoon size="1.1rem" />}
      </ActionIcon>
    </Group>
  );
};

export default Header;
