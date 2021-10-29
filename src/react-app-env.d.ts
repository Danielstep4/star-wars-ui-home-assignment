/// <reference types="react-scripts" />

interface MovieName {
  title: string;
  episodeId: number;
  isFavorite: boolean;
}

interface FavoriteMovie {
  episodeId: number;
}
interface SwapiMoviesResult {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

interface SwapiGetAllData {
  count: number;
  next: string | null;
  previous: string | null;
  results: SwapiMoviesResult[];
}
