import { CreateLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { CreateWinnersController } from '@/pages/winners/winners-controller';
import { createErrorPageView } from '@/pages/error/error-page-view';

import { ensureDefaultRoute, navigate, onRouteChange } from '@/routes/router';

import { Route } from '@/types/type';

export async function CreateLayoutController() {
  const view = CreateLayoutView();

  const winnersPage = await CreateWinnersController();
  const garagePage = await createGarageController(winnersPage.updateWinners);
  const errorPage = createErrorPageView().root;

  if (!garagePage) {
    throw new Error('Failed to render page, please try again');
  }

  let currentPage: HTMLElement = garagePage;

  const showPage = (page: HTMLElement): void => {
    if (currentPage === page) return;
    currentPage = page;
    view.content.replaceChildren(currentPage);
  };

  const render = (route: string): void => {
    if (route === Route.Garage) showPage(garagePage);
    else if (route === Route.Winners) showPage(winnersPage.root);
    else showPage(errorPage);
  };

  view.garageBtn.addEventListener('click', () => navigate(Route.Garage));
  view.winnersBtn.addEventListener('click', () => navigate(Route.Winners));

  view.content.append(currentPage);

  ensureDefaultRoute(Route.Garage);
  onRouteChange((route) => render(route));

  return view.root;
}
