import { atom } from 'recoil';
import { IContent } from 'type/type';

export const testState = atom<boolean>({
  key: 'testState',
  default: true,
});

export const modalIsOpenState = atom<boolean>({
  key: 'modalIsOpenState',
  default: false,
});

export const DetailContentId = atom<number | undefined>({
  key: 'DetailContentId',
  default: undefined,
});

export const ModalContentData = atom<IContent | undefined>({
  key: 'ModalContentData',
  default: undefined,
});

export const ModalDataState = atom({
  key: 'ModalDataState',
  default: undefined,
});

export const windowWidthState = atom({
  key: 'windowWidth',
  default: window.innerWidth,
});

export const SearchMoviePageState = atom<number>({
  key: 'searchmoviepage',
  default: 1,
});

export const SearchTvPageState = atom<number>({
  key: 'searchTvpage',
  default: 1,
});
