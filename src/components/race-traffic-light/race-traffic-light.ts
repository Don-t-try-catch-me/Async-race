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

  const redLights: HTMLSpanElement[] = [];
  const yellowLights: HTMLSpanElement[] = [];
  const greenLights: HTMLSpanElement[] = [];

  for (let index = 0; index < LIGHTS_COLUMNS; index += 1) {
    const column = createElement('div', { className: 'race-light__column' });

    const red = createLamp('red');
    const yellow = createLamp('yellow');
    const green = createLamp('green');

    redLights.push(red);
    yellowLights.push(yellow);
    greenLights.push(green);

    column.append(red, yellow, green);
    lights.append(column);
  }

  const startCountDown = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        for (const l of redLights) l.classList.add('is-on');
      }, 1000);
      setTimeout(() => {
        for (const l of redLights) l.classList.remove('is-on');
        for (const l of yellowLights) l.classList.add('is-on');
      }, 2000);
      setTimeout(() => {
        for (const l of yellowLights) l.classList.remove('is-on');
        for (const l of greenLights) l.classList.add('is-on');
      }, 3000);
      setTimeout(() => {
        for (const l of greenLights) l.classList.remove('is-on');
        resolve();
      }, 4000);
    });
  };

  root.append(lights);

  return { root, startCountDown };
}
