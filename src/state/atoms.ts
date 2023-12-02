import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IModal } from 'type/type';

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

export const ModalDataState = atom({
  key: 'ModalDataState',
  default: undefined,
});

export const windowWidthState = atom({
  key: 'windowWidth',
  default: window.innerWidth,
});

export const SearchMovieTotalCount = atom<number>({
  key: 'searchmoviecount',
  default: 0,
});

export const SearchTvTotalCount = atom<number>({
  key: 'searchTvcount',
  default: 0,
});

export const ModalTypeAndId = atom<IModal | undefined>({
  key: 'ModalTypeAndId',
  default: undefined,
});

const { persistAtom } = recoilPersist({
  key: 'movielistMovie',
  storage: localStorage,
});

export const MyListContentState = atom({
  key: 'contentId',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
