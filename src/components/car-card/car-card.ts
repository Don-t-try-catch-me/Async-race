import type { CarCardProperties } from '@/types/type';
import { createButton } from '@/components/ui/button/button';

export function createCarCard(properties: CarCardProperties): HTMLElement {
  const { id, name, color } = properties;

  const root = document.createElement('li');
  root.className = 'car-card';
  root.dataset.carId = String(id);

  const header = document.createElement('div');
  header.className = 'car-card__header';

  const title = document.createElement('h3');
  title.className = 'car-card__name';
  title.textContent = name;

  const metaActions = document.createElement('div');
  metaActions.className = 'car-card__meta-actions';

  const editButton = createButton({
    label: 'EDIT',
    variant: 'ghost',
    size: 'sm',
    dataset: { action: 'car-edit', id: String(id) },
    ariaLabel: `Edit car ${name}`,
  });

  const removeButton = createButton({
    label: 'REMOVE',
    variant: 'danger',
    size: 'sm',
    dataset: { action: 'car-remove', id: String(id) },
    ariaLabel: `Remove car ${name}`,
  });

  metaActions.append(editButton.root, removeButton.root);
  header.append(title, metaActions);

  const track = document.createElement('div');
  track.className = 'car-card__track';

  const road = document.createElement('div');
  road.className = 'car-card__road';

  const icon = document.createElement('span');
  icon.className = 'car-card__car-icon';
  icon.style.backgroundColor = color;

  const flag = document.createElement('span');
  flag.className = 'car-card__flag';

  track.append(road, icon, flag);

  const controls = document.createElement('div');
  controls.className = 'car-card__controls';

  const startButton = createButton({
    label: 'START',
    variant: 'success',
    size: 'sm',
    dataset: { action: 'car-start', id: String(id) },
    ariaLabel: `Start car ${name}`,
  });

  const stopButton = createButton({
    label: 'STOP',
    variant: 'danger',
    size: 'sm',
    dataset: { action: 'car-stop', id: String(id) },
    ariaLabel: `Stop car ${name}`,
  });

  controls.append(startButton.root, stopButton.root);

  root.append(header, track, controls);

  return root;
}
