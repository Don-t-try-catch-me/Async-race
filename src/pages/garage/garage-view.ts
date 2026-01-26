import type { GarageView, GarageViewProperties } from '@/types/type';
import { CreateTotalCounter } from '@/components/ui/total-counter/total-counter';
import { CreateTextInput } from '@/components/ui/text-input/text-input';
import { CreateColorPicker } from '@/components/ui/color-picker/color-picker';
import { CARS_GENERATE_COUNT, DEFAULT_COLOR } from '@/constants/constants';
import { CreateCarCardList } from '@/components/car-card-list/car-card-list';
import { CreatePaginationView } from '@/components/ui/pagination/pagination-view';
import { CreateButton } from '@/components/ui/button/button';
import { CreateRaceControls } from '@/components/race-controls/race-controls';
import { createElement } from '@/utils/create-element';

export function createGarageView(properties: GarageViewProperties): GarageView {
  const root = createElement('section', { className: 'page' });

  const title = createElement('h1', {
    className: 'page__title',
    textContent: 'Garage',
  });

  const controls = createElement('div', { className: 'page__controls' });

  const actionCreate = createElement('div', {
    className: 'page__control-left',
  });

  const nameInput = CreateTextInput({
    id: 'garage-car-name',
    name: 'name',
    label: 'Add your car to the race',
    placeholder: 'Enter car name',
  });

  const colorPicker = CreateColorPicker({
    id: 'garage-car-color',
    name: 'color',
    label: 'Color',
    value: DEFAULT_COLOR,
  });

  const createButton_ = CreateButton({
    label: 'CREATE',
    variant: 'primary',
    size: 'l',
    dataset: { action: 'car-create' },
    ariaLabel: 'Create car',
  });

  const updateButton_ = CreateButton({
    label: 'UPDATE',
    variant: 'ghost',
    size: 'l',
    dataset: { action: 'car-update' },
    ariaLabel: 'Update car',
    disabled: true,
  });

  actionCreate.append(
    nameInput.root,
    colorPicker.root,
    createButton_.root,
    updateButton_.root
  );

  const actionGenerate = createElement('div', {
    className: 'page__control-right',
  });

  const generateButton = CreateButton({
    label: `GENERATE ${CARS_GENERATE_COUNT}`,
    variant: 'ghost',
    size: 'l',
    dataset: { action: 'car-generate' },
    ariaLabel: `Generate ${CARS_GENERATE_COUNT} cars`,
  });

  actionGenerate.append(generateButton.root);

  controls.append(actionCreate, actionGenerate);

  const raceControls = CreateRaceControls();

  const total = CreateTotalCounter({
    label: 'cars',
    count: properties.totalCars,
  });

  const carList = CreateCarCardList();
  const pagination = CreatePaginationView({ page: 1, totalPages: 1 });

  root.append(
    title,
    controls,
    raceControls.root,
    total.root,
    carList.root,
    pagination.root
  );

  return {
    root,
    nameInput: nameInput.input,
    colorInput: colorPicker.input,
    createBtn: createButton_.root,
    updateBtn: updateButton_.root,
    generateBtn: generateButton.root,
    carListContainer: carList.root,
    prevBtn: pagination.prevBtn,
    nextBtn: pagination.nextBtn,
    pageLabel: pagination.label,
    raceControls,
    total,
  };
}
