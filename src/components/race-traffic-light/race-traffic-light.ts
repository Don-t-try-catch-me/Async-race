import { createElement } from '@/utils/create-element';
import type { LampColor, RaceTrafficLight } from '@/types/type';
import { LIGHTS_COLUMNS } from '@/constants/constants';

function createLamp(color: LampColor, isOn = false): HTMLSpanElement {
  const className = [
    'race-light__lamp',
    `race-light__lamp-${color}`,
    isOn ? 'is-on' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return createElement('span', {
    className,
    attrs: { 'aria-hidden': 'true' },
  });
}

export function CreateRaceTrafficLight(): RaceTrafficLight {
  const root = createElement('div', { className: 'race-light' });

  const lights = createElement('div', { className: 'race-light__lights' });

  for (let index = 0; index < LIGHTS_COLUMNS; index += 1) {
    const column = createElement('div', { className: 'race-light__column' });

    const red = createLamp('red', true);
    const yellow = createLamp('yellow');
    const green = createLamp('green');

    column.append(red, yellow, green);
    lights.append(column);
  }

  root.append(lights);

  return { root };
}
