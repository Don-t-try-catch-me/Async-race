import type { GarageView, GarageViewProperties } from '@/types/type';
import { createTotalCounter } from '@/components/ui/total-counter/total-counter';
import { createTextInput } from '@/components/ui/text-input/text-input';
import { createColorPicker } from '@/components/ui/color-picker/color-picker';
import { DEFAULT_COLOR } from '@/constants/constants';

export function createGarageView(properties: GarageViewProperties): GarageView {
  const root = document.createElement('section');
  root.className = 'page';

  const title = document.createElement('h1');
  title.className = 'page__title';
  title.textContent = 'Garage';

  const controls = document.createElement('div');
  controls.className = 'page__controls';

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

  controls.append(nameInput.root, colorPicker.root);

  const total = createTotalCounter({
    label: 'cars',
    count: properties.totalCars,
  });

  root.append(title, controls, total);

  return { root };
}
