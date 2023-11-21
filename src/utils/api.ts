import axios from 'axios';
// import { ILanguage, IMovieKinds } from 'type/type';

const ApiKey = import.meta.env.VITE_API_KEY;
const URL = 'https://api.themoviedb.org/3/';
const language = 'ko-KR';
const country = 'KR';

// 인터셉터해서 몰래 토큰 넣어주는 함수~
// const axiosInstance = axios.create({
//   baseURL: 'https://api.themoviedb.org/3/',
//   params: { api_key: { ApiKey }, language: 'ko-KR' },
// });

// 이미지를 가져올떄 사용하는 함수
export const getImgPath = (url?: string) => {
  return `https://image.tmdb.org/t/p/original/${url}`;
};

// 다양한 종류의 영화, tv 콘텐츠 데이터를 가져오는 함수
export const getContents = async (type: string, section: string) => {
  // console.log('데이터', type, section);
  const url = `${URL}/${type}/${section}`;
  const params = {
    api_key: ApiKey,
    language: language,
    region: country,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

export const getModalContentData = async (type: string, id: number | undefined) => {
  const url = `${URL}/${type}/${id}`;
  const params = {
    api_key: ApiKey,
    language: language,
    // page: 2,
  };

  const response = await axios.get(url, { params });
  return response.data;
};

// const apiMoviesPath = (lang: ILanguage, subKind: IMovieKinds, page: number) => {
//   return `/movie/${subKind}?language=${lang}&page=${page}`;
// };

// export const getMovieData = async (page: number) => {
//   const response = await axiosInstance.get(apiMoviesPath('ko-KR', 'now_playing', page));
//   return response.data;
// };
