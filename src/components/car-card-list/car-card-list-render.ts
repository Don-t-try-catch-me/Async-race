import type { CarDto } from '@/types/type';
import { CreateCarCard } from '@/components/car-card/car-card';
import type { CarController } from '@/utils/control-car';

export function RenderCarCards(container: HTMLElement, cars: CarDto[]) {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const controllers: CarController[] = [];

  const fragment = document.createDocumentFragment();
  for (const car of cars) {
    const card = CreateCarCard(car);
    fragment.append(card.root);
    controllers.push(card.carController);
  }
  container.append(fragment);
  return controllers;
}
