import { atom } from 'recoil';

export const currentCharacterNameAtom = atom({
  key: 'currentCharacterNameAtom',
  default: 'HERO',
});
