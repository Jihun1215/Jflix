import axios from 'axios';
// import { ILanguage, IMovieKinds } from 'type/type';

const ApiKey = import.meta.env.VITE_API_KEY;
const MovieURL = 'https://api.themoviedb.org/3/movie';
const TvURL = 'https://api.themoviedb.org/3/tv';
const language = 'ko-KR';

// 이미지를 가져올떄 사용하는 함수
export const getImgSetting = (url?: string) => {
  return `https://image.tmdb.org/t/p/original/${url}`;
};

// 상위 20위 영화 데이터 가져오는 함수
export const getMovieData = async () => {
  const url = `${MovieURL}/popular`;
  const params = {
    api_key: ApiKey,
    language: language,
    // page: 2,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 개봉중인 영화 가져오는 함수
export const getnowPlayMovieData = async () => {
  const url = `${MovieURL}/now-playing`;
  const params = {
    api_key: ApiKey,
    language: language,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 최고 평점 영화 가져오는 함수
export const getTopRatedMovies = async () => {
  const url = `${MovieURL}/top_rated`;
  const params = {
    api_key: ApiKey,
    language: language,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 개봉 예정인 영화를 가져오는 함수
export const getUpcomingMovies = async () => {
  const url = `${MovieURL}/upcoming`;
  const params = {
    api_key: ApiKey,
    language: language,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 최고평점 tv show
export const getTopRatedtv = async () => {
  const url = `${TvURL}/top_rated`;
  const params = {
    api_key: ApiKey,
    language: language,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 공개 예정 tv
export const getUpdatetv = async () => {
  const url = `${TvURL}/on-the-air`;
  const params = {
    api_key: ApiKey,
    language: language,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// 오늘 방영 tv
export const getAiringTodaytv = async () => {
  const url = `${TvURL}/airing-today`;
  const params = {
    api_key: ApiKey,
    language: language,
    // page: 2,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// const Token = import.meta.env.VITE_ACCESS_TOKEN;

// 인터셉터해서 몰래 토큰 넣어주는 함수~
// const axiosInstance = axios.create({
//   baseURL: myApiKey,
//   headers: { Authorization: `Bearer ${Token}` },
// });
// const apiMoviesPath = (lang: ILanguage, subKind: IMovieKinds, page: number) => {
//   return `/movie/${subKind}?language=${lang}&page=${page}`;
// };

// export const getMovieData = async (page: number) => {
//   const response = await axiosInstance.get(apiMoviesPath('ko-KR', 'now_playing', page));
//   return response.data;
// };
