import { Route } from '@/types/type';
import { isRoute } from './routes';

export function ensureDefaultRoute(defaultRoute: Route = Route.Garage): void {
  if (!globalThis.location.hash) {
    globalThis.location.hash = defaultRoute;
  }
}

export function getCurrentRoute(defaultRoute: Route = Route.Garage): Route {
  const hash = globalThis.location.hash || defaultRoute;
  return isRoute(hash) ? hash : Route.Error;
}

export function navigate(route: Route): void {
  globalThis.location.hash = route;
}

export function onRouteChange(handler: (route: Route) => void): () => void {
  const listener = (): void => handler(getCurrentRoute());

  globalThis.addEventListener('hashchange', listener);
  window.addEventListener('load', listener);

  listener();

  return () => {
    globalThis.removeEventListener('hashchange', listener);
    window.removeEventListener('load', listener);
  };
}
