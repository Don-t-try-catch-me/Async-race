import type { RaceControls } from '@/types/type';
import { CreateButton } from '@/components/ui/button/button';
import { createElement } from '@/utils/create-element';

export function CreateRaceControls(): RaceControls {
  const root = createElement('div', { className: 'race-controls' });

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

  root.append(raceButton.root, resetButton.root);

  return {
    root,
    raceBtn: raceButton.root,
    resetBtn: resetButton.root,
  };
}
