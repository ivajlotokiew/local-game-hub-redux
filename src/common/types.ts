export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

export type RootState = {
  genreList: genreState;
};

export interface ServerError {
  statusCode: number;
  description: string;
}

export interface gameState {
  games: Game[];
  isLoading: boolean;
  error: ServerError;
  count: number;
}

export interface genreState {
  genres: Genre[];
  isLoading: boolean;
  error: ServerError;
}

export interface platformState {
  platforms: Platform[];
  isLoading: boolean;
  error: ServerError;
}
