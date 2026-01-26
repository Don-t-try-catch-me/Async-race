import { CreateRaceControls } from '@/components/race-controls/race-controls';
import {
  RACE_CONTROLS_TITLE,
  RACE_TEXT,
  LIGHTS_COLUMNS,
} from '@/constants/constants';

describe('CreateRaceControls', () => {
  test('renders base layout blocks in correct order', () => {
    const view = CreateRaceControls();

    expect(view.root).toBeInstanceOf(HTMLElement);
    expect(view.root).toHaveClass('race-controls');

    const children = Array.from(view.root.children);
    expect(children).toHaveLength(4);

    expect(children[0]).toHaveClass('race-controls__title');
    expect(children[1]).toHaveClass('race-controls__light');

    expect(children[2]).toHaveClass('info-message');
    expect(children[3]).toHaveClass('race-controls__actions');
  });

  test('renders title text from constant', () => {
    const view = CreateRaceControls();

    const title = view.root.querySelector<HTMLElement>('.race-controls__title');
    expect(title).not.toBeNull();
    expect(title).toHaveTextContent(RACE_CONTROLS_TITLE);
  });

  test('renders race and reset buttons with expected props', () => {
    const view = CreateRaceControls();

    expect(view.raceBtn).toBeInstanceOf(HTMLButtonElement);
    expect(view.resetBtn).toBeInstanceOf(HTMLButtonElement);

    expect(view.raceBtn).toHaveTextContent('START RACE');
    expect(view.resetBtn).toHaveTextContent('RESET RACE');

    expect(view.raceBtn).toHaveAttribute('aria-label', 'Start race');
    expect(view.resetBtn).toHaveAttribute('aria-label', 'Reset race');

    expect(view.raceBtn).toHaveAttribute('data-action', 'race-start');
    expect(view.resetBtn).toHaveAttribute('data-action', 'race-reset');

    expect(view.raceBtn).toHaveClass('btn', 'btn-success', 'btn-sm');
    expect(view.resetBtn).toHaveClass('btn', 'btn-danger', 'btn-sm');
  });

  test('renders default info message text and variant', () => {
    const view = CreateRaceControls();

    expect(view.message.root).toHaveClass(
      'info-message',
      'info-message--default'
    );
    expect(view.message.root).toHaveAttribute('role', 'status');
    expect(view.message.root).toHaveAttribute('aria-live', 'polite');

    const text = view.message.root.querySelector('.info-message__text');
    expect(text).not.toBeNull();
    expect(text).toHaveTextContent(RACE_TEXT.READY_STEADY_GO);
  });

  test('renders traffic light with expected grid size (columns × 3 lamps)', () => {
    const view = CreateRaceControls();

    const lightRoot = view.root.querySelector<HTMLElement>('.race-light');
    expect(lightRoot).not.toBeNull();

    const columns = lightRoot!.querySelectorAll('.race-light__column');
    expect(columns.length).toBe(LIGHTS_COLUMNS);

    const lamps = lightRoot!.querySelectorAll('.race-light__lamp');
    expect(lamps.length).toBe(LIGHTS_COLUMNS * 3);
  });

  test('exposes startCountDown function from traffic light', () => {
    const view = CreateRaceControls();
    expect(typeof view.startCountDown).toBe('function');
  });
});
