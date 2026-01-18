import { createGarageView } from './garage-view';
import { carsMock } from './mocks-cars';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { renderCarCards } from '@/components/car-card-list/car-card-list-render';
import { CARS_LIST_ROWS_PER_PAGE } from '@/constants/constants';

export function createGarageController(): HTMLElement {
  const view = createGarageView({ totalCars: carsMock.length });

  let page = 1;

  const apply = (): void => {
    const totalPages = getTotalPages(carsMock.length, CARS_LIST_ROWS_PER_PAGE);
    page = clampPage(page, totalPages);

    const start = (page - 1) * CARS_LIST_ROWS_PER_PAGE;
    const end = start + CARS_LIST_ROWS_PER_PAGE;

    const pageCars = carsMock.slice(start, end);

    renderCarCards(view.carListContainer, pageCars);

    view.pageLabel.textContent = `Page ${page} / ${totalPages}`;
    view.prevBtn.disabled = page <= 1;
    view.nextBtn.disabled = page >= totalPages;
  };

  view.prevBtn.addEventListener('click', () => {
    page -= 1;
    apply();
  });

  view.nextBtn.addEventListener('click', () => {
    page += 1;
    apply();
  });

  apply();

  return view.root;
}
