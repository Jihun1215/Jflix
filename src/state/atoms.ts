import { atom } from 'recoil';

export const testState = atom<boolean>({
  key: 'testState',
  default: true,
});

export const modalIsOpenState = atom<boolean>({
  key: 'modalIsOpenState',
  default: false,
});
