import { createGarageView } from './garage-view';
import { carsMock } from './mocks-cars';

export function createGarageController(): HTMLElement {
  const view = createGarageView({ totalCars: carsMock.length });

  return view.root;
}
