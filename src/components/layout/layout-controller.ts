import { CreateLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { CreateWinnersController } from '@/pages/winners/winners-controller';
import { createErrorPageView } from '@/pages/error/error-page-view';

import {
  ensureDefaultRoute,
  getCurrentRoute,
  navigate,
  onRouteChange,
} from '@/routes/router';

import { Route } from '@/types/type';
import { ERROR_TEXT } from '@/constants/constants';
import { setActiveNav } from '@/utils/set-active-nav';

export async function CreateLayoutController() {
  const view = CreateLayoutView();

  const winnersPage = await CreateWinnersController();
  const garagePage = await createGarageController(winnersPage.updateWinners);
  const errorPage = createErrorPageView().root;

  if (!garagePage) {
    throw new Error(ERROR_TEXT.FAILED_TO_RENDER_PAGE);
  }

  let currentPage: HTMLElement = garagePage;

  const showPage = (page: HTMLElement): void => {
    if (currentPage === page) return;
    currentPage = page;
    view.content.replaceChildren(currentPage);
  };

  const navItems = new Map<Route, HTMLElement>([
    [Route.Garage, view.garageBtn],
    [Route.Winners, view.winnersBtn],
  ]);

  const render = (route: string): void => {
    setActiveNav(route, navItems);

    if (route === Route.Garage) showPage(garagePage);
    else if (route === Route.Winners) showPage(winnersPage.root);
    else showPage(errorPage);
  };

  view.garageBtn.addEventListener('click', () => navigate(Route.Garage));
  view.winnersBtn.addEventListener('click', () => navigate(Route.Winners));

  view.content.append(currentPage);

  ensureDefaultRoute(Route.Garage);
  render(getCurrentRoute(Route.Garage));
  onRouteChange((route) => render(route));

  return view.root;
}
