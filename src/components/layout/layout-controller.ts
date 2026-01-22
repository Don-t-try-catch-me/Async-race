import { CreateLayoutView } from './layout-view';
import { createGarageController } from '@/pages/garage/garage-controller';
import { CreateWinnersController } from '@/pages/winners/winners-controller';
import { createErrorPageView } from '@/pages/error/error-page-view';

import { ensureDefaultRoute, navigate, onRouteChange } from '@/routes/router';

import { Route } from '@/types/type';

export async function CreateLayoutController() {
  const view = CreateLayoutView();

  view.garageBtn.addEventListener(
    'click',
    () => void renderPage('garage', view)
  );
  view.winnersBtn.addEventListener(
    'click',
    () => void renderPage('winners', view)
  );

  await renderPage('garage', view);

  return view.root;
}

async function renderPage(page: PageKey, view: LayoutView) {
  try {
    setActiveTab(view, page);

    const pageNode =
      page === 'garage'
        ? await createGarageController()
        : CreateWinnersController();
  const garagePage = createGarageController();
  const winnersPage = CreateWinnersController();
  const errorPage = createErrorPageView().root;

  let currentPage: HTMLElement = garagePage;

  const showPage = (page: HTMLElement): void => {
    if (currentPage === page) return;
    currentPage = page;
    view.content.replaceChildren(currentPage);
  };

  const render = (route: string): void => {
    if (route === Route.Garage) showPage(garagePage);
    else if (route === Route.Winners) showPage(winnersPage);
    else showPage(errorPage);
  };

  view.garageBtn.addEventListener('click', () => navigate(Route.Garage));
  view.winnersBtn.addEventListener('click', () => navigate(Route.Winners));

  view.content.append(currentPage);

  ensureDefaultRoute(Route.Garage);
  onRouteChange((route) => render(route));

    if (!pageNode) {
      throw new Error('Failed to render page, please try again');
    }

    view.content.replaceChildren(pageNode);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
