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

// export const serachValueState = atom<string | null>({
//   key: 'serachValue',
//   default: null,
// });

export const ModalTypeAndId = atom<IModal | undefined>({
  key: 'ModalTypeAndId',
  default: undefined,
});

export const AlertModalState = atom<boolean>({
  key: 'alertmodal',
  default: false,
});

export const AlertTextState = atom<string | undefined>({
  key: 'alertText',
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
