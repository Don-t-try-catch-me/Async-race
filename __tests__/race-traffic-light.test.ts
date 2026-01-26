import { CreateRaceTrafficLight } from '@/components/race-traffic-light/race-traffic-light';
import { LIGHTS_COLUMNS } from '@/constants/constants';

describe('CreateRaceTrafficLight', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders correct structure: columns and 3 lamps per column', () => {
    const { root } = CreateRaceTrafficLight();

    expect(root).toBeInstanceOf(HTMLElement);
    expect(root).toHaveClass('race-light');

    const lights = root.querySelector('.race-light__lights');
    expect(lights).not.toBeNull();

    const columns = root.querySelectorAll('.race-light__column');
    expect(columns).toHaveLength(LIGHTS_COLUMNS);

    for (const col of Array.from(columns)) {
      const lamps = col.querySelectorAll('.race-light__lamp');
      expect(lamps).toHaveLength(3);

      expect(col.querySelectorAll('.race-light__lamp-red')).toHaveLength(1);
      expect(col.querySelectorAll('.race-light__lamp-yellow')).toHaveLength(1);
      expect(col.querySelectorAll('.race-light__lamp-green')).toHaveLength(1);
    }

    expect(root.querySelectorAll('.race-light__lamp.is-on')).toHaveLength(0);
  });

  test('lamps have aria-hidden="true"', () => {
    const { root } = CreateRaceTrafficLight();

    const lamps = root.querySelectorAll<HTMLSpanElement>('.race-light__lamp');
    expect(lamps.length).toBe(LIGHTS_COLUMNS * 3);

    for (const lamp of Array.from(lamps)) {
      expect(lamp.getAttribute('aria-hidden')).toBe('true');
    }
  });

  test('startCountDown toggles lamps over time and resolves after 4s', async () => {
    const { root, startCountDown } = CreateRaceTrafficLight();

    const reds = root.querySelectorAll('.race-light__lamp-red');
    const yellows = root.querySelectorAll('.race-light__lamp-yellow');
    const greens = root.querySelectorAll('.race-light__lamp-green');

    const promise = startCountDown();

    expect(root.querySelectorAll('.is-on')).toHaveLength(0);

    jest.advanceTimersByTime(1000);
    for (const r of Array.from(reds)) expect(r).toHaveClass('is-on');
    for (const y of Array.from(yellows)) expect(y).not.toHaveClass('is-on');
    for (const g of Array.from(greens)) expect(g).not.toHaveClass('is-on');

    jest.advanceTimersByTime(1000);
    for (const r of Array.from(reds)) expect(r).not.toHaveClass('is-on');
    for (const y of Array.from(yellows)) expect(y).toHaveClass('is-on');
    for (const g of Array.from(greens)) expect(g).not.toHaveClass('is-on');

    jest.advanceTimersByTime(1000);
    for (const r of Array.from(reds)) expect(r).not.toHaveClass('is-on');
    for (const y of Array.from(yellows)) expect(y).not.toHaveClass('is-on');
    for (const g of Array.from(greens)) expect(g).toHaveClass('is-on');

    jest.advanceTimersByTime(1000);
    for (const g of Array.from(greens)) expect(g).not.toHaveClass('is-on');

    await expect(promise).resolves.toBeUndefined();
  });
});
