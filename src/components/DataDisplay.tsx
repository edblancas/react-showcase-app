import React, { useState, useEffect } from 'react';
import {
  Paper,
  Text,
  Grid,
  Card,
  Button,
  Group,
  Loader,
  Center,
  Title,
  Badge
} from '@mantine/core';
import { useAppContext } from '../context/AppContext';
import {
  fetchCharacters,
  fetchPlanets,
  fetchStarships,
  searchData,
  StarWarsCharacter,
  StarWarsPlanet,
  StarWarsStarship,
  ApiResponse
} from '../api/swapiService';

type DataItem = StarWarsCharacter | StarWarsPlanet | StarWarsStarship;

const DataDisplay: React.FC = () => {
  // Get active category and search state from context
  const {
    activeCategory,
    searchQuery,
    isSearching,
    setSearchQuery,
    performSearch
  } = useAppContext();

  // Local state for data, loading state, pagination
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  // useEffect hook to fetch normal data when category or page changes
  useEffect(() => {
    // Only fetch normal data when not searching
    if (!isSearching) {
      fetchNormalData();
    }
  }, [activeCategory, page, isSearching]);

  // useEffect hook to handle search queries
  useEffect(() => {
    if (isSearching && searchQuery.trim()) {
      handleSearch();
    }
  }, [isSearching, searchQuery]);

  // Function to fetch normal data (not search)
  const fetchNormalData = async () => {
    setLoading(true);
    setError(null);

    try {
      let response: ApiResponse<any>;

      switch (activeCategory) {
        case 'people':
          response = await fetchCharacters(page);
          break;
        case 'planets':
          response = await fetchPlanets(page);
          break;
        case 'starships':
          response = await fetchStarships(page);
          break;
        default:
          response = await fetchCharacters(page);
      }

      setData(response.results);
      setHasNextPage(!!response.next);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to perform search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSelectedItem(null);

    try {
      const response = await searchData(activeCategory, searchQuery);
      setData(response.results);
      setHasNextPage(false); // Search results typically don't have pagination in this API
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear search and go back to normal view
  const clearSearch = () => {
    performSearch('');
    setPage(1);
    setSelectedItem(null);
  };

  // Function to render content based on item type
  const renderItemDetails = () => {
    if (!selectedItem) return null;

    switch (activeCategory) {
      case 'people':
        const character = selectedItem as StarWarsCharacter;
        return (
          <Card withBorder p="lg">
            <Title order={3}>{character.name}</Title>
            <Text mt="md"><strong>Height:</strong> {character.height} cm</Text>
            <Text><strong>Mass:</strong> {character.mass} kg</Text>
            <Text><strong>Hair color:</strong> {character.hair_color}</Text>
            <Text><strong>Skin color:</strong> {character.skin_color}</Text>
            <Text><strong>Eye color:</strong> {character.eye_color}</Text>
            <Text><strong>Birth year:</strong> {character.birth_year}</Text>
            <Text><strong>Gender:</strong> {character.gender}</Text>
          </Card>
        );

      case 'planets':
        const planet = selectedItem as StarWarsPlanet;
        return (
          <Card withBorder p="lg">
            <Title order={3}>{planet.name}</Title>
            <Text mt="md"><strong>Rotation Period:</strong> {planet.rotation_period} hours</Text>
            <Text><strong>Orbital Period:</strong> {planet.orbital_period} days</Text>
            <Text><strong>Diameter:</strong> {planet.diameter} km</Text>
            <Text><strong>Climate:</strong> {planet.climate}</Text>
            <Text><strong>Gravity:</strong> {planet.gravity}</Text>
            <Text><strong>Terrain:</strong> {planet.terrain}</Text>
            <Text><strong>Surface Water:</strong> {planet.surface_water}%</Text>
            <Text><strong>Population:</strong> {planet.population}</Text>
          </Card>
        );

      case 'starships':
        const starship = selectedItem as StarWarsStarship;
        return (
          <Card withBorder p="lg">
            <Title order={3}>{starship.name}</Title>
            <Text mt="md"><strong>Model:</strong> {starship.model}</Text>
            <Text><strong>Manufacturer:</strong> {starship.manufacturer}</Text>
            <Text><strong>Cost:</strong> {starship.cost_in_credits} credits</Text>
            <Text><strong>Length:</strong> {starship.length} m</Text>
            <Text><strong>Max Speed:</strong> {starship.max_atmosphering_speed}</Text>
            <Text><strong>Crew:</strong> {starship.crew}</Text>
            <Text><strong>Passengers:</strong> {starship.passengers}</Text>
            <Text><strong>Cargo Capacity:</strong> {starship.cargo_capacity} tons</Text>
            <Text><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</Text>
            <Text><strong>Class:</strong> {starship.starship_class}</Text>
          </Card>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (loading && data.length === 0) {
    return (
      <Center style={{ height: '70vh' }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // Error state
  if (error && data.length === 0) {
    return (
      <Center style={{ height: '70vh' }}>
        <Text c="red" size="xl">{error}</Text>
      </Center>
    );
  }

  return (
    <Paper p="md">
      <Group position="apart" mb="md">
        <Title order={2}>
          {activeCategory === 'people' ? 'Characters' :
            activeCategory === 'planets' ? 'Planets' : 'Starships'}
        </Title>

        {isSearching && (
          <Badge size="lg" color="yellow">
            Search results for: {searchQuery}
          </Badge>
        )}
      </Group>

      <Grid>
        {/* Left side - List of items */}
        <Grid.Col span={{ base: 12, md: selectedItem ? 6 : 12 }}>
          {data.length === 0 ? (
            <Center p="xl">
              <Stack align="center" spacing="md">
                <Text size="lg">No results found for "{searchQuery}"</Text>
                <Button variant="light" onClick={clearSearch}>
                  Back to all {activeCategory}
                </Button>
              </Stack>
            </Center>
          ) : (
            <Grid>
              {data.map((item: any, index) => (
                <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={index}>
                  <Card
                    withBorder
                    padding="md"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      cursor: 'pointer',
                      transform: selectedItem === item ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <Card.Section withBorder inheritPadding py="xs">
                      <Group justify="space-between">
                        <Text fw={500}>{item.name}</Text>
                        <Badge color="yellow">{activeCategory.slice(0, -1)}</Badge>
                      </Group>
                    </Card.Section>

                    <Text mt="sm" lineClamp={2}>
                      {activeCategory === 'people' ? `Gender: ${item.gender}, Birth Year: ${item.birth_year}` :
                        activeCategory === 'planets' ? `Terrain: ${item.terrain}, Climate: ${item.climate}` :
                          `Model: ${item.model}, Class: ${item.starship_class}`}
                    </Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          )}

          {/* Pagination controls - Only show when not searching */}
          {!isSearching && data.length > 0 && (
            <Group justify="center" mt="xl">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Text>Page {page}</Text>
              <Button
                variant="outline"
                disabled={!hasNextPage}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </Group>
          )}

          {/* Show a "back to all results" button when searching */}
          {isSearching && data.length > 0 && (
            <Group justify="center" mt="xl">
              <Button
                variant="outline"
                onClick={clearSearch}
              >
                Back to All Results
              </Button>
            </Group>
          )}
        </Grid.Col>

        {/* Right side - Selected item details */}
        {selectedItem && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            {renderItemDetails()}
          </Grid.Col>
        )}
      </Grid>
    </Paper>
  );
};

export default DataDisplay;
