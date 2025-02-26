import axios from 'axios';

// Base URL for the Star Wars API
const BASE_URL = 'https://swapi.dev/api';

// Define types for API responses
export interface StarWarsCharacter {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	url: string;
}

export interface StarWarsPlanet {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	url: string;
}

export interface StarWarsStarship {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	hyperdrive_rating: string;
	MGLT: string;
	starship_class: string;
	url: string;
}

export interface ApiResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

// API service functions
export const fetchCharacters = async (page = 1) => {
	try {
		const response = await axios.get<ApiResponse<StarWarsCharacter>>(`${BASE_URL}/people/?page=${page}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching characters:', error);
		throw error;
	}
};

export const fetchPlanets = async (page = 1) => {
	try {
		const response = await axios.get<ApiResponse<StarWarsPlanet>>(`${BASE_URL}/planets/?page=${page}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching planets:', error);
		throw error;
	}
};

export const fetchStarships = async (page = 1) => {
	try {
		const response = await axios.get<ApiResponse<StarWarsStarship>>(`${BASE_URL}/starships/?page=${page}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching starships:', error);
		throw error;
	}
};

export const searchData = async (category: string, query: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/${category}/?search=${query}`);
		return response.data;
	} catch (error) {
		console.error(`Error searching ${category}:`, error);
		throw error;
	}
};
