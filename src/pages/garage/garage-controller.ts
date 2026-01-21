import { createGarageView } from './garage-view';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import { CARS_LIST_ROWS_PER_PAGE } from '@/constants/constants';

import { createCar, getCars } from '@/services/car-service';

export async function createGarageController() {
  let page = 1;
  const cars = await getCars(page);

  if (!Array.isArray(cars)) {
    console.error('Invalid cars format');
    return;
  }

  const view = createGarageView({ totalCars: cars.length });

  const apply = (): void => {
    const totalPages = getTotalPages(cars.length, CARS_LIST_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    const start = (page - 1) * CARS_LIST_ROWS_PER_PAGE;
    const end = start + CARS_LIST_ROWS_PER_PAGE;

    const pageCars = cars.slice(start, end);

    RenderCarCards(view.carListContainer, pageCars);

    view.pageLabel.textContent = `Page ${page} / ${totalPages}`;
    view.prevBtn.disabled = page <= 1;
    view.nextBtn.disabled = page >= totalPages;
  };

  const handleCreateButtonClick = async () => {
    const color = view.colorInput.value;
    const name = view.nameInput.value;
    if (!color || !name) {
      console.error('Name and color are required to create a car');
      return;
    }
    const car = await createCar({ name, color });
    if (!car) return;

    cars.push(car);
    apply();
    view.changeTotal(cars.length);
  };

  view.prevBtn.addEventListener('click', () => {
    page -= 1;
    apply();
  });

  view.nextBtn.addEventListener('click', () => {
    page += 1;
    apply();
  });

  view.createBtn.addEventListener(
    'click',
    () => void handleCreateButtonClick()
  );

  apply();

  return view.root;
}
