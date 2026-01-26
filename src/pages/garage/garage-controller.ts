import { createGarageView } from './garage-view';
import { clampPage, getTotalPages } from '@/utils/pagination';
import { RenderCarCards } from '@/components/car-card-list/car-card-list-render';
import {
  CARS_GENERATE_COUNT,
  CARS_LIST_ROWS_PER_PAGE,
  ERROR_TEXT,
  RACE_TEXT,
} from '@/constants/constants';

import {
  createCar,
  deleteCar,
  getCar,
  getCars,
  updateCar,
} from '@/services/car-service';
import { getCarName } from '@/utils/get-car-name';
import { getColor } from '@/utils/get-color';
import type { CarCardControllerBundle, CarDto } from '@/types/type';
import { deleteWinner, handleWinner } from '@/services/winner-service';

export async function createGarageController(
  updateWinners: () => Promise<void>
) {
  let page = 1;
  let cars: CarDto[] = [];
  let totalCount = 0;
  let bundles: CarCardControllerBundle[] = [];
  let raceAbortController: AbortController | undefined;
  let carId = 0;

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

    bundles = RenderCarCards(view.carListContainer, cars);

    view.pageLabel.textContent = `Page ${page} / ${totalPages}`;
    view.prevBtn.disabled = page <= 1;
    view.nextBtn.disabled = page >= totalPages;

    view.raceControls.resetBtn.disabled = true;
    for (const b of bundles) {
      b.controls.stopBtn.disabled = true;
    }
  };

  const validateName = (): boolean => {
    const ok = view.nameInput.value.trim().length > 0;
    view.setNameError(!ok);
    return ok;
  };

  view.nameInput.addEventListener('input', () => {
    validateName();
  });

  const handleCreateButtonClick = async () => {
    const nameOk = validateName();
    const color = view.colorInput.value;
    const name = view.nameInput.value;

    if (!nameOk || !color) {
      console.error(ERROR_TEXT.CAR_NAME_AND_COLOR_REQUIRED);
      return;
    }

    const car = await createCar({ name, color });
    if (!car) return;

    cars.push(car);
    ++totalCount;
    apply();

    view.nameInput.value = '';
    view.setNameError(false);
    view.updateBtn.disabled = true;
  };

  const handleUpdateButtonClick = async (id: number) => {
    view.updateBtn.disabled = true;
    const color = view.colorInput.value;
    const name = view.nameInput.value;
    if (!color || !name) {
      console.error(ERROR_TEXT.CAR_NAME_AND_COLOR_REQUIRED);
      return;
    }

    const updatedCar = await updateCar({ id, name, color });
    if (!updatedCar) return;

    cars?.splice(
      cars.findIndex((car) => car.id === id),
      1,
      updatedCar
    );

    view.nameInput.value = '';

    apply();
    view.setNameError(false);
  };

  const handleMetaActions = async (event: PointerEvent) => {
    const target = event.target;
    if (
      target &&
      target instanceof HTMLButtonElement &&
      target.closest('.car-card__meta-actions')
    ) {
      const carCard = target.closest('.car-card');
      if (!carCard || !(carCard instanceof HTMLElement)) return;
      const id = carCard.dataset.carId;
      if (!id) return;
      carId = +id;

      if (target.textContent === 'REMOVE') {
        const deleted = await deleteCar(carId);
        if (!deleted) return;
        cars = cars?.filter((car) => car.id !== carId);
        --totalCount;
        if (cars.length === 0) {
          await fetchPage();
        }
        apply();
        await deleteWinner(carId);
        await updateWinners();
      }

      if (target.textContent === 'EDIT') {
        view.updateBtn.disabled = false;
        view.nameInput.focus();

        const car = await getCar(carId);
        if (car) {
          view.nameInput.value = car.name;
          view.colorInput.value = car.color;
        }
      }
    }
  };

  const handleGenerateButtonClick = async (n = CARS_GENERATE_COUNT) => {
    view.raceControls.resetBtn.disabled = true;
    view.raceControls.raceBtn.disabled = true;
    view.generateBtn.disabled = true;
    view.createBtn.disabled = true;
    view.raceControls.message.setText(RACE_TEXT.PREPARING_RACE);
    view.raceControls.message.setVariant('loading');

    try {
      for (let index = 0; index < n; index++) {
        const car = await createCar({ name: getCarName(), color: getColor() });
        if (!car) continue;
      }

      await fetchPage();
      apply();
    } finally {
      view.raceControls.resetBtn.disabled = true;
      view.raceControls.raceBtn.disabled = false;
      view.generateBtn.disabled = false;
      view.createBtn.disabled = false;
      view.raceControls.message.setText(RACE_TEXT.READY_STEADY_GO);
      view.raceControls.message.setVariant('default');
    }
  };

  const handlePaginationButtonClick = async (n: number) => {
    page += n;
    await fetchPage();
    apply();
  };

  const handleRaceButtonClick = async () => {
    raceAbortController = new AbortController();

    view.raceControls.raceBtn.disabled = true;
    view.raceControls.resetBtn.disabled = true;
    view.generateBtn.disabled = true;
    view.createBtn.disabled = true;
    view.nextBtn.disabled = true;
    view.prevBtn.disabled = true;

    for (const b of bundles) {
      b.controls.startBtn.disabled = true;
      b.controls.editBtn.disabled = true;
      b.controls.removeBtn.disabled = true;
      b.controls.stopBtn.disabled = false;
    }

    try {
      await view.raceControls.startCountDown();

      view.raceControls.resetBtn.disabled = false;
      view.raceControls.message.setText(RACE_TEXT.RACE_IS_ON);
      view.raceControls.message.setVariant('default');

      const startAndDrivePromises = bundles.map((c) =>
        c.controller.startEngineAndDrive()
      );

      const result = await Promise.allSettled(startAndDrivePromises);

      if (raceAbortController.signal.aborted) {
        console.error(ERROR_TEXT.RACE_WAS_CANCELLED);
        return;
      }

      const finished = result
        .filter((r) => r.status === 'fulfilled')
        .map((r) => r.value)
        .filter((v) => v !== undefined);

      const winner = finished.toSorted((a, b) => a.time - b.time)[0];
      const { id, time } = winner;
      const winnerCar = await getCar(id);
      if (!winnerCar) return;

      view.raceControls.message.setText(
        `Winner: ${winnerCar.name}. Time: ${(time / 1000).toFixed(2)} s`
      );
      view.raceControls.message.setVariant('winner');

      await handleWinner({ id, time: time / 1000 });
      await updateWinners();
    } finally {
      view.generateBtn.disabled = false;
      view.createBtn.disabled = false;

      for (const b of bundles) {
        b.controls.startBtn.disabled = false;
        b.controls.editBtn.disabled = false;
        b.controls.removeBtn.disabled = false;
        b.controls.stopBtn.disabled = true;
      }
    }
  };

  const handleResetButtonClick = async () => {
    view.raceControls.resetBtn.disabled = true;
    view.raceControls.raceBtn.disabled = true;

    try {
      view.raceControls.message.setText(RACE_TEXT.PREPARING_RACE);
      view.raceControls.message.setVariant('loading');

      raceAbortController?.abort();

      const stopCarPromises = bundles.map((c) => c.controller.stopCar(true));
      await Promise.allSettled(stopCarPromises);

      view.raceControls.message.setText(RACE_TEXT.READY_STEADY_GO);
      view.raceControls.message.setVariant('default');
    } finally {
      view.raceControls.raceBtn.disabled = false;
      view.raceControls.resetBtn.disabled = true;
    }
  };

  view.root.addEventListener('click', (event) => void handleMetaActions(event));

  view.generateBtn.addEventListener(
    'click',
    () => void handleGenerateButtonClick()
  );

  view.createBtn.addEventListener(
    'click',
    () => void handleCreateButtonClick()
  );

  view.updateBtn.addEventListener(
    'click',
    () => void handleUpdateButtonClick(carId)
  );

  view.raceControls.raceBtn.addEventListener(
    'click',
    () => void handleRaceButtonClick()
  );

  view.raceControls.resetBtn.addEventListener(
    'click',
    () => void handleResetButtonClick()
  );

  view.prevBtn.addEventListener(
    'click',
    () => void handlePaginationButtonClick(-1)
  );

  view.nextBtn.addEventListener(
    'click',
    () => void handlePaginationButtonClick(1)
  );

  apply();

  return view.root;
}
