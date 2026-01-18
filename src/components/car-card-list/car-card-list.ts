import type { CarCardList } from '@/types/type';

export function createCarCardList(): CarCardList {
  const root = document.createElement('ul');
  root.className = 'car-list';
  return { root };
}
