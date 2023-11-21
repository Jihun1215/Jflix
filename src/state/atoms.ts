import { atom } from 'recoil';

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

