import type { CarCardList } from '@/types/type';
import { createElement } from '@/utils/create-element';

export function CreateCarCardList(): CarCardList {
  const root = createElement('ul', { className: 'car-list' });
  return { root };
}
