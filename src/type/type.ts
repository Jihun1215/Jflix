export interface IModal {
  type: string;
  id: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: false;
  character: string;
  name: string;
  original_name: string;
  profile_path: string;
}

export interface IModalContent {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: Icompanies[];
  production_countries: ICountries[];
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: IspokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ISearchContent {
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
}

export interface IContent {
  // common
  id: number;
  backdrop_path: string;
  poster_path: string;
  status: string;
  genres: IGenre[];
  overview: string;
  vote_average: number;
  original_language: string;
  // movie
  title: string;
  runtime: number;
  release_date: string;
  imdb_id: string;
  adult: boolean;
  video: boolean;
  // tv
  name: string;
  episode_run_time: number;
  first_air_date: string;
  last_air_date: string;
  homepage: string;
  networks: INetwork[];
  seasons: ISeason[];
  number_of_seasons: number;
  number_of_episodes: number;
}

export interface Icompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ICountries {
  iso_3166_1: string;
  name: string;
}

export interface IspokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface INetwork {
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

// 무한스크롤
export interface InfiniteData<T> {
  pages: T[];
  pageParams: number[];
}
