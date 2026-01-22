import { Route } from '@/types/type';

const ROUTE_SET = new Set<string>(Object.values(Route));

export function isRoute(value: string): value is Route {
  return ROUTE_SET.has(value);
}
