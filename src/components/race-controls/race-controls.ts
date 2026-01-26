import type { RaceControls } from '@/types/type';
import { CreateButton } from '@/components/ui/button/button';
import { createElement } from '@/utils/create-element';
import { CreateRaceTrafficLight } from '@/components/race-traffic-light/race-traffic-light';
import { CreateInfoMessage } from '@/components/ui/info-message/info-message';
import { RACE_CONTROLS_TITLE } from '@/constants/constants';

export function CreateRaceControls(): RaceControls {
  const root = createElement('div', { className: 'race-controls' });

  const actions = createElement('div', { className: 'race-controls__actions' });
  const lightWrap = createElement('div', { className: 'race-controls__light' });

  const title = createElement('div', {
    className: 'race-controls__title',
    textContent: RACE_CONTROLS_TITLE,
  });

  const light = CreateRaceTrafficLight();
  const message = CreateInfoMessage({
    text: 'Preparing race...',
    variant: 'loading',
  });

  const raceButton = CreateButton({
    label: 'START RACE',
    variant: 'success',
    size: 'sm',
    dataset: { action: 'race-start' },
    ariaLabel: 'Start race',
  });

  const resetButton = CreateButton({
    label: 'RESET RACE',
    variant: 'danger',
    size: 'sm',
    dataset: { action: 'race-reset' },
    ariaLabel: 'Reset race',
  });

  actions.append(raceButton.root, resetButton.root);
  lightWrap.append(light.root);

  root.append(title, lightWrap, message.root, actions);

  return {
    root,
    raceBtn: raceButton.root,
    resetBtn: resetButton.root,
    startCountDown: light.startCountDown,
    message,
  };
}
