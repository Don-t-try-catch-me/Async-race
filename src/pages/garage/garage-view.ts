import type { GarageView, GarageViewProperties } from '@/types/type';
import { createTotalCounter } from '@/components/ui/total-counter/total-counter';
import { createTextInput } from '@/components/ui/text-input/text-input';
import { createColorPicker } from '@/components/ui/color-picker/color-picker';
import { CARS_GENERATE_COUNT, DEFAULT_COLOR } from '@/constants/constants';
import { createCarCardList } from '@/components/car-card-list/car-card-list';
import { createPaginationView } from '@/components/ui/pagination/pagination-view';
import { createButton } from '@/components/ui/button/button';
import { createRaceControls } from '@/components/race-controls/race-controls';

export function createGarageView(properties: GarageViewProperties): GarageView {
  const root = document.createElement('section');
  root.className = 'page';

  const title = document.createElement('h1');
  title.className = 'page__title';
  title.textContent = 'Garage';

  const controls = document.createElement('div');
  controls.className = 'page__controls';

  const actionCreate = document.createElement('div');
  actionCreate.className = 'page__control-left';

  const nameInput = createTextInput({
    id: 'garage-car-name',
    name: 'name',
    label: 'Add your car to the race',
    placeholder: 'Enter car name',
  });

  const colorPicker = createColorPicker({
    id: 'garage-car-color',
    name: 'color',
    label: 'Color',
    value: DEFAULT_COLOR,
  });

  const createButton_ = createButton({
    label: 'CREATE',
    variant: 'primary',
    size: 'l',
    dataset: { action: 'car-create' },
    ariaLabel: 'Create car',
  });

  actionCreate.append(nameInput.root, colorPicker.root, createButton_.root);

  const actionGenerate = document.createElement('div');
  actionGenerate.className = 'page__control-right';

  const generateButton = createButton({
    label: `GENERATE ${CARS_GENERATE_COUNT}`,
    variant: 'ghost',
    size: 'l',
    dataset: { action: 'car-generate' },
    ariaLabel: `Generate ${CARS_GENERATE_COUNT} cars`,
  });

  actionGenerate.append(generateButton.root);

  controls.append(actionCreate, actionGenerate);

  const raceControls = createRaceControls();

  const total = createTotalCounter({
    label: 'cars',
    count: properties.totalCars,
  });

  const carList = createCarCardList();
  const pagination = createPaginationView({ page: 1, totalPages: 1 });

  root.append(
    title,
    controls,
    raceControls.root,
    total,
    carList.root,
    pagination.root
  );

  return {
    root,
    nameInput: nameInput.input,
    colorInput: colorPicker.input,
    createBtn: createButton_.root,
    generateBtn: generateButton.root,
    carListContainer: carList.root,
    prevBtn: pagination.prevBtn,
    nextBtn: pagination.nextBtn,
    pageLabel: pagination.label,
  };
}
