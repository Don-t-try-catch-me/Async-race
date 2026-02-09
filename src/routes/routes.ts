import { Route } from '@/types/type';

const routeSet = new Set<string>(Object.values(Route));

export function isRoute(value: string): value is Route {
  return routeSet.has(value);
}
