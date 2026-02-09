import { CreateButton } from '@/components/ui/button/button';
import { createElement } from '@/utils/create-element';
import type { CarCardProperties } from '@/types/type';
import { CarController } from '@/utils/control-car';

export function CreateCarCard(properties: CarCardProperties) {
  const { id, name, color } = properties;

  const root = createElement('li', {
    className: 'car-card',
    dataset: { carId: String(id) },
  });

  const header = createElement('div', { className: 'car-card__header' });

  const title = createElement('h3', {
    className: 'car-card__name',
    textContent: name,
  });

  const metaActions = createElement('div', {
    className: 'car-card__meta-actions',
  });

  const editButton = CreateButton({
    label: 'EDIT',
    variant: 'ghost',
    size: 'sm',
    dataset: { action: 'car-edit', id: String(id) },
    ariaLabel: `Edit car ${name}`,
  });

  const removeButton = CreateButton({
    label: 'REMOVE',
    variant: 'danger',
    size: 'sm',
    dataset: { action: 'car-remove', id: String(id) },
    ariaLabel: `Remove car ${name}`,
  });

  metaActions.append(editButton.root, removeButton.root);
  header.append(title, metaActions);

  const track = createElement('div', { className: 'car-card__track' });

  const road = createElement('div', { className: 'car-card__road' });

  const icon = createElement('span', { className: 'car-card__car-icon' });
  icon.style.backgroundColor = color;

  const flag = createElement('span', { className: 'car-card__flag' });

  track.append(road, icon, flag);

  const controls = createElement('div', { className: 'car-card__controls' });

  const startButton = CreateButton({
    label: 'START',
    variant: 'success',
    size: 'sm',
    dataset: { action: 'car-start', id: String(id) },
    ariaLabel: `Start car ${name}`,
  });

  const stopButton = CreateButton({
    label: 'STOP',
    variant: 'danger',
    size: 'sm',
    dataset: { action: 'car-stop', id: String(id) },
    ariaLabel: `Stop car ${name}`,
  });

  controls.append(startButton.root, stopButton.root);

  root.append(header, track, controls);

  const carController = new CarController(
    id,
    icon,
    road,
    ({ startDisabled, stopDisabled }) => {
      if (startDisabled !== undefined)
        startButton.root.disabled = startDisabled;
      if (stopDisabled !== undefined) stopButton.root.disabled = stopDisabled;
    }
  );

  startButton.root.addEventListener(
    'click',
    () => void carController.startEngineAndDrive()
  );

  stopButton.root.addEventListener(
    'click',
    () => void carController.stopCar(true)
  );

  return {
    root,
    carController,
    controls: {
      startBtn: startButton.root,
      stopBtn: stopButton.root,
      editBtn: editButton.root,
      removeBtn: removeButton.root,
    },
  };
}
