export interface IGenre {
  id: number;
  name: string;
}

export interface ICast {
  adult: false;
  character: string;
  // credit_id: string;
  // gender: number;
  // id: number;
  // known_for_department: string;
  name: string;
  // order: number;
  original_name: string;
  // popularity: number;
  profile_path: string;
}

export interface IModalContent {
  // 19이상
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  // 장르
  genres: IGenre[];
  homepage: string;
  id: string;
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
  // 평점
  vote_average: number;
  // 투표수
  vote_count: number;
}

export interface ITodayBestMovie {
  // 19이상
  adult: boolean;
  backdrop_path: string;
  // 장르
  genre_ids: string[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  // 평점
  vote_average: number;
  // 투표수
  vote_count: number;
}

export interface ITodayMoive {
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
  vote_count: string;
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

// export interface ICast {
//   name: string;
//   original_name: string;
//   profile_path: string;
//   character: string;
// }
export interface IVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
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
