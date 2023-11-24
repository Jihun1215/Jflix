import axios from 'axios';

const ApiKey = import.meta.env.VITE_API_KEY;
const URL = 'https://api.themoviedb.org/3/';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: { api_key: ApiKey, language: 'ko-KR', region: 'KR' },
});

// 이미지를 가져올떄 사용하는 함수
export const getImgPath = (url?: string) => {
  return `https://image.tmdb.org/t/p/original/${url}`;
};

// 다양한 종류의 영화, tv 콘텐츠 데이터를 가져오는 함수
export const getContents = async (type: string, section: string) => {
  const response = await axiosInstance.get(`${URL}/${type}/${section}`);
  return response.data;
};

export const getModalContentData = async (type: string, id: number | undefined) => {
  const response = await axiosInstance.get(`${URL}/${type}/${id}`);
  return response.data;
};

export const getContentCase = async (type: string, id: number | undefined) => {
  const response = await axiosInstance.get(`${URL}/${type}/${id}/credits?language=ko-KR`);
  return response.data;
};
