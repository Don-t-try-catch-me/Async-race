import type { RaceControls } from '@/types/type';
import { createButton } from '@/components/ui/button/button';

export function createRaceControls(): RaceControls {
  const root = document.createElement('div');
  root.className = 'race-controls';

  const raceButton = createButton({
    label: 'START RACE',
    variant: 'success',
    size: 'sm',
    dataset: { action: 'race-start' },
    ariaLabel: 'Start race',
  });

  const resetButton = createButton({
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
