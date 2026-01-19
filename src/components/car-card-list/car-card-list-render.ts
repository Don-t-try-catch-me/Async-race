import type { CarDto } from '@/types/type';
import { CreateCarCard } from '@/components/car-card/car-card';

export function RenderCarCards(container: HTMLElement, cars: CarDto[]): void {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const fragment = document.createDocumentFragment();
  for (const car of cars) fragment.append(CreateCarCard(car));
  container.append(fragment);
}
