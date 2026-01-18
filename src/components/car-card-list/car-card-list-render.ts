import type { CarDto } from '@/types/type';
import { createCarCard } from '@/components/car-card/car-card';

export function renderCarCards(container: HTMLElement, cars: CarDto[]): void {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const fragment = document.createDocumentFragment();
  for (const car of cars) fragment.append(createCarCard(car));
  container.append(fragment);
}
