import { createGarageView } from './garage-view';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import { CARS_LIST_ROWS_PER_PAGE } from '@/constants/constants';

import { createCar, deleteCar, getCars } from '@/services/car-service';

export async function createGarageController() {
  let page = 1;
  let cars = await getCars(page);

  if (!Array.isArray(cars)) {
    console.error('Invalid cars format');
    return;
  }

  const view = createGarageView({ totalCars: cars.length });

  const apply = (): void => {
    if (!Array.isArray(cars)) return;

    const totalPages = getTotalPages(cars.length, CARS_LIST_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    const start = (page - 1) * CARS_LIST_ROWS_PER_PAGE;
    const end = start + CARS_LIST_ROWS_PER_PAGE;

    const pageCars = cars.slice(start, end);
    view.changeTotal(cars.length);

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
    if (!car || !Array.isArray(cars)) return;

    cars.push(car);
    apply();
  };

  const handleRemoveButtonClick = async (event: PointerEvent) => {
    const target = event.target;
    if (
      target &&
      target instanceof HTMLButtonElement &&
      target.textContent === 'REMOVE'
    ) {
      const carCard = target.closest('.car-card');
      if (!carCard || !(carCard instanceof HTMLElement)) return;
      const id = carCard.dataset.carId;
      if (!id) return;

      const deleted = await deleteCar(+id);
      if (!deleted) return;

      cars = cars?.filter((car) => car.id !== +id);
      apply();
    }
  };

  view.root.addEventListener(
    'click',
    (event) => void handleRemoveButtonClick(event)
  );

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
