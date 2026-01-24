import { createGarageView } from './garage-view';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import { CARS_LIST_ROWS_PER_PAGE } from '@/constants/constants';

import {
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from '@/services/car-service';
import { getCarName } from '@/utils/get-car-name';
import { getColor } from '@/utils/get-color';
import type { CarDto } from '@/types/type';

export async function createGarageController() {
  let page = 1;
  let cars: CarDto[] = [];
  let totalCount = 0;

  const fetchPage = async (): Promise<void> => {
    const data = await getCars(page);
    if (!data) return;

    cars = data.items;
    totalCount = data.totalCount;
  };

  await fetchPage();

  const view = createGarageView({ totalCars: totalCount });

  const apply = (): void => {
    const totalPages = getTotalPages(totalCount, CARS_LIST_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    view.total.change(totalCount);

    RenderCarCards(view.carListContainer, cars);

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
    ++totalCount;
    apply();

    view.nameInput.value = '';
  };

  const handleMetaActions = async (event: PointerEvent) => {
    const target = event.target;
    if (target && target instanceof HTMLButtonElement) {
      const carCard = target.closest('.car-card');
      if (!carCard || !(carCard instanceof HTMLElement)) return;
      const id = carCard.dataset.carId;
      if (!id) return;

      if (target.textContent === 'REMOVE') {
        const deleted = await deleteCar(+id);
        if (!deleted) return;
        cars = cars?.filter((car) => car.id !== +id);
        --totalCount;
      }

      if (target.textContent === 'EDIT') {
        const color = view.colorInput.value;
        const name = view.nameInput.value;
        if (!color || !name) {
          console.error('Name and color are required to update a car');
          return;
        }

        const updatedCar = await updateCar({ id: +id, name, color });
        if (!updatedCar) return;

        cars?.splice(
          cars.findIndex((car) => car.id === +id),
          1,
          updatedCar
        );

        view.nameInput.value = '';
      }

      apply();
    }
  };

  const handleGenerateButtonClick = async (n = 100) => {
    for (let index = 0; index < n; index++) {
      const car = await createCar({ name: getCarName(), color: getColor() });
      if (!car) continue;
    }

    await fetchPage();
    apply();
  };

  const handlePaginationButtonClick = async (n: number) => {
    page += n;
    await fetchPage();
    apply();
  };

  view.root.addEventListener('click', (event) => void handleMetaActions(event));

  view.generateBtn.addEventListener(
    'click',
    () => void handleGenerateButtonClick()
  );

  view.prevBtn.addEventListener(
    'click',
    () => void handlePaginationButtonClick(-1)
  );

  view.nextBtn.addEventListener(
    'click',
    () => void handlePaginationButtonClick(1)
  );

  view.createBtn.addEventListener(
    'click',
    () => void handleCreateButtonClick()
  );

  apply();

  return view.root;
}
