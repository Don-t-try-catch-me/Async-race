import { ACTIVE_CLASS } from '@/constants/constants';
import { Route } from '@/types/type';
import { setActiveNav } from '@/utils/set-active-nav';

describe('setActiveNav', () => {
  const makeEl = (): HTMLElement => {
    const el = document.createElement('button');
    el.classList.add('nav__btn');
    return el;
  };

  it('adds ACTIVE_CLASS only to the element that matches current route', () => {
    const garage = makeEl();
    const winners = makeEl();

    const items = new Map<Route, HTMLElement>([
      [Route.Garage, garage],
      [Route.Winners, winners],
    ]);

    setActiveNav(Route.Garage, items);

    expect(garage.classList.contains(ACTIVE_CLASS)).toBe(true);
    expect(winners.classList.contains(ACTIVE_CLASS)).toBe(false);
  });

  it('removes ACTIVE_CLASS from all items when currentHash is not a valid Route', () => {
    const garage = makeEl();
    const winners = makeEl();

    garage.classList.add(ACTIVE_CLASS);
    winners.classList.add(ACTIVE_CLASS);

    const items = new Map<Route, HTMLElement>([
      [Route.Garage, garage],
      [Route.Winners, winners],
    ]);

    setActiveNav('#/unknown' as string, items);

    expect(garage.classList.contains(ACTIVE_CLASS)).toBe(false);
    expect(winners.classList.contains(ACTIVE_CLASS)).toBe(false);
  });

  it('updates active state when switching between routes', () => {
    const garage = makeEl();
    const winners = makeEl();

    const items = new Map<Route, HTMLElement>([
      [Route.Garage, garage],
      [Route.Winners, winners],
    ]);

    setActiveNav(Route.Garage, items);
    expect(garage.classList.contains(ACTIVE_CLASS)).toBe(true);
    expect(winners.classList.contains(ACTIVE_CLASS)).toBe(false);

    setActiveNav(Route.Winners, items);
    expect(garage.classList.contains(ACTIVE_CLASS)).toBe(false);
    expect(winners.classList.contains(ACTIVE_CLASS)).toBe(true);
  });
});
