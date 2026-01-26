import { ACTIVE_CLASS } from '@/constants/constants';
import type { Route } from '@/types/type';
import { isRoute } from '@/routes/routes';

export function setActiveNav(
  currentHash: string,
  items: ReadonlyMap<Route, HTMLElement>
): void {
  const current: Route | undefined = isRoute(currentHash)
    ? currentHash
    : undefined;

  for (const [route, element] of items.entries()) {
    element.classList.toggle(ACTIVE_CLASS, route === current);
  }
}
