import type { CarCardControllerBundle, CarDto } from '@/types/type';
import { CreateCarCard } from '@/components/car-card/car-card';

export function RenderCarCards(container: HTMLElement, cars: CarDto[]) {
  while (container.firstChild) {
    container.firstChild.remove();
  }

  const bundles: CarCardControllerBundle[] = [];
  const fragment = document.createDocumentFragment();
  for (const car of cars) {
    const card = CreateCarCard(car);

    fragment.append(card.root);

    bundles.push({
      controller: card.carController,
      controls: card.controls,
    });
  }

  container.append(fragment);
  return bundles;
}
